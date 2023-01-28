import { nanoid } from 'nanoid';
import { inducementData } from '../data/inducements.data';
import { starPlayers } from '../data/starPlayer.data';
import type {
    GameEvent,
    GameEventTally,
    GameEventType,
    MatchHistoryInducements,
    MatchHistoryRecord,
    MatchHistorySummary,
    SaveMatchOptions,
} from '../models/matchHistory.model';
import type { Roster, RosterPlayerRecord } from '../models/roster.model';

export function newMatchRecord(coachName?: string): MatchHistoryRecord {
    return {
        id: nanoid(),
        playingCoach: {
            name: coachName,
            pettyCash: 0,
            leaguePoints: 0,
            winnings: 0,
            fanFactor: 0,
            gameEventRecording: 'total',
        },
        opponentCoach: { name: '' },
        weather: { table: 'default', result: '4 - 10' },
        isLeagueMatch: true,
        time: { date: new Date().toISOString().slice(0, 10) },
        stadium: { category: 'Nothing out of the Ordinary', attribute: 1 },
        gameEventTally: {
            touchdown: 0,
            completion: 0,
            casualty: 0,
            kill: 0,
            interception: 0,
            deflection: 0,
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
    if (record.playingCoach.gameEventRecording === 'total') {
        return record;
    }
    const newTally: GameEventTally = {
        opponentScore: record.gameEventTally.opponentScore,
        ...mapGameEventsToTally(record.playingCoach.gameEvents),
    };
    return {
        ...record,
        gameEventTally: newTally,
    };
}

export function updateRosterWithDraft(
    roster: Roster,
    options: SaveMatchOptions
): Roster {
    if (!roster.matchDraft) return roster;
    const { pettyCash, ...r } = roster;

    if (roster.matchDraft?.playingCoach?.gameEventRecording === 'individual') {
        r.players = addEventsToPlayers(
            roster.matchDraft.playingCoach.gameEvents,
            [...roster.players],
            !!options.updateSpp
        );
        r.matchDraft = updateMatchDraftTotals(roster.matchDraft);
    }

    r.players = addMvpToPlayers(
        roster.matchDraft?.playingCoach?.mvp?.id,
        r.players,
        !!options.updateSpp
    );

    if (options?.updateTreasury && roster.matchDraft?.playingCoach?.winnings) {
        r.treasury += roster.matchDraft.playingCoach.winnings / 1000;
    }

    r.matchDraft.playingCoach.inducementsHired = getInducementsFromRoster(r);

    if (options.removeInducements) {
        r.inducements = {};
    }
    if (options.removeStarPlayers) {
        r.players = r.players.filter((p) => !p.starPlayer);
    }
    if (
        options.updateDedicatedFans &&
        roster.matchDraft?.playingCoach?.fanChange
    ) {
        r.extra.dedicated_fans += roster.matchDraft.playingCoach.fanChange;
    }

    return r;
}

export function mapHistoryInducementsForDisplay(
    inducements: MatchHistoryInducements
): (string | number)[][] {
    return inducements
        .map((i) => {
            const inducementName: string = getInducementName(i.id);
            if (!inducementName || !i.amount) return null;

            return [inducementName, i.amount];
        })
        .filter((x) => x);
}

function getInducementName(id: string) {
    if (id[0] === 'i') {
        return inducementData.inducements.find((i) => i.id === id).displayName;
    } else if (id[0] === 'p') {
        return starPlayers.starPlayers.find((p) => p.id === +id.substring(1))
            .position;
    }
    return null;
}

function getInducementsFromRoster(r: Roster): MatchHistoryInducements {
    const starPlayers = r.players
        .filter((p) => p.starPlayer && !p.deleted)
        .map((p) => ({
            id: 'p' + p.player.id,
            amount: 1,
        }));

    const inducements = Object.entries(r.inducements).map((i) => ({
        id: i[0],
        amount: i[1],
    }));

    return starPlayers.concat(inducements);
}

function addEventsToPlayers(
    events: GameEvent[],
    players: RosterPlayerRecord[],
    addSpp: boolean
) {
    return players.map((p) => {
        const player = { ...p };

        if (events?.length > 0) {
            const playerEvents = events.filter(
                (e) => e.playerId === p.playerId
            );
            playerEvents.forEach((e) => {
                if (!player.alterations.gameRecords) {
                    player.alterations.gameRecords = {};
                }
                player.alterations.gameRecords[e.eventType] = player.alterations
                    .gameRecords[e.eventType]
                    ? player.alterations.gameRecords[e.eventType] + 1
                    : 1;
                if (addSpp) {
                    player.alterations.spp += eventToSpp[e.eventType];
                }
            });
        }

        return player;
    });
}

function addMvpToPlayers(
    mvp: string,
    players: RosterPlayerRecord[],
    addSpp: boolean
) {
    return players.map((p) => {
        const player = { ...p };
        if (p.playerId === mvp) {
            player.alterations?.gameRecords?.['mvp']
                ? player.alterations.gameRecords['mvp']++
                : 1;

            if (addSpp) {
                player.alterations.spp += 4;
            }
        }
        return player;
    });
}

const eventToSpp: Record<GameEventType, number> = {
    casualty: 2,
    completion: 1,
    kill: 0,
    touchdown: 3,
    deflection: 1,
    interception: 2,
};

export const gameEventPluralMap: Record<GameEventType, string> = {
    touchdown: 'Touchdowns',
    completion: 'Completions',
    casualty: 'Casualties',
    kill: 'Kills',
    interception: 'Interceptions',
    deflection: 'Deflections',
};

function mapGameEventsToTally(
    events: GameEvent[]
): Omit<GameEventTally, 'opponentScore'> {
    let newTally: Omit<GameEventTally, 'opponentScore'> = {
        casualty: 0,
        touchdown: 0,
        completion: 0,
        kill: 0,
        deflection: 0,
        interception: 0,
    };
    if (events?.length > 0) {
        events.forEach((e) => newTally[e.eventType]++);
    }
    return newTally;
}
