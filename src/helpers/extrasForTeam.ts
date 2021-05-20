import { teamData } from '../data/teams.data';
import type { Extra, ExtraString } from '../models/extra.model';
import type { RosterMode } from '../store/rosterMode.store';

export const extrasForTeam: (
    teamId: number,
    rosterMode: RosterMode,
) => Extra[] = (teamId, rosterMode) => {
    const team = teamData.teams.find((x) => x.id === teamId);
    return [
        {
            extraString: 'rerolls' as ExtraString,
            cost: team.reroll.cost,
            max: team.reroll.max,
        },
        { extraString: 'assistant_coaches' as ExtraString, cost: 10, max: 6 },
        { extraString: 'cheerleaders' as ExtraString, cost: 10, max: 12 },
        {
            extraString: 'dedicated_fans' as ExtraString,
            cost: 10,
            max: 6,
            min: rosterMode === 'exhibition' ? 0 : 1,
        },
        { extraString: 'apothecary' as ExtraString, cost: 50, max: 1 },
    ].filter((x) => x.extraString !== 'apothecary' || team.apothecary);
};
