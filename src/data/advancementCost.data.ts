export type AdvancementType = 'primary' | 'secondary' | 'characteristic';
export type SelectionType = 'random' | 'select';

export const advancementCosts = {
    ranPri: [3, 4, 6, 8, 10, 15],
    priOrRanSec: [6, 8, 12, 16, 20, 30],
    sec: [12, 14, 18, 22, 26, 40],
    char: [18, 20, 24, 28, 32, 50],
};

export const advancementCostsMap: Partial<
    Record<`${AdvancementType}${SelectionType | ''}`, number[]>
> = {
    primaryrandom: [3, 4, 6, 8, 10, 15],
    primaryselect: [6, 8, 12, 16, 20, 30],
    secondaryrandom: [6, 8, 12, 16, 20, 30],
    secondaryselect: [12, 14, 18, 22, 26, 40],
    characteristic: [18, 20, 24, 28, 32, 50],
};

export const advancementTitle = {
    1: 'Experienced',
    2: 'Veteran',
    3: 'Emerging Star',
    4: 'Star',
    5: 'Super Star',
    6: 'Legend',
};
