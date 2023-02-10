import type {
    GameEvent,
    MatchHistoryRecord,
} from '../models/matchHistory.model';
import type { RosterPlayerRecord } from '../models/roster.model';

/**
 * Original player events didn't have player names and numbers. Only ids
 */
export function updateMatchHistoryPlayerEvents(
    match: MatchHistoryRecord,
    players: RosterPlayerRecord[]
): MatchHistoryRecord {
    if (match.playingCoach?.gameEventRecording === 'total') return match;
    return {
        ...match,
        playingCoach: {
            ...match.playingCoach,
            gameEvents: updateGameEvents(
                match.playingCoach?.gameEvents,
                players
            ),
        },
    };
}

function updateGameEvents(
    gameEvents: GameEvent[],
    players: RosterPlayerRecord[]
): GameEvent[] {
    let unknownPlayerNumber = 0;
    const pMap = {};
    return gameEvents.map((event) => {
        if (event.player) return event;
        const rosterPlayer = players.find((x) => x.playerId === event.playerId);
        if (rosterPlayer) {
            return {
                ...event,
                player: {
                    name:
                        rosterPlayer.playerName || rosterPlayer.player.position,
                    number: rosterPlayer.alterations.playerNumber,
                    id: event.playerId,
                },
            };
        } else {
            let pNumber = pMap[event.playerId];
            if (!pNumber) {
                pNumber = ++unknownPlayerNumber;
                pMap[event.playerId] = pNumber;
            }
            return {
                ...event,
                player: {
                    name: `Unknown Player ${pNumber}`,
                    id: event.playerId,
                    number: 404,
                },
            };
        }
    });
}
