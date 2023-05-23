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
};

export type TournamentAllowances = {
    teamSppAllowance?: number;
    sameSkillAllowance?: number;
    statImprovementAllowancePerPlayer?: number;
    allowTraitRemoval?: number;
    disallowTraitRemovalIds?: number[];
    traitAndStatSameAllowance?: boolean;
};
