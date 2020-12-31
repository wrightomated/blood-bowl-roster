import type { TeamSpecialRule } from './team.model';

export interface Inducement {
    id: string;
    displayName: string;
    cost: number | 'variable';
    reducedCost?: InducementCostReduction;
    max: number;
    requiresSpecialRule?: TeamSpecialRule;
    requiresApothecary?: boolean;
}

export interface InducementCostReduction {
    specialRule?: TeamSpecialRule;
    cost: number;
}
