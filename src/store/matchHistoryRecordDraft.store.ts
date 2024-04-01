import { writable, type Writable } from 'svelte/store';
import type { MatchHistoryRecord } from '../models/matchHistory.model';

const createMatchHistoryRecordDraft = () => {
    const { subscribe, update, set }: Writable<MatchHistoryRecord> =
        writable<MatchHistoryRecord>(newRecord());
    return {
        subscribe,
        set,
        update,
        newDraft: (coachName?: string) => set(newRecord(coachName)),
    };
};

function newRecord(coachName?: string): MatchHistoryRecord {
    return {
        playingCoach: { name: coachName },
        opponentCoach: {},
        weather: { table: 'default', result: '4 - 10' },
        time: {},
        stadium: { category: 'Nothing out of the Ordinary' },
    };
}

export const matchHistoryRecordDraft = createMatchHistoryRecordDraft();
