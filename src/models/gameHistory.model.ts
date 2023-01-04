import type { WeatherType } from '../models/weather.model';

export type HistoryColumn =
    | 'opponent'
    | 'leagueOrFriendly'
    | 'fan factor'
    | 'petty cash'
    | 'inducements hired'
    | 'new current team value'
    | 'w/l/d'
    | 'score'
    | 'winnings'
    | 'league points'
    | 'notes';

export type GameHistory = GameHistoryEntry[];

export type GameHistoryEntry = Record<'id' | HistoryColumn, any>;

type GameHistoryModel = {
    opponent: string;
    isLeagueMatch: boolean;
    fanFactor: number;
    pettyCash: number;
    inducementsHired: string;
    newCTV: number;
    playerScore: number;
    opponentScore: number;
    winnings: number;
    casualties: number;
    touchdowns: number;
    passes: number;
    kills: number;
    weather?: { table: WeatherType; result: string };
    ball?: string;
    stadium: string;
    notes: string;
};
