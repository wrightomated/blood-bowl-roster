import { getGameTypeSettings } from '../data/gameType.data';
import { teamData } from '../data/teams.data';
import type { Extra, ExtraString } from '../models/extra.model';
import type { TeamFormat } from '../models/gameType.model';
import type { RosterMode } from '../store/rosterMode.store';

export const extrasForTeam: (
    teamId: number,
    rosterMode: RosterMode,
    teamFormat: TeamFormat
) => Extra[] = (teamId, rosterMode, teamFormat) => {
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
        },
        {
            ...gameSettings.apothecary,
            extraString: 'apothecary' as ExtraString,
        },
    ].filter((x) => x.extraString !== 'apothecary' || team.allowedApothecary);
};
