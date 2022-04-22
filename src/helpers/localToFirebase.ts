/** Convert all local rosters to firebase */

import { savedRosterIndex } from '../store/saveDirectory.store';
import { get as getValueFromStore } from 'svelte/store';
import type { RosterIndex } from '../models/rosterIndex.model';
import type { Roster } from '../models/roster.model';
import { getSavedRosterFromLocalStorage } from './localStorageHelper';

export function getRostersForUpload(): Roster[] {
    const rosterIndex: RosterIndex = getValueFromStore(savedRosterIndex);
    return rosterIndex.index
        .map((roster) => getSavedRosterFromLocalStorage(roster.id))
        .filter((x) => !!x);
}
