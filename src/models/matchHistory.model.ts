import type { WeatherType } from '../models/weather.model';
import type { D3Result, D6Result, TwoD6Result } from './dice.model';

// export type MatchHistoryKey =
//     | 'opponent'
//     | 'leagueOrFriendly'
//     | 'fan factor'
//     | 'petty cash'
//     | 'inducements hired'
//     | 'new current team value'
//     | 'w/l/d'
//     | 'score'
//     | 'winnings'
//     | 'league points'
//     | 'notes';

// export type MatchHistory = MatchHistoryEntry[];

// export type MatchHistoryEntry = Record<'id' | MatchHistoryKey, any>;

export type MatchStatus = 'pre' | 'playing' | 'finished';

export type MatchHistory = {
    opponent: string;
    isLeagueMatch: boolean;
    // Player, opponent
    fairWeatherFans: [D3Result, D3Result];
    pettyCash: number;
    inducementsHired: string;
    newCTV: number;
    playerScore: number;
    /** Player team code at time of match */
    playerTeamCode?: string;
    opponentScore: number;
    /** Opponent team code at time of match */
    opponentTeamCode?: string;
    winnings: number;
    leaguePoints: number;
    casualties: number;
    touchdowns: number;
    passes: number;
    kills: number;
    weather?: { table: WeatherType; result: TwoD6Result };
    /** id of the ball used */
    ball?: number;
    /** Two rolls for the table */
    stadium?: [TwoD6Result, D6Result];
    notes?: string;
};
