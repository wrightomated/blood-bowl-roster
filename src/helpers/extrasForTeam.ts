import { sendEventToAnalytics } from '../analytics/plausible';
import { teamData } from '../data/teams.data';
import type { Extra, ExtraString } from '../models/extra.model';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import { getGameTypeSettings } from './gameSettings';

export const extrasForTeam: (
    teamId: string,
    rosterMode: RosterMode,
    teamFormat: TeamFormat
) => Extra[] = (teamId, rosterMode, teamFormat) => {
    try {
        if (teamFormat === 'dungeon bowl') {
            return [
                {
                    extraString: 'rerolls' as ExtraString,
                    cost: 50,
                    max: 8,
                },
            ];
        }
        return getExtras(teamId, rosterMode, teamFormat);
    } catch (error) {
        sendEventToAnalytics('exception', {
            description: 'Problem creating extras for team',
            error: error,
            fatal: true,
        });
        return [];
    }
};

const getExtras = (
    teamId: string,
    rosterMode: RosterMode,
    teamFormat: TeamFormat
) => {
    const team = teamData.teams.find((x) => x.id === teamId);
    const gameSettings = getGameTypeSettings(teamFormat);
    return [
        {
            extraString: 'rerolls' as ExtraString,
            cost: team.reroll.cost * gameSettings.rerollDetails.costMultiplier,
            max: gameSettings.rerollDetails.max,
        },
        {
            ...gameSettings.assistantCoaches,
            extraString: 'assistant_coaches' as ExtraString,
        },
        {
            ...gameSettings.cheerleaders,
            extraString: 'cheerleaders' as ExtraString,
        },
        {
            ...gameSettings.dedicatedFans,
            extraString: 'dedicated_fans' as ExtraString,
            min: rosterMode === 'exhibition' ? 0 : 1,
            max:
                gameSettings.dedicatedFans.max +
                (rosterMode === 'exhibition' ? 0 : 1),
        },
        {
            ...gameSettings.apothecary,
            extraString: 'apothecary' as ExtraString,
        },
    ].filter((x) => x.extraString !== 'apothecary' || team.allowedApothecary);
};
