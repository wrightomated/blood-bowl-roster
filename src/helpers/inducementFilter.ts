import type { Inducement } from '../models/inducement.model';
import type { Team } from '../models/team.model';

export const filterInducement = (
    inducement: Inducement,
    selectedTeam: Team
) => {
    return (
        filterApothecary(inducement, selectedTeam) &&
        requiresSpecialRule(inducement, selectedTeam) &&
        requiresTier(inducement, selectedTeam)
    );
};

const filterApothecary: (inducement: Inducement, team: Team) => boolean = (
    inducement,
    team
) => (inducement?.requiresApothecary ? team.allowedApothecary : true);

const requiresTier: (inducement: Inducement, team: Team) => boolean = (
    inducement,
    team
) => (inducement?.requiresTier ? inducement.requiresTier === team.tier : true);

const requiresSpecialRule: (inducement: Inducement, team: Team) => boolean = (
    inducement,
    team
) => {
    const rules = inducement.requiresSpecialRule;
    if (!rules) return true;

    if (Array.isArray(rules)) {
        return rules.some((r) => team.specialRules.includes(r));
    }

    return team.specialRules.includes(rules);
};
