import { inducementData } from '../data/inducements.data';
import { teamData } from '../data/teams.data';
import type { Inducement } from '../models/inducement.model';
import type { InducementsRecord } from '../models/roster.model';
import type { TeamSpecialRule } from '../models/team.model';
import type { TeamFormat } from '../types/teamFormat';

export const calculateInducementTotal = (
    inducements: InducementsRecord,
    teamId: string,
    format: TeamFormat,
    customInducements?: Inducement[]
) => {
    return Object.keys(inducements)
        .map(
            (key) =>
                inducementCost(format, key, teamId, customInducements) *
                inducements[key]
        )
        .reduce((a, b) => a + b, 0);
};

export const inducementCost = (
    format: TeamFormat,
    key: string,
    teamId: string,
    customInducements?: Inducement[]
) => {
    const specialRules: TeamSpecialRule[] =
        teamData.teams.find((x) => x.id === teamId)?.specialRules || [];
    let ind = inducementData.inducements.find((x) => x.id === key);
    if (ind === undefined && customInducements) {
        ind = customInducements.find((x) => x.id === key);
    }

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
