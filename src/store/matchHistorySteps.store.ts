import { writable, Writable } from 'svelte/store';
import { newMatchRecordSteps } from '../data/matchHistorySteps.data';
import type { MatchHistoryStep } from '../models/matchHistory.model';
import type { TeamFormat } from '../types/teamFormat';
import type { RosterMode } from './rosterMode.store';

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
        goToStep: (stepIndex: number) => {
            update((store) => {
                return store.map((step, i) => {
                    const status =
                        stepIndex === i
                            ? 'current'
                            : i < stepIndex
                            ? 'complete'
                            : 'future';
                    return { ...step, status };
                });
            });
        },
        reset: (mode: RosterMode, format: TeamFormat) => {
            const filteredSet = newMatchRecordSteps.filter((step) => {
                if (step.title !== 'Pre-game Calculations') return true;
                if (mode === 'league') return true;
                return format === 'elevens';
            });
            set(filteredSet);
        },
    };
};
export const matchHistorySteps = createMatchHistorySteps();
