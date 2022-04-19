/** Convert all local rosters to firebase */

import { savedRosterIndex } from '../store/saveDirectory.store';
import { get as getValueFromStore } from 'svelte/store';
import type { RosterIndex } from '../models/rosterIndex.model';
import type { Roster } from '../models/roster.model';

export function getRostersForUpload(): Roster[] {
    const rosterIndex: RosterIndex = getValueFromStore(savedRosterIndex);
    return rosterIndex.index
        .map((roster) => getSavedRoster(`savedRoster${roster.id}`))
        .filter((x) => !!x);
}

function getSavedRoster(rosterKey: string): Roster {
    const rosterString = localStorage.getItem(rosterKey);
    return rosterString ? JSON.parse(rosterString) : null;
}
