import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import type { Extra, ExtraString } from '../models/extra.model';
import type { Roster } from '../models/roster.model';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import { getGameTypeSettings } from './gameSettings';

export function extrasTotalCost(
    roster: Roster,
    currentTeam: CustomTeam,
    includeDedicatedFans: boolean
) {
    const extras = extrasForTeam(roster.mode, roster.format, currentTeam);
    const extraTotal = extras
        .filter(
            (x) => includeDedicatedFans || x.extraString !== 'dedicated_fans'
        )
        .map((x) => roster.extra[x.extraString] * x.cost || 0)
        .reduce((a, b) => a + b, 0);
    return extraTotal;
}

export const extrasForTeam: (
    rosterMode: RosterMode,
    teamFormat: TeamFormat,
    currentTeam: CustomTeam
) => Extra[] = (rosterMode, teamFormat, currentTeam) => {
    return getExtras(rosterMode, teamFormat, currentTeam);
};

const getExtras = (
    rosterMode: RosterMode,
    teamFormat: TeamFormat,
    currentTeam: CustomTeam
) => {
    const gameSettings = getGameTypeSettings(teamFormat);
    return [
        {
            extraString: 'rerolls' as ExtraString,
            cost:
                gameSettings.rerollDetails.overrideCost ||
                currentTeam.reroll.cost *
                    gameSettings.rerollDetails.costMultiplier,
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
                gameSettings.dedicatedFans.max > 0
                    ? gameSettings.dedicatedFans.max +
                      (rosterMode === 'exhibition' ? 0 : 1)
                    : 0,
        },
        {
            ...gameSettings.apothecary,
            extraString: 'apothecary' as ExtraString,
        },
    ].filter(
        (x) =>
            x.max > 0 &&
            (x.extraString !== 'apothecary' || currentTeam.allowedApothecary)
    );
};
