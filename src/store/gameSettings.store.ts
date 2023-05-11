import { derived, writable } from 'svelte/store';
import { roster } from './teamRoster.store';
import type { TeamFormat } from '../types/teamFormat';
import {
    dungeonBowlGame,
    elevensGame,
    sevensGame,
} from '../data/gameType.data';

export const gameSettings = derived(roster, ($roster) => {
    return getGameTypeSettings($roster.format);
});

export const getGameTypeSettings = (teamFormat: TeamFormat) => {
    return (
        {
            sevens: sevensGame,
            elevens: elevensGame,
            'dungeon bowl': dungeonBowlGame,
        }[teamFormat] || elevensGame
    );
};
