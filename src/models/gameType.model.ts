export interface GameType {
    teamFormat: TeamFormat;
    maxPlayers: number;
    minPlayers: number;
    startingTreasury: number;
    inducements: any;
}

export type TeamFormat = 'sevens' | 'elevens';
