import type { TeamName } from '../../models/team.model';
import type { TeamFormat } from '../../types/teamFormat';
import type { CustomiseTeamList } from './CustomiseTeamList.type';

export type TournamentCustomisation = {
    // Treasury in thousands
    treasury: number;
    tournamentTeamList?: CustomiseTeamList;
    excludedInducementIds?: string[];
    updatedTierMap?: Partial<Record<TeamName, number>>;
    tiers?: number;
    allowances?: TournamentAllowances;
    format: TeamFormat;
    colourScheme?: string;
    createTeamTitle?: string;
    cssVariables?: Record<string, string>;
};

export type TournamentAllowances = {
    sameSkillAllowance?: number;
    statImprovementAllowancePerPlayer?: number;
    allowTraitRemoval?: number;
    disallowTraitRemovalIds?: number[];
    traitAndStatSameAllowance?: boolean;
    increaseTierPerStarPlayer?: boolean;
};

// Tier 0: 12 SPP (2 x Primary only*)

// Tier 1: 42 SPP (7 x primary or equivalent)

// Tier 2: 54 SPP (9 x primary or equivalent)

// Tier 3: 66 SPP (11 x primary or equivalent)

// Tier 4: 78 SPP (13 x primary or equivalent)

// * SPPs available to teams in Tier 0 can only be spent on Primary Skills, and cannot be used to purchase Secondary Skills.

// Coaches may spend SPP to purchase the following advancements:

// Choose a Primary Skill: 6 SPP

// Choose a Secondary Skill: 12 SPP

// Improve either MA , PA or AV by 1: 15 SPP

// Improve AG by 1: 18 SPP

// Improve ST by 1 or Remove a Trait (except Secret Weapon): 24 SPP
const tierAllowances = {
    0: 12,
    1: 42,
    2: 54,
    3: 66,
    4: 78,
};
const costs = {
    primarySkill: 6,
    secondarySkill: 12,
    statIncrease: 15,
    agIncrease: 18,
    stIncrease: 24,
    traitRemoval: 24,
};
