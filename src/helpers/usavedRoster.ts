import type { Roster } from '../models/roster.model';

const unsavedRosterKey = 'unsavedRoster';

export const getUnsavedRoster: () => Roster = () => {
    try {
        return JSON.parse(localStorage.getItem(unsavedRosterKey));
    } catch (error) {
        return null;
    }
};

export const saveUnsavedRoster: (roster: Roster) => void = (roster) => {
    const stringRoster = JSON.stringify(roster);
    if (stringRoster) localStorage.setItem(unsavedRosterKey, stringRoster);
};

export const clearUnsavedRoster = () => {
    localStorage.removeItem(unsavedRosterKey);
};
