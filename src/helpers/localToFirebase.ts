/** Convert all local rosters to firebase */

import { savedRosterIndex } from '../store/saveDirectory.store';
import { get as getValueFromStore } from 'svelte/store';
import type { RosterIndex } from '../models/rosterIndex.model';

export function getRostersForUpload() {
    const rosterIndex: RosterIndex = getValueFromStore(savedRosterIndex);
    return rosterIndex.index
        .map((roster) => getSavedRoster(`savedRoster${roster.id}`))
        .filter((x) => !!x);
}

function getSavedRoster(rosterKey: string) {
    const rosterString = localStorage.getItem(rosterKey);
    return rosterString ? JSON.parse(rosterString) : null;
}
