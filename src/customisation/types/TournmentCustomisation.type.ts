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
    colourScheme?: string;
    createTeamTitle?: string;
    cssVariables?: Record<string, string>;
};

export type TournamentAllowances = {
    sppPerTier?: Record<number, number>;
    sppCost?: SPPCost;
    sameSkillAllowance?: number;
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
