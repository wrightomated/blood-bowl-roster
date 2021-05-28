export interface GameType {
    gameTypeName: GameTypeName;
    maxPlayers: number;
    minPlayers: number;
    startingTreasury: number;
    inducements: any;
}

type GameTypeName = 'sevens' | 'elevens';
