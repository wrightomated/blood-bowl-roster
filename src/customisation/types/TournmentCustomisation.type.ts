import type { AdvancementSetting } from '../../models/gameType.model';
import type { TeamName } from '../../models/team.model';
import type { RosterMode } from '../../store/rosterMode.store';
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
    mode?: RosterMode;
    validator?: ValidatorOptions;
    colourScheme?: string;
    createTeamTitle?: string;
    cssVariables?: Record<string, string>;
    advancementSettings?: AdvancementSetting[];
    starPlayerCost?: {
        star: number;
        megaStar: number;
    };
};

export type TournamentAllowances = {
    sppPerTier?: Record<number, number>;
    sppCost?: SPPCost;
    maxOfSkill?: number;
    advancements?: AdvancementAllowances;
    statImprovementAllowancePerPlayer?: number;
    allowTraitRemoval?: number;
    disallowTraitRemovalIds?: number[];
    traitAndStatSameAllowance?: boolean;
    increaseTierPerStarPlayer?: boolean;
};

export type SPPCost = {
    primarySkill?: number;
    secondarySkill?: number;
    statIncrease?: number;
    agIncrease?: number;
    stIncrease?: number;
    traitRemoval?: number;
};

export type ValidatorOptions = {
    enable: boolean;
};

export type AdvancementAllowances = {};
