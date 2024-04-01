import {
    dungeonBowlGame,
    elevensGame,
    gutterBowlGame,
    sevensGame,
} from '../data/gameType.data';
import type { GameType } from '../models/gameType.model';
import type { TeamFormat } from '../types/teamFormat';

export const getGameTypeSettings: (teamFormat: TeamFormat) => GameType = (
    teamFormat: TeamFormat
) => {
    return (
        {
            sevens: sevensGame,
            elevens: elevensGame,
            'dungeon bowl': dungeonBowlGame,
            'gutter bowl': gutterBowlGame,
        }[teamFormat] || elevensGame
    );
};
