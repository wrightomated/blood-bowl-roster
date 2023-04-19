export const characteristics: CharacteristicType[] = [
    'MA',
    'ST',
    'AG',
    'PA',
    'AV',
];
export const characteristicMaxValue = [9, 8, 1, 1, 11];
export const characteristicMinValue = [1, 1, 6, 6, 3];
export const characteristicCostIncrease = [20, 80, 40, 20, 10];
export const characteristicIndex = (c: CharacteristicType) => {
    return characteristics.indexOf(c);
};

export type CharacteristicType = 'MA' | 'ST' | 'AG' | 'PA' | 'AV';
