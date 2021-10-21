import { inducementData } from '../data/inducements.data';
import { teamData } from '../data/teams.data';
import type { ExtraRosterInfo } from '../models/roster.model';
import type { TeamSpecialRule } from '../models/team.model';
import type { TeamFormat } from '../store/teamFormat.store';

export const calculateInducementTotal = (
    inducements: ExtraRosterInfo,
    teamId: number,
    format: TeamFormat
) => {
    return Object.keys(inducements)
        .map((key) => inducementCost(format, key, teamId) * inducements[key])
        .reduce((a, b) => a + b, 0);
};

export const inducementCost = (
    format: TeamFormat,
    key: string,
    teamId: number
) => {
    const specialRules: TeamSpecialRule[] = teamData.teams.find(
        (x) => x.id === teamId
    ).specialRules;
    const ind = inducementData.inducements.find((x) => x.id === key);

    if (
        ind?.reducedCost &&
        specialRules.includes(ind.reducedCost?.specialRule)
    ) {
        return ind.reducedCost.cost;
    }

    return ind?.reducedCost &&
        specialRules.includes(ind.reducedCost?.specialRule)
        ? ind.reducedCost.cost
        : format === 'sevens' && ind.sevensCost
        ? ind.sevensCost
        : ind.cost;
};
