import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Roster, RosterPlayerRecord } from '../models/roster.model';
import type { TeamName } from '../models/team.model';
import { deletedPlayer, stringToRoster } from '../helpers/stringToRoster';
import { currentTeam } from './currentTeam.store';
import { inducementCost } from '../helpers/totalInducementAmount';
import type { RosterMode } from './rosterMode.store';
import { savedRosterIndex } from './saveDirectory.store';
import { getGameTypeSettings, getMaxPlayers } from '../data/gameType.data';
import type { TeamFormat } from './teamFormat.store';
import { unsavedRoster } from './unsavedRoster.store';
import { systemNotificationMessage } from './systemNotification.store';

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
                    saved: false,
                    players: addPlayerToPlayers(
                        store.players,
                        player,
                        getMaxPlayers(store?.format),
                        index
                    ),
                    treasury: store.treasury - player.player.cost,
                };
            }),
        removePlayer: (indices: number[], firePlayer: boolean) =>
            update((store) => {
                return {
                    ...store,
                    saved: false,
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
                return { ...store, saved: false, players: updatedPlayers };
            }),
        movePlayerUp: (index: number) =>
            update((store) => {
                return {
                    ...store,
                    saved: false,
                    players: switchTwoElements(store.players, index, index - 1),
                };
            }),
        movePlayerDown: (index: number) =>
            update((store) => {
                return {
                    ...store,
                    saved: false,
                    players: switchTwoElements(store.players, index, index + 1),
                };
            }),
        addInducement: (inducementKey: string) =>
            update((store) => {
                return {
                    ...store,
                    saved: false,
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
                    saved: false,
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
                return { ...store, saved: false, inducements: {} };
            }),
        addExtra: (extraKey: string, extraCost: number) =>
            update((store) => {
                return {
                    ...store,
                    saved: false,
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
                    saved: false,
                    treasury: store.treasury + extraCost,
                    extra: {
                        ...store.extra,
                        [extraKey]: store?.extra?.[extraKey]
                            ? store.extra[extraKey] - 1
                            : 0,
                    },
                };
            }),
        loadRoster: (rosterKey: string) =>
            update((store) => {
                unsavedRoster.saveUnsavedRoster(store);
                return getSavedRoster(rosterKey) || store;
            }),
        codeToRoster: (rosterCode: string) =>
            update((store) => {
                const decodedRoster = rosterFromCode(rosterCode);
                if (decodedRoster) {
                    currentTeam.setCurrentTeamWithCode(rosterCode);
                    savedRosterIndex.newId();
                    unsavedRoster.saveUnsavedRoster(store);
                    return decodedRoster;
                }
                systemNotificationMessage.set(
                    'The inputted code could not be loaded.'
                );
                return store;
            }),
        changeRosterMode: (mode: RosterMode) =>
            update((store) => {
                return { ...store, saved: false, mode };
            }),
        updatePlayerNumber: (currentIndex: number, desired: number) => {
            update((store) => {
                if (
                    !Number.isInteger(desired) ||
                    desired > getMaxPlayers(store?.format) ||
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
        reset: (options?: {
            teamId: number;
            teamType: TeamName;
            mode: RosterMode;
            format: TeamFormat;
            fans: number;
        }) => {
            update((store) => {
                unsavedRoster.saveUnsavedRoster(store);
                return getEmptyRoster(options);
            });
        },
        setSaved: () => {
            update((store) => {
                return {
                    ...store,
                    saved: true,
                };
            });
        },
        set: (value: Roster) => {
            const newRoster = { ...value, saved: false };
            set(newRoster);
        },
    };
}

const getEmptyRoster: (options?: {
    teamId: number;
    teamType: TeamName;
    fans: number;
    mode: RosterMode;
    format: TeamFormat;
}) => Roster = (options) => {
    const gameSettings = getGameTypeSettings(options?.format);
    return {
        teamId: options?.teamId || 0,
        players: [],
        teamName: '',
        teamType: options?.teamType || ('' as TeamName),
        extra: { dedicated_fans: options?.fans || 0 },
        inducements: {},
        treasury: gameSettings?.startingTreasury || 1000,
        mode: options?.mode,
        format: options?.format || 'elevens',
        saved: true,
    };
};

const getSavedRoster: (rosterKey: string) => Roster = (rosterKey: string) => {
    try {
        const rosterString = localStorage.getItem(rosterKey);
        return JSON.parse(rosterString);
    } catch {
        systemNotificationMessage.set('Error retrieving saved roster.');
        return null;
    }
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
    const code = window.location.search.substring(1).split('=')[1];
    return rosterFromCode(code);
};

const rosterFromCode: (code: string) => Roster | null = (code) => {
    try {
        return stringToRoster(code);
    } catch (error) {
        return null;
    }
};

const getDefaultRoster: () => Roster = () => {
    const retrievedRoster = rosterFromQueryString();

    if (retrievedRoster) {
        try {
            const currentRoster: Roster = JSON.parse(
                localStorage.getItem('roster')
            );
            if (!currentRoster.saved)
                unsavedRoster.saveUnsavedRoster(currentRoster);
        } catch (error) {}
    }
    return (
        retrievedRoster ||
        JSON.parse(localStorage.getItem('roster')) ||
        getEmptyRoster()
    );
};

const addPlayerToPlayers: (
    players: RosterPlayerRecord[],
    newPlayer: RosterPlayerRecord,
    maxPlayers: number,
    index?: number
) => RosterPlayerRecord[] = (players, newPlayer, maxPlayers, index) => {
    const indexToAdd =
        index < maxPlayers ? index : players.findIndex((p) => p.deleted);

    return indexToAdd >= 0 && indexToAdd < players.length
        ? players.map((p, i) => (i === indexToAdd ? newPlayer : p))
        : players.concat([newPlayer]);
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
                  player: deletedPlayer(),
              }
            : p
    );
    while (newPlayers[newPlayers.length - 1]?.deleted) {
        newPlayers.pop();
    }

    return newPlayers;
};

export const roster = createRoster();
