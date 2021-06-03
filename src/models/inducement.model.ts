import type { TeamSpecialRule } from './team.model';

export interface Inducement {
    id: string;
    displayName: string;
    cost: number;
    reducedCost?: InducementCostReduction;
    max: number;
    requiresSpecialRule?: TeamSpecialRule;
    requiresApothecary?: boolean;
    sevensCost?: number;
    sevensMax?: number;
}

export interface InducementCostReduction {
    specialRule?: TeamSpecialRule;
    cost: number;
}
