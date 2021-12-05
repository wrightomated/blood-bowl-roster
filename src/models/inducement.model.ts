import type { TeamSpecialRule, TeamTier } from './team.model';

export interface Inducement {
    id: string;
    displayName: string;
    cost: number;
    reducedCost?: InducementCostReduction;
    max: number;
    requiresSpecialRule?: TeamSpecialRule | TeamSpecialRule[];
    requiresApothecary?: boolean;
    sevensCost?: number;
    sevensMax?: number;
    dungeonBowlMax?: number;
    requiresTier?: TeamTier;
}

export interface InducementCostReduction {
    specialRule?: TeamSpecialRule;
    cost: number;
}
