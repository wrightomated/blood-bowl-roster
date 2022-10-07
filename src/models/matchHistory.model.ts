import type { WeatherType } from '../models/weather.model';
import type { D3Result, D6Result } from './dice.model';
import type { StadiumCategory } from './stadium.model';

export type MatchStatus = 'pre' | 'playing' | 'post';

export type MatchHistorySummary = {
    id: string;
    opponent: {
        name: string;
        score: number;
    };
    playerScores: Partial<GameEventTally>;
    isLeagueMatch?: boolean;
    matchDate?: Date;
};

export type MatchHistoryRecord = {
    id?: string;
    status?: MatchStatus;
    playingCoach?: MatchHistoryCoach;
    opponentCoach?: MatchHistoryCoach;
    isLeagueMatch?: boolean;
    gameEventTally?: GameEventTally;
    weather?: {
        table: WeatherType;
        result?: '2' | '3' | '4 - 10' | '11' | '12';
    };
    stadium?: {
        category: StadiumCategory;
        attribute?: D6Result;
    };
    time?: { date?: Date };
    notes?: string;
};

export type MatchHistoryCoach = {
    fairWeatherFans?: D3Result;
    dedicatedFans?: number;
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
    deflections: number;
    interceptions: number;
};

export type GameEvent = {
    eventType: GameEventType;
    playerId?: number;
    time?: Date;
    turn?: number;
};

export type GameEventType =
    | 'casualty'
    | 'pass'
    | 'kill'
    | 'touchdown'
    | 'deflection'
    | 'interception';
