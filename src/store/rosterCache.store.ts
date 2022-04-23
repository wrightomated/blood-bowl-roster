import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Roster, RosterPreviews } from '../models/roster.model';

function createRosterCache() {
    const { subscribe, set, update }: Writable<RosterCache> = writable(
        getEmptyCache()
    );

    return {
        subscribe,
        cacheRosterPreviews: (cachedItem: RosterPreviews) => {
            update((store) => {
                return {
                    ...store,
                    rosterPreviews: {
                        valid: true,
                        cachedItem,
                    },
                };
            });
        },
        cacheRoster: (cachedItem: Roster) => {
            update((store) => {
                return {
                    ...store,
                    rosters: {
                        ...store.rosters,
                        [cachedItem.rosterId]: {
                            valid: true,
                            cachedItem,
                        },
                    },
                };
            });
        },
        invalidateRosterPreviews: () =>
            update((store) => {
                return {
                    ...store,
                    rosterPreviews: {
                        ...store.rosterPreviews,
                        valid: false,
                    },
                };
            }),
        invalidateRoster: (rosterId: string) =>
            update((store) => {
                return {
                    ...store,
                    rosters: {
                        ...store.rosters,
                        [rosterId]: {
                            ...store.rosters?.[rosterId],
                            valid: false,
                        },
                    },
                };
            }),
        clearCache: () => set(getEmptyCache()),
    };
}

function getEmptyCache(): RosterCache {
    return {
        rosterPreviews: { valid: false, cachedItem: {} },
        rosters: {},
    };
}

export const rosterCache = createRosterCache();

export type RosterCache = {
    rosterPreviews: RosterCacheItem<RosterPreviews>;
    rosters: { [key: string]: RosterCacheItem<Roster> };
};

export type RosterCacheItem<T> = {
    valid: boolean;
    cachedItem: T;
};
