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

/**
 * This function is used to update old db team ids to the new format
 *
 * ids used to be numbers, now they are strings. Db teams ids were over 100, so we can check if the team is a db team by checking if the id is over 100 and a number;
 */
export function updateOldTeamId(teamId: number | string): string {
    if (!teamId) return '';
    if (typeof teamId === 'number' && teamId > 100) {
        return 'db' + teamId;
    }
    return teamId.toString();
}
