import type { Roster } from '../models/roster.model';
export const CURRENT_ROSTER_VERSION = '3.0';
export function versionCheck(roster: Roster): Roster {
    let updatedRoster = roster;
    if (!roster.version || roster?.version < CURRENT_ROSTER_VERSION) {
        if (roster.format === 'dungeon bowl' && !roster.teamId.includes('db')) {
            updatedRoster = {
                ...updatedRoster,
                teamId: 'db' + updatedRoster.teamId,
            };
        }

        updatedRoster = {
            ...updatedRoster,
            version: CURRENT_ROSTER_VERSION,
        };
    }
    return updatedRoster;
}
