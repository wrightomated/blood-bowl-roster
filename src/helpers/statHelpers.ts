import {
    characteristicMaxValue,
    characteristicMinValue,
} from '../data/statOrder.data';
import type { RosterPlayerRecord } from '../models/roster.model';

export const getStat = (
    stat: number,
    i: number,
    player?: RosterPlayerRecord
) => {
    const alteredStat =
        stat +
        (player?.alterations?.statChange?.[i] || 0) *
            (i === 2 || i === 3 ? -1 : 1) -
        (player?.alterations?.injuries?.[i] || 0) *
            (i === 2 || i === 3 ? -1 : 1);
    const boundedStat = stat === 0 ? 0 : getBoundedStat(alteredStat, i);
    return `${
        boundedStat === 0 ? '-' : i > 1 ? `${boundedStat}+` : boundedStat
    }`;
};

export const getBoundedStat = (alt: number, i: number) => {
    switch (i) {
        case 2:
        case 3:
            return alt > characteristicMinValue[i]
                ? characteristicMinValue[i]
                : alt < characteristicMaxValue[i]
                ? characteristicMaxValue[i]
                : alt;
        default:
            return alt < characteristicMinValue[i]
                ? characteristicMinValue[i]
                : alt > characteristicMaxValue[i]
                ? characteristicMaxValue[i]
                : alt;
    }
};
