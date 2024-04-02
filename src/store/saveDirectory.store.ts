import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { RosterIndex } from '../models/rosterIndex.model';
import type { Roster } from '../models/roster.model';

const createSavedRosterIndex = () => {
    const { subscribe, update }: Writable<RosterIndex> = writable(
        getRosterFromStorage() || {
            currentIndex: 0,
            index: [],
            count: 0,
        }
    );
    return {
        subscribe,
        newId: () =>
            update((store) => {
                const newId = store.count + 1;
                return {
                    ...store,
                    count: newId,
                    currentIndex: newId,
                };
            }),

        addRoster: (roster: Roster) =>
            update((store) => {
                addRosterToStorage(store.currentIndex, roster);
                return {
                    ...store,
                    index: updatedRosterIndex(
                        store.currentIndex,
                        store.index,
                        roster.teamName
                    ),
                };
            }),
        copyRoster: (roster: Roster) =>
            update((store) => {
                const newId = store.count + 1;

                addRosterToStorage(newId, roster);
                return {
                    ...store,
                    count: newId,
                    currentIndex: newId,
                    index: updatedRosterIndex(
                        newId,
                        store.index,
                        roster.teamName
                    ),
                };
            }),
        removeRoster: () =>
            update((store) => {
                removeRosterFromStorage(store.currentIndex);
                return {
                    ...store,
                    index: store.index.filter(
                        (x) => store.currentIndex !== x.id
                    ),
                };
            }),
        removeIdFromIndex: (id: number) =>
            update((store) => {
                return {
                    ...store,
                    index: store.index.filter((x) => x.id !== id),
                };
            }),
        updateCurrentIndex: (indexNumber: number) =>
            update((store) => {
                return {
                    ...store,
                    currentIndex: indexNumber,
                };
            }),
    };
};

const getRosterFromStorage = () =>
    JSON.parse(localStorage.getItem('rosterIndex'));

const removeRosterFromStorage = (id: number) => {
    localStorage.removeItem(storageKeyFromId(id));
};

const addRosterToStorage = (id: number, roster: Roster) => {
    localStorage.setItem(storageKeyFromId(id), JSON.stringify(roster));
};

const storageKeyFromId = (id: number) => {
    return `savedRoster${id}`;
};

const updatedRosterIndex = (
    currentIndex: number,
    rosterIndex: { id: number; name: string }[],
    name: string
) => {
    const cId = currentIndex;
    const record = {
        id: cId,
        name: name,
    };

    if (rosterIndex.find((x) => x.id === cId)) {
        return rosterIndex.map((v) => (v.id === cId ? record : v));
    } else {
        return rosterIndex.concat([record]);
    }
};

export const savedRosterIndex = createSavedRosterIndex();
