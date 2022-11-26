import type { MatchHistoryRecord } from '../models/matchHistory.model';
import type { Roster } from '../models/roster.model';

export function getSavedRosterFromLocalStorage(
    rosterId: string | number
): Roster | null {
    return getJsonFromStorage(`savedRoster${rosterId}`);
}

export function getSavedMatchHistoryFromLocal(
    matchHistoryId: string
): MatchHistoryRecord | null {
    return getJsonFromStorage(matchHistoryId);
}

export function saveMatchHistoryToLocal(
    id: string,
    matchHistory: MatchHistoryRecord
) {
    saveJsonToStorage(id, matchHistory);
}

function getJsonFromStorage(key: string) {
    const item = localStorage.getItem(key);
    try {
        return JSON.parse(item);
    } catch (error) {
        return null;
    }
}

function saveJsonToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}
