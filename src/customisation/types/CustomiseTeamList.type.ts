import type {
    TeamPlayer,
    TeamReroll,
    TeamSpecialRule,
} from '../../models/team.model';

export type CustomiseTeamList = {
    excludedIds?: string[];
    additionalTeams?: CustomTeam[];
};

export type CustomTeam = {
    name: string;
    id: string;
    players: Array<TeamPlayer>;
    reroll: TeamReroll;
    allowedApothecary: boolean;
    tier: number;
    specialRules: TeamSpecialRule[];
    maxBigGuys?: number;
    retired?: boolean;
    pickSpecialRule?: TeamSpecialRule[];
};
