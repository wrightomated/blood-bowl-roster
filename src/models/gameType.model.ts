import type {
    AdvancementType,
    SelectionType,
} from '../data/advancementCost.data';
import type { TeamFormat } from '../types/teamFormat';

export interface GameType {
    teamFormat: TeamFormat;
    maxPlayers: number;
    minPlayers: number;
    startingTreasury: number;
    rerollDetails: {
        costMultiplier: number;
        max: number;
        overrideCost?: number;
    };
    assistantCoaches: RosterExtra;
    cheerleaders: RosterExtra;
    apothecary: RosterExtra;
    dedicatedFans: RosterExtra;
    advancementSettings?: {
        type: AdvancementType;
        selectionTypes: SelectionType[];
    }[];
    maxPositionals?: number;
    starPlayersAllowance?: number;
    // | { default: number; rules: StarPlayerInclusionRules[] };
}

type RosterExtra = {
    cost: number;
    max: number;
};

type StarPlayerInclusionRules =
    | {
          tier: number;
          max: number;
      }
    | { id: number; max: number };
