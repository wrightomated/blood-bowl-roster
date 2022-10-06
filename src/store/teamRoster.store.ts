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
import { currentTeam } from './currentTeam.store';
import { inducementCost } from '../helpers/totalInducementAmount';
import type { RosterMode } from './rosterMode.store';
import { savedRosterIndex } from './saveDirectory.store';
import { getGameTypeSettings, getMaxPlayers } from '../data/gameType.data';
import { PickedSpecialRule } from '../data/teams.data';

export const maxPlayerNumber = 99;

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
                    getMaxPlayers(store?.format)
                ) {
                    return store;
                }
                return {
                    ...store,
                    players: addPlayerToPlayers(
                        store.players,
                        player,
                        maxPlayerNumber,
                        index
                    ),
                    treasury:
                        store.treasury -
                        (player?.alterations?.journeyman
                            ? 0
                            : player.player.cost),
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
                              .map((p) => p.player.cost)
                              .reduce((a, b) => a + b, 0)
                        : store.treasury,
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
                return {
                    ...store,
                    players: switchTwoElements(store.players, index, index - 1),
                };
            }),
        movePlayerDown: (index: number) =>
            update((store) => {
                return {
                    ...store,
                    players: switchTwoElements(store.players, index, index + 1),
                };
            }),
        addInducement: (inducementKey: string) =>
            update((store) => {
                return {
                    ...store,
                    treasury:
                        store.treasury -
                        inducementCost(
                            store.format,
                            inducementKey,
                            store.teamId
                        ),
                    inducements: {
                        ...store.inducements,
                        [inducementKey]: store?.inducements?.[inducementKey]
                            ? store.inducements[inducementKey] + 1
                            : 1,
                    },
                };
            }),
        removeInducement: (inducementKey: string) =>
            update((store) => {
                return {
                    ...store,
                    treasury:
                        store.treasury +
                        inducementCost(
                            store.format,
                            inducementKey,
                            store.teamId
                        ),
                    inducements: {
                        ...store.inducements,
                        [inducementKey]: store?.inducements?.[inducementKey]
                            ? store.inducements[inducementKey] - 1
                            : 0,
                    },
                };
            }),
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
            update((_store) => {
                currentTeam.setCurrentTeamWithId(rosterToLoad.teamId);
                return rosterToLoad;
            }),
        codeToRoster: (rosterCode: string) =>
            update((_store) => {
                const loadedRoster =
                    rosterFromCode(rosterCode) || getEmptyRoster();
                currentTeam.setCurrentTeamWithCode(rosterCode);
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
        updatePlayerNumberAndOrder: (currentIndex: number, desired: number) => {
            update((store) => {
                if (
                    !Number.isInteger(desired) ||
                    desired > maxPlayerNumber ||
                    desired < 1
                ) {
                    return store;
                }

                const desiredIndex = desired - 1;
                const numberOfPlayers = store.players.length;
                let updatedPlayers: RosterPlayerRecord[] = store.players;
                if (desiredIndex >= store.players.length) {
                    updatedPlayers = Array(desired)
                        .fill({
                            deleted: true,
                            playerName: '',
                            alterations: { spp: 0, ni: 0 },
                            player: deletedPlayer(),
                        })
                        .map((p, i) =>
                            i < numberOfPlayers ? store.players[i] : p
                        );
                }
                const players = switchTwoElements(
                    updatedPlayers,
                    currentIndex,
                    desiredIndex
                );
                return { ...store, players };
            });
        },
        updatePlayerNumber: (currentIndex: number, desired: number) => {
            update((store) => {
                if (!Number.isInteger(desired) || desired > 99 || desired < 1) {
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
        set,
    };
}

const getEmptyRoster: (options?: NewRosterOptions) => Roster = (options) => {
    const gameSettings = getGameTypeSettings(options?.format || 'elevens');
    const emptyRoster: Roster = {
        rosterId: nanoid(),
        teamId: options?.teamId || 0,
        players: [],
        teamName: '',
        teamType: options?.teamType || ('' as TeamName),
        extra: { dedicated_fans: options?.fans || 0 },
        inducements: {},
        treasury: gameSettings?.startingTreasury || 1000,
        mode: options?.mode,
        format: options?.format || 'elevens',
        leagueRosterStatus: options?.mode === 'league' ? 'draft' : undefined,
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
    window.history.replaceState({}, '', '/');
    return rosterFromCode(code);
};

const rosterFromCode = (code: string) => {
    try {
        return stringToRoster(code);
    } catch (error) {
        return null;
    }
};

const getDefaultRoster: () => Roster = () => {
    let defaultRoster: Roster =
        rosterFromQueryString() ||
        JSON.parse(localStorage.getItem('roster')) ||
        getEmptyRoster();
    const players = defaultRoster.players;
    if (
        players.length > 0 &&
        players.some((p) => !p.alterations.playerNumber)
    ) {
        defaultRoster = {
            ...defaultRoster,
            players: assignPlayerNumbers(defaultRoster.players),
        };
    }
    if (!defaultRoster.rosterId) {
        defaultRoster.rosterId = nanoid();
    }
    if (defaultRoster.mode === 'league' && !defaultRoster.leagueRosterStatus) {
        defaultRoster.leagueRosterStatus = 'draft';
    }
    currentTeam.setCurrentTeamWithId(defaultRoster.teamId);
    return {
        ...defaultRoster,
        format: defaultRoster?.format || 'elevens',
    };
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
        index < maxPlayers ? index : players.findIndex((p) => p.deleted);

    return indexToAdd >= 0 && indexToAdd < players.length
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
    while (newPlayers[newPlayers.length - 1]?.deleted) {
        newPlayers.pop();
    }

    return newPlayers;
};

function assignPlayerNumbers(
    players: RosterPlayerRecord[]
): RosterPlayerRecord[] {
    return players.map((p, i) => {
        if (p?.alterations?.playerNumber) return p;
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
    return {
        ...player,
        alterations: {
            ...player?.alterations,
            playerNumber: generateEligibleNumber(players, index),
        },
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
        (p) => p.alterations.playerNumber === desiredNumber
    );
}

export const roster = createRoster();
