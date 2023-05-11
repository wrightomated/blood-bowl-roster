import type {
    Team,
    TeamPlayer,
    TeamReroll,
    TeamSpecialRule,
} from '../../models/team.model';

export type CustomiseTeamList = {
    // Excluded team ids
    excludedIds?: number[];
    additionalTeams?: CustomTeam[];
};

export type CustomTeam = {
    name: string;
    players: Array<TeamPlayer>;
    reroll: TeamReroll;
    allowedApothecary: boolean;
    tier: number;
    specialRules: (TeamSpecialRule | string)[];
    maxBigGuys?: number;
    retired?: boolean;
    pickSpecialRule?: (TeamSpecialRule | string)[];
};
