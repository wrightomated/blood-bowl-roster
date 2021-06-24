import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import {
    clearUnsavedRoster,
    getUnsavedRoster,
    saveUnsavedRoster,
} from '../helpers/usavedRoster';
import type { Roster } from '../models/roster.model';
import { systemNotificationMessage } from './systemNotification.store';

const createUnsavedRosterStore = () => {
    const { subscribe, set }: Writable<Roster | null> = writable<Roster | null>(
        getUnsavedRoster()
    );
    return {
        subscribe,
        saveUnsavedRoster: (roster: Roster) => {
            if (roster.saved) {
                systemNotificationMessage.set('');
                return;
            }
            saveUnsavedRoster(roster);
            systemNotificationMessage.set(
                'An unsaved roster has been replaced, it is temporarily accessible in Load Team.'
            );
            set(roster);
        },
        removeUnsavedRoster: () => {
            clearUnsavedRoster();
            set(null);
        },
    };
};

export const unsavedRoster = createUnsavedRosterStore();

export const unsavedRosterName = derived(
    unsavedRoster,
    ($unsavedRoster) =>
        $unsavedRoster?.teamName || $unsavedRoster?.teamType || null
);
