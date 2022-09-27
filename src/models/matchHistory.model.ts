import type { WeatherType } from '../models/weather.model';
import type { D3Result, D6Result, TwoD6Result } from './dice.model';

export type MatchStatus = 'pre' | 'playing' | 'post';

export type MatchHistoryRecord = {
    id?: string;
    status?: MatchStatus;
    playingCoach?: MatchHistoryCoach;
    opponentCoach?: MatchHistoryCoach;
    isLeagueMatch?: boolean;
    gameEventTally?: GameEventTally;
    weather?: {
        table: WeatherType;
        result: '2' | '3' | '4 - 10' | '11' | '12';
    };
    /** id of the ball used */
    ball?: number;
    /** Two rolls for the table */
    stadium?: [TwoD6Result, D6Result];
    time?: { date?: Date };
    notes?: string;
};

export type MatchHistoryCoach = {
    fairWeatherFans?: D3Result;
    fanFactor?: number;
    inducementsHired?: { id: string; amount?: number }[];
    leaguePoints?: number;
    name?: string;
    newCTV?: number;
    pettyCash?: number;
    score?: number;
    /** Coach's team code at time of match */
    teamCode?: string;
    winnings?: number;
    gameEvents?: GameEvent[];
};

export type GameEventTally = {
    casualties: number;
    touchdowns: number;
    passes: number;
    kills: number;
};

export type GameEvent = {
    eventType: GameEventType;
    playerId?: number;
    time?: Date;
    turn: number;
};

export type GameEventType = 'casualty' | 'pass' | 'kill' | 'touchdown';
