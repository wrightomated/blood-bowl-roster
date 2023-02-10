import type { GameEventType } from '../models/matchHistory.model';

export const gameEventTypeToTitle: Record<GameEventType, string> = {
    touchdown: 'Touchdown',
    completion: 'Completion',
    casualty: 'Casualty',
    kill: 'Kill',
    interception: 'Interception',
    deflection: 'Deflection',
};
