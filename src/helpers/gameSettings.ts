import {
    dungeonBowlGame,
    elevensGame,
    sevensGame,
} from '../data/gameType.data';
import type { TeamFormat } from '../types/teamFormat';

export const getGameTypeSettings = (teamFormat: TeamFormat) => {
    return (
        {
            sevens: sevensGame,
            elevens: elevensGame,
            'dungeon bowl': dungeonBowlGame,
        }[teamFormat] || elevensGame
    );
};
