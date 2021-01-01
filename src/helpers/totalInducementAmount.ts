import { inducementData } from '../data/inducements.data';
import type { ExtraRosterInfo } from '../models/roster.model';

export const calculateInducementTotal = (inducements: ExtraRosterInfo) => {
    return Object.keys(inducements)
        .map(
            (key) =>
                inducementData.inducements.find((x) => x.id === key).cost *
                inducements[key],
        )
        .reduce((a, b) => a + b, 0);
};
