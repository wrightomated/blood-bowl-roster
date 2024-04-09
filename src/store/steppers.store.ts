import { writable, type Writable } from 'svelte/store';
import { newMatchRecordSteps } from '../data/matchHistorySteps.data';
import type { StepperStep } from '../models/stepper.model';

const createMatchHistorySteps = (stepData: StepperStep[]) => {
    const { subscribe, update, set }: Writable<StepperStep[]> =
        writable<StepperStep[]>(stepData);
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
        reset: () => set(stepData),
    };
};
export const matchHistorySteps: Writable<StepperStep[]> & {
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (index: number) => void;
    reset: () => void;
} = createMatchHistorySteps(newMatchRecordSteps);
