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

export type GameHistory = string[];

export type GameHistoryEntry = {
    id: number;
    key: string;
    value: string;
};
