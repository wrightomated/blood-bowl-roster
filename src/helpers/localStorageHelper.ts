export function getSavedRosterFromLocalStorage(rosterId: string) {
    const rosterString = localStorage.getItem(`savedRoster${rosterId}`);
    return rosterString ? JSON.parse(rosterString) : null;
}
