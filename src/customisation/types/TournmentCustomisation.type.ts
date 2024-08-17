import type { AdvancementSetting } from '../../models/gameType.model';
import type { Inducement } from '../../models/inducement.model';
import type { StarPlayer } from '../../models/player.model';
import type { TeamName } from '../../models/team.model';
import type { RosterMode } from '../../store/rosterMode.store';
import type { TeamFormat } from '../../types/teamFormat';
import type { CustomiseTeamList } from './CustomiseTeamList.type';

export type TournamentCustomisation = {
    // Treasury in thousands
    treasury: number;
    lockTreasury?: boolean;
    tournamentTeamList?: CustomiseTeamList;
    updatedTierMap?: Partial<Record<TeamName, number>>;
    tiers?: number;
    allowances?: TournamentAllowances;
    format: TeamFormat;
    mode?: RosterMode;
    validator?: ValidatorOptions;
    colourScheme?: string;
    // createTeamTitle?: string;
    cssVariables?: Record<string, string>;
    advancementSettings?: AdvancementSetting[];
    starPlayerSettings?: {
        excludeStarPlayers?: string[];
        /** Spp */
        starPlayerCost?: {
            star: number;
            megaStar: number;
        };
        // id starts at 1000
        customStarPlayers?: StarPlayer[];
    };
    inducementSettings?: {
        /** Specific inducements to exclude */
        excludedInducementIds?: string[];
        /** Specific inducements to include, will exclude all others except custom inducements */
        includedInducementIds?: string[];
        // id starts at 1000
        customInducements?: Inducement[];
    };
    customContent?: {
        createTeamTitle?: string;
        menuSubtitle?: string;
        teamTypeTitle?: string;
    };
    hideProfile?: boolean;
};

export type TournamentAllowances = {
    sppCost?: SPPCost;
    /** Skill points as per matched play guide, effectively spp / 6 */
    useSkillPoints?: boolean;
    blockSppEditing?: boolean;
    maxOfSkillId?: number;
    noSkillStacking?: boolean | SkillStack;
    statImprovementAllowancePerPlayer?: number;
    allowTraitRemoval?: number;
    disallowTraitRemovalIds?: number[];
    traitAndStatSameAllowance?: boolean;
    increaseTierPerStarPlayer?: boolean;
    allowancesPerTier?: Record<
        number,
        {
            primarySkill?: number;
            secondarySkill?: number;
            starPlayer?: number;
            spp: number;
        }
    >;
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

/** TODO: better typing */
type SkillStack = {
    primary: number;
    secondary: number;
};
