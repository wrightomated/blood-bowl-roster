import type { D3Result, D6Result } from './dice.model';
import type { CollegeName } from './dungeonBowl.model';
import type { StadiumCategory } from './stadium.model';
import type { TeamName } from './team.model';
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
    concession?: 'player' | 'opponent' | 'none';
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
    concession?: 'player' | 'opponent' | 'none';
};

export type MatchHistoryCoach = {
    fairWeatherFans?: D3Result;
    dedicatedFans?: number;
    fanFactor?: number;
    fanChange?: number;
    inducementsHired?: MatchHistoryInducements;
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
    mvp?: HistoricPlayer;
    teamType?: TeamName | CollegeName;
};

export type HistoricPlayer = { name: string; number: number; id: string };

export type GameEventTally = Record<GameEventType | 'opponentScore', number>;

export type GameEvent = {
    eventType: GameEventType;
    player?: HistoricPlayer;
    // Deprecated, use id inside player object
    playerId?: string;
    time?: Date;
    turn?: number;
};

export type GameEventType =
    | 'casualty'
    | 'completion'
    | 'kill'
    | 'touchdown'
    | 'deflection'
    | 'interception';

/**
 * Inducements hired by a coach
 * id can be either an inducement id or a star player id
 */
export type MatchHistoryInducements = { id: string; amount?: number }[];

export type SaveMatchOptions = Record<SaveMatchOption, boolean>;

export type SaveMatchOption =
    | 'updateSpp'
    | 'updateTreasury'
    | 'removeInducements'
    | 'removeStarPlayers'
    | 'updateDedicatedFans'
    | 'updateConcededGoals';
