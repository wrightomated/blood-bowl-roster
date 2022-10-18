import type { D3Result, D6Result } from './dice.model';
import type { StadiumCategory } from './stadium.model';
import type { WeatherType } from './weather.model';

export type MatchStatus = 'pre' | 'playing' | 'post';

export type MatchHistorySummary = {
    id: string;
    opponent: {
        name: string;
        score: number;
    };
    playerScores: Partial<GameEventTally>;
    isLeagueMatch?: boolean;
    /** yyyy-MM-dd */
    matchDate?: string;
    leaguePoints?: number;
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
    time?: {
        /** yyyy-MM-dd */
        date?: string;
    };
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
    gameEventRecording?: 'total' | 'individual';
    mvp?: { name: string; number: number; id: string };
};

export type GameEventTally = {
    casualties: number;
    touchdowns: number;
    completions: number;
    kills: number;
    deflections: number;
    interceptions: number;
    opponentScore: number;
};

export type GameEvent = {
    eventType: GameEventType;
    playerId?: string;
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

export type MatchHistoryStep = {
    title: string;
    component: any;
    status: StepStatus;
};

export type StepStatus = 'complete' | 'current' | 'future';
