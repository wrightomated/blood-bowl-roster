import type { GameType as GameTypeSettings } from '../models/gameType.model';
import type { TeamFormat } from '../store/teamFormat.store';

const sevensGame: GameTypeSettings = {
    teamFormat: 'sevens',
    maxPlayers: 11,
    minPlayers: 7,
    startingTreasury: 600,
    inducements: [],
};

const elevensGame: GameTypeSettings = {
    teamFormat: 'elevens',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    inducements: [],
};

export const getGameTypeSettings = (teamFormat: TeamFormat) => {
    if (teamFormat === 'elevens') {
        return elevensGame;
    }
    if (teamFormat === 'sevens') {
        return sevensGame;
    }
};
