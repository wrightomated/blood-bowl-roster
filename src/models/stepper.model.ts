import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';

export type StepperStep = {
    title: string;
    component: any;
    status: StepStatus;
    format?: TeamFormat;
    mode?: RosterMode;
};

export type StepStatus = 'complete' | 'current' | 'future';
