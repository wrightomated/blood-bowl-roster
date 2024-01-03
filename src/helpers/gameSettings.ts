import type { TournamentCustomisation } from '../customisation/types/TournmentCustomisation.type';
import {
    dungeonBowlGame,
    elevensGame,
    gutterBowlGame,
    sevensGame,
} from '../data/gameType.data';
import type { GameType } from '../models/gameType.model';
import type { TeamFormat } from '../types/teamFormat';

/**
 * TODO: add customisation for game type
 * @param teamFormat
 * @returns
 */
export const getGameTypeSettings: (
    teamFormat: TeamFormat,
    customisation?: TournamentCustomisation
) => GameType = (teamFormat, customisation) => {
    if (customisation?.gameTypeSettings) {
        return customisation.gameTypeSettings;
    }
    return (
        {
            sevens: sevensGame,
            elevens: elevensGame,
            'dungeon bowl': dungeonBowlGame,
            'gutter bowl': gutterBowlGame,
        }[teamFormat] || elevensGame
    );
};
