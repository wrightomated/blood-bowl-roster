import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Roster, RosterPlayerRecord } from '../models/roster.model';
import type { TeamName } from '../models/team.model';

function createRoster() {
    const { subscribe, set, update }: Writable<Roster> = writable(
        JSON.parse(localStorage.getItem('roster')) || getEmptyRoster(),
    );

    return {
        subscribe,
        addPlayer: (player: RosterPlayerRecord) =>
            update((store) => {
                return { ...store, players: store.players.concat([player]) };
            }),
        removePlayer: (indices: number[]) =>
            update((store) => {
                return {
                    ...store,
                    players: store.players.filter((_, i) => !indices.includes(i)),
                };
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
                inducements: {
                    ...store.inducements,
                    [inducementKey]: store?.inducements?.[inducementKey]
                        ? store.inducements[inducementKey] - 1
                        : 0,
                },
            };
        }),
        addExtra: (extraKey: string) =>
            update((store) => {
                return {
                    ...store,
                    extra: {
                        ...store.extra,
                        [extraKey]: store?.extra?.[extraKey]
                            ? store.extra[extraKey] + 1
                            : 1,
                    },
                };
            }),
        removeExtra: (extraKey: string) =>
            update((store) => {
                return {
                    ...store,
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
        reset: (options?: { teamId: number; teamType: TeamName }) =>
            set(getEmptyRoster(options)),
        set,
    };
}

const getEmptyRoster: (options?: {
    teamId: number;
    teamType: TeamName;
}) => Roster = (options) => {
    return {
        teamId: options?.teamId || 0,
        players: [],
        rerolls: 0,
        teamName: '',
        teamType: options?.teamType || ('' as TeamName),
        extra: {},
        inducements: {},
        starPlayers: [],
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

export const roster = createRoster();
