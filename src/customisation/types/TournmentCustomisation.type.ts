import type { SkillIncreaseCost } from '../../data/advancementCost.data';
import type { GameType } from '../../models/gameType.model';
import type { TeamName } from '../../models/team.model';
import type { TeamFormat } from '../../types/teamFormat';
import type { CustomiseTeamList } from './CustomiseTeamList.type';

export type TournamentCustomisation = {
    gameTypeSettings: GameType;
    tournamentTeamList?: CustomiseTeamList;
    excludedInducementIds?: string[];
    updatedTierMap?: Partial<Record<TeamName, number>>;
    tiers?: number;
    allowances?: TournamentAllowances;
    format: TeamFormat;
    colourScheme?: string;
    createTeamTitle?: string;
    cssVariables?: Record<string, string>;
    tournamentAdvancements?: TournamentAdvancements;
};

export type TournamentAllowances = {
    /** How many of the same skill are allowed in the team */
    sameSkillAllowance?: number;
    statImprovementAllowancePerPlayer?: number;
    allowTraitRemoval?: number;
    increaseTierPerStarPlayer?: boolean;
};

type TournamentAdvancements = {
    tiers: Record<string, TierAllowance>;
    advancementCost?: SkillIncreaseCost;
    characteristicCostIncrease?: number[];
    advancements: {
        primaryrandom?: number;
        primaryselect?: number;
        secondaryrandom?: number;
        secondaryselect?: number;
        characteristic?: {
            ma?: number;
            pa?: number;
            av?: number;
            ag?: number;
            st?: number;
        };
        traitRemoval?: { spp: number; disallowedTraits?: number[] };
    };
};

type TierAllowance = {
    spp: number;
    restrictions?: ('primary' | 'secondary')[];
};
