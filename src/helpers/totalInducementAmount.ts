import { inducementData } from '../data/inducements.data';
import { teamData } from '../data/teams.data';
import type { ExtraRosterInfo } from '../models/roster.model';
import type { TeamSpecialRule } from '../models/team.model';

export const calculateInducementTotal = (
    inducements: ExtraRosterInfo,
    teamId: number,
) => {
    return Object.keys(inducements)
        .map((key) => inducementCost(key, teamId) * inducements[key])
        .reduce((a, b) => a + b, 0);
};

export const inducementCost = (key: string, teamId: number) => {
    const specialRules: TeamSpecialRule[] = teamData.teams.find(
        (x) => x.id === teamId,
    ).specialRules;
    const ind = inducementData.inducements.find((x) => x.id === key);
    if (
        ind?.reducedCost &&
        specialRules.includes(ind.reducedCost?.specialRule)
    ) {
        return ind.reducedCost.cost;
    }
    return ind.cost;
};
