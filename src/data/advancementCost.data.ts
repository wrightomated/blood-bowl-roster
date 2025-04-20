export type AdvancementType = 'primary' | 'secondary' | 'characteristic';
export type SelectionType = 'random' | 'select';
export type SkillType = Exclude<AdvancementType, 'characteristic'>;

export const advancementCostsMap: Partial<
    Record<AdvancementCombination, number[]>
> = {
    primaryrandom: [3, 4, 6, 8, 10, 15],
    primaryselect: [6, 8, 12, 16, 20, 30],
    secondaryrandom: [6, 8, 12, 16, 20, 30],
    secondaryselect: [12, 14, 18, 22, 26, 40],
    characteristic: [18, 20, 24, 28, 32, 50],
};

export const skillIncreaseCost: Record<`${SkillType}${SelectionType}`, number> =
    {
        primaryrandom: 10,
        primaryselect: 20,
        secondaryrandom: 20,
        secondaryselect: 40,
    };

/**
 * There is an extra cost for each skill after the first in blood bowl sevens
 */
export const sevensExtraSkillTax = 10;

export const advancementTitle = {
    1: 'Experienced',
    2: 'Veteran',
    3: 'Emerging Star',
    4: 'Star',
    5: 'Super Star',
    6: 'Legend',
};

export type AdvancementCombination =
    | `${SkillType}${SelectionType}`
    | 'characteristic';
