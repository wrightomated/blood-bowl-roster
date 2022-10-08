import { writable, Writable } from 'svelte/store';
import { newMatchRecordSteps } from '../data/matchHistorySteps.data';
import type {
    MatchHistoryRecord,
    MatchHistoryStep,
} from '../models/matchHistory.model';

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

const createMatchHistorySteps = () => {
    const { subscribe, update, set }: Writable<MatchHistoryStep[]> =
        writable<MatchHistoryStep[]>(newMatchRecordSteps);
    return {
        subscribe,
        set,
        update,
        nextStep: () =>
            update((store) => {
                const currentStepIndex = store.findIndex(
                    (s) => s.status === 'current'
                );
                const updatedSteps = store;
                if (currentStepIndex >= 0) {
                    updatedSteps[currentStepIndex].status = 'complete';
                    if (updatedSteps.length > currentStepIndex + 1) {
                        updatedSteps[currentStepIndex + 1].status = 'current';
                    }
                }
                return updatedSteps;
            }),
        previousStep: () =>
            update((store) => {
                const currentStepIndex = store.findIndex(
                    (s) => s.status === 'current'
                );
                const updatedSteps = store;
                if (currentStepIndex > 0) {
                    updatedSteps[currentStepIndex].status = 'future';
                    updatedSteps[currentStepIndex - 1].status = 'current';
                } else if (currentStepIndex === -1) {
                    updatedSteps[updatedSteps.length - 1].status = 'current';
                }

                return updatedSteps;
            }),
    };
};

export const matchHistoryRecordDraft = createMatchHistoryRecordDraft();

export const matchHistorySteps = createMatchHistorySteps();
