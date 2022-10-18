import { nanoid } from 'nanoid';
import type {
    GameEvent,
    GameEventTally,
    MatchHistoryRecord,
    MatchHistorySummary,
} from '../models/matchHistory.model';

export function newMatchRecord(coachName?: string): MatchHistoryRecord {
    return {
        id: nanoid(),
        playingCoach: {
            name: coachName,
            pettyCash: 0,
            leaguePoints: 0,
            winnings: 0,
            fanFactor: 0,
        },
        opponentCoach: { name: '' },
        weather: { table: 'default', result: '4 - 10' },
        isLeagueMatch: true,
        time: { date: new Date().toISOString().slice(0, 10) },
        stadium: { category: 'Nothing out of the Ordinary', attribute: 1 },
        gameEventTally: {
            touchdowns: 0,
            completions: 0,
            casualties: 0,
            kills: 0,
            interceptions: 0,
            deflections: 0,
            opponentScore: 0,
        },
    };
}

export function matchSummary(record: MatchHistoryRecord): MatchHistorySummary {
    const { opponentScore, ...playerScores } = record.gameEventTally;
    const newSummary: MatchHistorySummary = {
        id: record.id,
        opponent: {
            name: record.opponentCoach.name,
            score: opponentScore,
        },
        playerScores,
        isLeagueMatch: record.isLeagueMatch,
        matchDate: record.time.date,
        leaguePoints: record.playingCoach.leaguePoints,
    };
    return newSummary;
}

export function updateMatchDraftTotals(
    record: MatchHistoryRecord
): MatchHistoryRecord {
    if (record.playingCoach.gameEventRecording === 'individual') {
        const newTally: GameEventTally = {
            opponentScore: record.gameEventTally.opponentScore,
            ...mapGameEventsToTally(record.playingCoach.gameEvents),
        };
        return {
            ...record,
            gameEventTally: newTally,
        };
    }
    return record;
}

function mapGameEventsToTally(
    events: GameEvent[]
): Omit<GameEventTally, 'opponentScore'> {
    let newTally: Omit<GameEventTally, 'opponentScore'> = {
        casualties: 0,
        touchdowns: 0,
        completions: 0,
        kills: 0,
        deflections: 0,
        interceptions: 0,
    };
    events.forEach((e) => newTally[e.eventType]++);
    return newTally;
}
