import { inducementData } from '../data/inducements.data';
import type { ExtraRosterInfo } from '../models/roster.model';
import type { TeamSpecialRule } from '../models/team.model';

export const calculateInducementTotal = (
    inducements: ExtraRosterInfo,
    specialRules: TeamSpecialRule[],
) => {
    return Object.keys(inducements)
        .map((key) => {
            const ind = inducementData.inducements.find((x) => x.id === key);
            if (
                ind?.reducedCost &&
                specialRules.includes(ind.reducedCost?.specialRule)
            ) {
                return ind.reducedCost.cost * inducements[key];
            }
            return ind.cost * inducements[key];
        })
        .reduce((a, b) => a + b, 0);
};
