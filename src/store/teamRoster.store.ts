import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { nanoid } from 'nanoid';

import type {
    LeagueRosterStatus,
    NewRosterOptions,
    Roster,
    RosterPlayerRecord,
} from '../models/roster.model';
import type { TeamName } from '../models/team.model';
import { deletedPlayer, stringToRoster } from '../helpers/stringToRoster';
import { currentTeamId } from './currentTeam.store';
import { inducementCost } from '../helpers/totalInducementAmount';
import type { RosterMode } from './rosterMode.store';
import { savedRosterIndex } from './saveDirectory.store';
import { PickedSpecialRule } from '../data/teams.data';
import {
    matchSummary,
    updateMatchDraftTotals,
    updateRosterWithDraft,
} from '../helpers/matchHistoryHelpers';
import type { SaveMatchOptions } from '../models/matchHistory.model';
import { getGameTypeSettings } from '../helpers/gameSettings';
import {
    CURRENT_ROSTER_VERSION,
    versionCheck,
} from '../helpers/rosterVersionCheck';
import type { Inducement } from '../models/inducement.model';

export const MAX_PLAYER_NUMBER = 99;

function createRoster() {
    const { subscribe, set, update }: Writable<Roster> = writable(
        getDefaultRoster()
    );

    return {
        subscribe,
        addPlayer: (player: RosterPlayerRecord, index?: number) =>
            update((store) => {
                if (
                    store.players.filter((p) => !p.deleted).length >=
                    getGameTypeSettings(store?.format).maxPlayers
                ) {
                    return store;
                }
                return {
                    ...store,
                    players: addPlayerToPlayers(
                        store.players,
                        {
                            ...player,
                            playerId: player.playerId || nanoid(),
                        },
                        MAX_PLAYER_NUMBER,
                        index
                    ),
                    ...updatePlayerTreasury(store, player),
                };
            }),
        duplicatePlayer: (index: number) =>
            update((store) => {
                if (
                    store.players.filter((p) => !p.deleted).length >=
                    getGameTypeSettings(store?.format).maxPlayers
                ) {
                    return store;
                }
                const duplicatedPlayer: RosterPlayerRecord = {
                    ...store.players[index],
                    playerId: nanoid(),
                    alterations: {
                        ...store.players[index].alterations,
                        playerNumber: undefined,
                    },
                };
                return {
                    ...store,
                    players: addPlayerToPlayers(
                        store.players,
                        duplicatedPlayer,
                        MAX_PLAYER_NUMBER
                    ),
                    ...updatePlayerTreasury(store, duplicatedPlayer),
                };
            }),
        removePlayer: (indices: number[], firePlayer: boolean) =>
            update((store) => {
                return {
                    ...store,
                    treasury: !firePlayer
                        ? store.treasury +
                          store.players
                              .filter((_, i) => indices.includes(i))
                              .filter(
                                  (p) =>
                                      !(
                                          p.starPlayer &&
                                          typeof store?.pettyCash === 'number'
                                      )
                              )
                              .map((p) => p.player.cost)
                              .reduce((a, b) => a + b, 0)
                        : store.treasury,
                    pettyCash: store?.pettyCash
                        ? store.pettyCash +
                          store.players
                              .filter((_, i) => indices.includes(i))
                              .filter(
                                  (p) =>
                                      p.starPlayer &&
                                      typeof store?.pettyCash === 'number'
                              )
                              .map((p) => p.player.cost * 1000)
                              .reduce((a, b) => a + b, 0)
                        : store?.pettyCash,
                    players: deletePlayersFromPlayers(store.players, indices),
                };
            }),
        updatePlayer: (player: RosterPlayerRecord, index: number) =>
            update((store) => {
                const updatedPlayers = [...store.players];
                updatedPlayers[index] = player;
                return { ...store, players: updatedPlayers };
            }),
        movePlayerUp: (index: number) =>
            update((store) => {
                let target = index - 1;
                while (target > 0) {
                    if (store.players[target].deleted) {
                        --target;
                    } else {
                        break;
                    }
                }
                return {
                    ...store,
                    players: switchTwoElements(store.players, index, target),
                };
            }),
        movePlayerDown: (index: number) =>
            update((store) => {
                let target = index + 1;
                while (target < store.players.length) {
                    if (store.players[target].deleted) {
                        ++target;
                    } else {
                        break;
                    }
                }
                return {
                    ...store,
                    players: switchTwoElements(store.players, index, target),
                };
            }),
        addInducement: (
            inducementKey: string,
            customInducements?: Inducement[]
        ) =>
            update((store) =>
                addInducementToStore(store, inducementKey, customInducements)
            ),
        removeInducement: (
            inducementKey: string,
            customInducements?: Inducement[]
        ) =>
            update((store) =>
                removeInducementFromStore(
                    store,
                    inducementKey,
                    customInducements
                )
            ),
        removeAllInducements: () =>
            update((store) => {
                return { ...store, inducements: {} };
            }),
        addExtra: (extraKey: string, extraCost: number) =>
            update((store) => {
                return {
                    ...store,
                    treasury: store.treasury - extraCost,
                    extra: {
                        ...store.extra,
                        [extraKey]: store?.extra?.[extraKey]
                            ? store.extra[extraKey] + 1
                            : 1,
                    },
                };
            }),
        removeExtra: (extraKey: string, extraCost: number) =>
            update((store) => {
                return {
                    ...store,
                    treasury: store.treasury + extraCost,
                    extra: {
                        ...store.extra,
                        [extraKey]: store?.extra?.[extraKey]
                            ? store.extra[extraKey] - 1
                            : 0,
                    },
                };
            }),
        loadRoster: (rosterToLoad: Roster) =>
            update((_store) => addMissingItemsToRoster(rosterToLoad)),
        codeToRoster: (rosterCode: string) =>
            update((_store) => {
                const loadedRoster =
                    rosterFromCode(rosterCode) || getEmptyRoster();
                currentTeamId.set(loadedRoster.teamId);
                savedRosterIndex.newId();
                return { ...loadedRoster };
            }),
        changeRosterMode: (mode: RosterMode) =>
            update((store) => {
                return { ...store, mode };
            }),
        changeLeagueRosterStatus: (leagueRosterStatus: LeagueRosterStatus) =>
            update((store) => {
                return { ...store, leagueRosterStatus };
            }),
        updatePlayerNumber: (currentIndex: number, desired: number) => {
            update((store) => {
                if (!Number.isInteger(desired) || desired > 99 || desired < 0) {
                    return store;
                }
                const players = store.players;
                const taken = numberTaken(players, desired);

                if (taken >= 0) {
                    players[taken].alterations.playerNumber =
                        players[currentIndex].alterations.playerNumber;
                }
                players[currentIndex].alterations.playerNumber = desired;

                return { ...store, players };
            });
        },
        reset: (options?: NewRosterOptions) => set(getEmptyRoster(options)),
        setPettyCash: (pettyCash: number) =>
            update((store) => {
                return { ...store, pettyCash: +pettyCash };
            }),
        updateTreasury: (change: number) =>
            update((store) => {
                return { ...store, treasury: (store?.treasury || 0) + change };
            }),
        updateSpecialRule: (specialRule: number) =>
            update((store) => {
                return {
                    ...store,
                    extra: { ...store.extra, special_rule: specialRule },
                };
            }),
        matchDraftToSummary: () =>
            update((store) => {
                const { matchDraft, ...rest } = store;
                return {
                    ...rest,
                    matchSummary: [
                        ...rest.matchSummary,
                        matchSummary(matchDraft),
                    ],
                };
            }),
        matchDraftUpdateRoster: (options: SaveMatchOptions) =>
            update((store) => {
                return updateRosterWithDraft(store, options);
            }),
        removeMatchSummary: (matchId: string) =>
            update((store) => {
                return {
                    ...store,
                    matchSummary: store.matchSummary.filter(
                        (s) => s.id !== matchId
                    ),
                };
            }),
        updateDraftEventTotals: () =>
            update((store) => {
                return {
                    ...store,
                    matchDraft: updateMatchDraftTotals(store.matchDraft),
                };
            }),
        deleteMatchDraft: () =>
            update((store) => {
                const { matchDraft, pettyCash, ...noDraft } = store;
                return noDraft;
            }),
        set,
    };
}

const getEmptyRoster: (options?: NewRosterOptions) => Roster = (options) => {
    const gameSettings = getGameTypeSettings(options?.format || 'elevens');
    const emptyRoster: Roster = {
        version: options?.version || CURRENT_ROSTER_VERSION,
        rosterId: nanoid(),
        teamId: options?.teamId || '0',
        players: [],
        teamName: '',
        teamType: options?.teamType || ('' as TeamName),
        extra: { dedicated_fans: options?.fans || 0 },
        inducements: {},
        treasury:
            options?.startingTreasury || gameSettings?.startingTreasury || 1000,
        mode: options?.mode,
        format: options?.format || 'elevens',
        leagueRosterStatus: options?.mode === 'league' ? 'draft' : undefined,
        matchSummary: [],
        config: { customSkillColour: {} },
    };

    if (options?.specialRule) {
        emptyRoster.extra = {
            ...emptyRoster.extra,
            special_rule: PickedSpecialRule[options?.specialRule],
        };
    }

    return emptyRoster;
};

const switchTwoElements = (arr: any[], index1: number, index2: number) => {
    if (
        typeof arr[index1] === 'undefined' ||
        typeof arr[index2] === 'undefined'
    ) {
        return arr;
    }
    return arr.map((x, i, a) =>
        i === index1 ? a[index2] : i === index2 ? a[index1] : x
    );
};

const rosterFromQueryString = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
        return null;
    }
    window.history.replaceState({}, '', '/');
    return rosterFromCode(code);
};

const rosterFromCode = (code: string | null) => {
    try {
        let transformedRoster = stringToRoster(code);

        return addPlayerNumbersToRoster(transformedRoster);
    } catch (error) {
        console.error('Error loading roster from code', error);
        return null;
    }
};

const getDefaultRoster: () => Roster = () => {
    const defaultRoster: Roster =
        rosterFromQueryString() ||
        JSON.parse(localStorage.getItem('roster')) ||
        getEmptyRoster();

    const updatedRoster = addMissingItemsToRoster(defaultRoster);

    return updatedRoster;
};

const addMissingItemsToRoster = (roster: Roster) => {
    let updatedRoster = addPlayerNumbersToRoster(roster);
    // Old rosters had teamId as a number, new ones are strings
    updatedRoster.teamId = updatedRoster.teamId.toString();
    updatedRoster = addPlayerIdsToRoster(updatedRoster);
    updatedRoster = versionCheck(updatedRoster);

    if (!updatedRoster.rosterId) {
        updatedRoster.rosterId = nanoid();
    }
    if (updatedRoster.mode === 'league' && !updatedRoster.leagueRosterStatus) {
        updatedRoster.leagueRosterStatus = 'draft';
    }
    if (!updatedRoster.config) {
        updatedRoster.config = { customSkillColour: {} };
    }
    currentTeamId.set(updatedRoster.teamId);
    updatedRoster = {
        ...updatedRoster,
        format: updatedRoster?.format || 'elevens',
        matchSummary: updatedRoster?.matchSummary || [],
    };
    return updatedRoster;
};

const addPlayerToPlayers: (
    players: RosterPlayerRecord[],
    newPlayer: RosterPlayerRecord,
    maxPlayers: number,
    index?: number
) => RosterPlayerRecord[] = (players, newPlayer, maxPlayers, index) => {
    const playerWithNumber = newPlayer?.alterations?.playerNumber
        ? newPlayer
        : assignPlayerNumber(newPlayer, players);
    const indexToAdd =
        index && index < maxPlayers
            ? index
            : players.findIndex((p) => p.deleted);

    return indexToAdd && indexToAdd >= 0 && indexToAdd < players.length
        ? players.map((p, i) => (i === indexToAdd ? playerWithNumber : p))
        : players.concat([playerWithNumber]);
};

const deletePlayersFromPlayers: (
    players: RosterPlayerRecord[],
    playerIndicesToRemove: number[]
) => RosterPlayerRecord[] = (players, playerIndicesToRemove) => {
    const newPlayers = players.map((p, i) =>
        playerIndicesToRemove.includes(i)
            ? {
                  ...p,
                  deleted: true,
                  alterations: { spp: 0, ni: 0 },
                  player: deletedPlayer(),
              }
            : p
    );

    return newPlayers.filter((p) => !p.deleted);
};

/**
 * Add attributes needed in newer versions of bbroster to legacy team objects
 */
function assignMissingAttributesToPlayers(
    players: RosterPlayerRecord[]
): RosterPlayerRecord[] {
    return players.map((p, i) => {
        return assignPlayerNumber(i, players);
    });
}

function assignPlayerNumber(
    playerRef: RosterPlayerRecord | number,
    players: RosterPlayerRecord[]
): RosterPlayerRecord {
    const index = typeof playerRef === 'number' ? playerRef : undefined;
    const player =
        typeof playerRef === 'number' ? players[playerRef] : playerRef;
    const playerId = player?.playerId ?? nanoid();
    const playerNumber = player?.alterations?.playerNumber;
    return {
        ...player,
        playerId,
        alterations: {
            ...player?.alterations,
            playerNumber:
                playerNumber || generateEligibleNumber(players, index),
        },
    };
}

function addPlayerNumbersToRoster(roster: Roster) {
    const players = roster.players;
    let newRoster = roster;
    if (
        players.length > 0 &&
        players.some((p) => typeof p.alterations?.playerNumber !== 'number')
    ) {
        newRoster = {
            ...roster,
            players: assignMissingAttributesToPlayers(roster.players),
        };
    }
    return newRoster;
}

function addPlayerIdsToRoster(roster: Roster): Roster {
    return {
        ...roster,
        players: roster.players.map((p) => {
            if (typeof p.alterations?.playerNumber === 'number') {
                if (p?.playerId) return p;
                return {
                    ...p,
                    playerId: nanoid(),
                };
            }
        }),
    };
}

function generateEligibleNumber(players: RosterPlayerRecord[], index?: number) {
    const otherPlayers = players.filter((_p, i) => i !== index);
    let targetNumber = index ? index + 1 : 1;
    while (numberTaken(otherPlayers, targetNumber) >= 0) {
        targetNumber++;
    }
    return targetNumber;
}

function numberTaken(players: RosterPlayerRecord[], desiredNumber: number) {
    return players.findIndex(
        (p) => p?.alterations?.playerNumber === desiredNumber
    );
}

function addInducementToStore(
    store: Roster,
    inducementKey: string,
    customInducements?: Inducement[]
) {
    let treasury = store.treasury;
    let pettyCash: number = store.pettyCash;

    if (typeof pettyCash === 'number') {
        pettyCash =
            pettyCash -
            1000 *
                inducementCost(
                    store.format,
                    inducementKey,
                    store.teamId,
                    customInducements
                );
    } else {
        treasury =
            treasury -
            inducementCost(
                store.format,
                inducementKey,
                store.teamId,
                customInducements
            );
    }

    return {
        ...store,
        treasury,
        pettyCash,
        inducements: {
            ...store.inducements,
            [inducementKey]: store?.inducements?.[inducementKey]
                ? store.inducements[inducementKey] + 1
                : 1,
        },
    };
}

function removeInducementFromStore(
    store: Roster,
    inducementKey: string,
    customInducements?: Inducement[]
) {
    let treasury = store.treasury;
    let pettyCash: number = store.pettyCash;
    let inducements = {
        ...store.inducements,
        [inducementKey]: store?.inducements?.[inducementKey]
            ? store.inducements[inducementKey] - 1
            : 0,
    };
    if (store.leagueRosterStatus === 'commenced') {
        return {
            ...store,
            inducements,
        };
    }

    if (typeof pettyCash === 'number') {
        pettyCash =
            pettyCash +
            1000 *
                inducementCost(
                    store.format,
                    inducementKey,
                    store.teamId,
                    customInducements
                );
    } else {
        treasury =
            treasury +
            inducementCost(
                store.format,
                inducementKey,
                store.teamId,
                customInducements
            );
    }

    return {
        ...store,
        treasury,
        pettyCash,
        inducements,
    };
}

function updatePlayerTreasury(
    store: Roster,
    player: RosterPlayerRecord
): {
    treasury: number;
    pettyCash?: number;
} {
    let treasury = store.treasury;
    let pettyCash: number = store.pettyCash;
    if (typeof pettyCash === 'number' && !!player.starPlayer) {
        pettyCash = pettyCash - player.player.cost * 1000;
    } else {
        treasury =
            treasury -
            (player?.alterations?.journeyman ? 0 : player.player.cost);
    }
    return { treasury, pettyCash };
}

export const roster = createRoster();
