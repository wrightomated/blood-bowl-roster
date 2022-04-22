export function getSavedRosterFromLocalStorage(rosterId: string | number) {
    const rosterString = localStorage.getItem(`savedRoster${rosterId}`);
    return rosterString ? JSON.parse(rosterString) : null;
}
