import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Roster, RosterPlayerRecord } from '../models/roster.model';
import type { TeamName } from '../models/team.model';
import { stringToRoster } from '../helpers/stringToRoster';
import { currentTeam } from './currentTeam.store';
import { inducementCost } from '../helpers/totalInducementAmount';
import type { RosterMode } from './rosterMode.store';
import { savedRosterIndex } from './saveDirectory.store';

function createRoster() {
    const { subscribe, set, update }: Writable<Roster> = writable(
        getDefaultRoster(),
    );

    return {
        subscribe,
        addPlayer: (player: RosterPlayerRecord) =>
            update((store) => {
                if (store.players.length >= 16) {
                    return store;
                }
                return {
                    ...store,
                    players: store.players.concat([player]),
                    treasury: store.treasury - player.player.cost,
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
                    players: store.players.filter(
                        (_, i) => !indices.includes(i),
                    ),
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
                        inducementCost(inducementKey, store.teamId),
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
                        inducementCost(inducementKey, store.teamId),
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
        loadRoster: (rosterKey: string) =>
            update((store) => {
                return { ...getSavedRoster(rosterKey) };
            }),
        codeToRoster: (rosterCode: string) =>
            update((store) => {
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
        reset: (options?: {
            teamId: number;
            teamType: TeamName;
            mode: RosterMode;
            fans: number;
        }) => set(getEmptyRoster(options)),
        set,
    };
}

const getEmptyRoster: (options?: {
    teamId: number;
    teamType: TeamName;
    fans: number;
    mode: RosterMode;
}) => Roster = (options) => {
    return {
        teamId: options?.teamId || 0,
        players: [],
        teamName: '',
        teamType: options?.teamType || ('' as TeamName),
        extra: { dedicated_fans: options?.fans || 0 },
        inducements: {},
        treasury: 1000,
        mode: options?.mode,
    };
};

const getSavedRoster: (rosterKey: string) => Roster = (rosterKey: string) => {
    const rosterString = localStorage.getItem(rosterKey);
    return rosterString ? JSON.parse(rosterString) : null;
};

const switchTwoElements = (arr: any[], index1: number, index2: number) => {
    if (
        typeof arr[index1] === 'undefined' ||
        typeof arr[index2] === 'undefined'
    ) {
        return arr;
    }
    return arr.map((x, i, a) =>
        i === index1 ? a[index2] : i === index2 ? a[index1] : x,
    );
};

const rosterFromQueryString = () => {
    const code = window.location.search.substring(1).split('=')[1];
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
    return (
        rosterFromQueryString() ||
        JSON.parse(localStorage.getItem('roster')) ||
        getEmptyRoster()
    );
};

export const roster = createRoster();
