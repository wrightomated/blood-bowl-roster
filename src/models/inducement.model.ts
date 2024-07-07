import type { CollegeName } from './dungeonBowl.model';
import type { TeamName, TeamSpecialRule } from './team.model';

export interface Inducement {
    id: InducementKey;
    displayName?: string;
    cost: number;
    reducedCost?: InducementCostReduction;
    max: number;
    requiresSpecialRule?: TeamSpecialRule | TeamSpecialRule[];
    requiresApothecary?: boolean;
    sevensCost?: number;
    sevensMax?: number;
    dungeonBowlMax?: number;
    gutterBowlMax?: number;
    requiresTier?: number;
    /** No publication assumes rulebook */
    publication?:
        | 'rulebook'
        | 'deathzone'
        | 'spike'
        | 'dungeonBowl'
        | 'gutterBowl';
}

export interface InducementCostReduction {
    specialRule?: TeamSpecialRule;
    teamName?: TeamName | CollegeName;
    cost: number;
}

export type InducementKey = `i${number}`;
