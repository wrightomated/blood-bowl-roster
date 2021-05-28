import type { GameType } from '../models/gameType.model';

export const sevensGame: GameType = {
    gameTypeName: 'sevens',
    maxPlayers: 11,
    minPlayers: 7,
    startingTreasury: 600,
    inducements: [],
};

export const elevensGame: GameType = {
    gameTypeName: 'elevens',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    inducements: [],
};
