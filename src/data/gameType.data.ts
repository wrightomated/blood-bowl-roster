import type { GameType as GameTypeSettings } from '../models/gameType.model';
import type { TeamFormat } from '../store/teamFormat.store';

const sevensGame: GameTypeSettings = {
    teamFormat: 'sevens',
    maxPlayers: 11,
    minPlayers: 7,
    startingTreasury: 600,
    rerollDetails: { costMultiplier: 2, max: 6 },
    assistantCoaches: { cost: 20, max: 3 },
    cheerleaders: { cost: 20, max: 6 },
    apothecary: { cost: 80, max: 1 },
    dedicatedFans: { cost: 20, max: 6 },
};

const elevensGame: GameTypeSettings = {
    teamFormat: 'elevens',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    rerollDetails: { costMultiplier: 1, max: 8 },
    assistantCoaches: { cost: 10, max: 6 },
    cheerleaders: { cost: 10, max: 12 },
    apothecary: { cost: 50, max: 1 },
    dedicatedFans: { cost: 10, max: 6 },
};

const dungeonBowlGame: GameTypeSettings = {
    teamFormat: 'dungeon bowl',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    rerollDetails: { costMultiplier: 1, max: 8 },
    assistantCoaches: { cost: 10, max: 0 },
    cheerleaders: { cost: 10, max: 0 },
    apothecary: { cost: 50, max: 0 },
    dedicatedFans: { cost: 10, max: 0 },
};

export const getGameTypeSettings = (teamFormat: TeamFormat) => {
    return (
        {
            sevens: sevensGame,
            elevens: elevensGame,
            'dungeon bowl': dungeonBowlGame,
        }[teamFormat] || elevensGame
    );
};

export const getMaxPlayers = (teamFormat: TeamFormat) =>
    getGameTypeSettings(teamFormat).maxPlayers;
