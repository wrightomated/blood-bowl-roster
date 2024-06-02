import type { Inducement } from '../models/inducement.model';
import { chaosSpecialRules } from './teams.data';

export const inducementData: { inducements: Inducement[] } = {
    inducements: [
        {
            id: 'i1',

            cost: 20,
            max: 4,
            sevensMax: 2,
            sevensCost: 30,
        },
        {
            id: 'i2',

            cost: 20,
            max: 3,
            sevensMax: 1,
            sevensCost: 30,
        },
        {
            id: 'i3',

            cost: 30,
            max: 1,
        },
        { id: 'i4', cost: 50, max: 2, sevensMax: 2 },
        { id: 'i5', cost: 100, max: 5, sevensMax: 5 },
        {
            id: 'i6',

            cost: 100,
            max: 8,
            sevensCost: 150,
            dungeonBowlMax: 8,
            sevensMax: 8,
        },
        {
            id: 'i7',

            cost: 100,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 50 },
            max: 3,
            dungeonBowlMax: 3,
            sevensMax: 3,
        },
        {
            id: 'i8',

            cost: 100,
            max: 2,
            sevensMax: 2,
            requiresApothecary: true,
        },
        {
            id: 'i9',

            cost: 100,
            max: 1,
            sevensMax: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i10',

            cost: 100,
            max: 1,
            sevensMax: 1,
            requiresSpecialRule: 'Favoured of Nurgle',
        },
        {
            id: 'i11',

            cost: 100,
            max: 1,
            requiresSpecialRule: 'Low Cost Linemen',
        },
        {
            id: 'i12',

            cost: 300,
            reducedCost: { teamName: 'Halfling', cost: 100 },
            max: 1,
            sevensMax: 1,
        },
        {
            id: 'i13',

            cost: 30,
            max: 16,
            sevensMax: 16,
        },
        {
            id: 'i15',

            cost: 100,
            max: 1,
        },
        {
            id: 'i18',

            cost: 50,
            max: 1,
            requiresSpecialRule: [
                'Elven Kingdoms League',
                'Lustrian Superleague',
                'Old World Classic',
                'Worlds Edge Superleague',
            ],
        },
        {
            id: 'i19',

            cost: 80,
            max: 1,
            requiresSpecialRule: [
                'Favoured of...',
                'Underworld Challenge',
                ...chaosSpecialRules,
            ],
        },
        {
            id: 'i20',

            cost: 40,
            max: 1,
            requiresSpecialRule: 'Elven Kingdoms League',
        },
        {
            id: 'i21',

            cost: 70,
            max: 1,
            requiresSpecialRule: 'Underworld Challenge',
        },
        {
            id: 'i22',

            cost: 100,
            max: 1,
        },
        {
            id: 'i23',

            cost: 130,
            max: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i24',

            cost: 80,
            max: 1,
            requiresSpecialRule: [
                'Badlands Brawl',
                'Old World Classic',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i25',

            cost: 90,
            max: 1,
            requiresSpecialRule: ['Badlands Brawl', 'Underworld Challenge'],
        },
        {
            id: 'i26',

            cost: 90,
            max: 1,
        },
        {
            id: 'i16',

            cost: 150,
            max: 1,
        },
        {
            id: 'i27',

            cost: 150,
            max: 1,
            requiresSpecialRule: [
                'Favoured of...',
                'Underworld Challenge',
                ...chaosSpecialRules,
            ],
        },
        {
            id: 'i28',

            cost: 150,
            max: 1,
            requiresSpecialRule: [
                'Elven Kingdoms League',
                'Favoured of...',
                ...chaosSpecialRules,
            ],
        },
        {
            id: 'i29',

            cost: 150,
            max: 1,
            requiresSpecialRule: 'Elven Kingdoms League',
        },
        {
            id: 'i30',

            cost: 200,
            max: 1,
            requiresSpecialRule: 'Lustrian Superleague',
        },
        {
            id: 'i31',

            cost: 150,
            max: 1,
            requiresSpecialRule: ['Favoured of Nurgle', 'Underworld Challenge'],
        },
        {
            id: 'i32',

            cost: 150,
            max: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
        },
        {
            id: 'i33',

            cost: 150,
            max: 1,
            requiresSpecialRule: [
                'Old World Classic',
                'Sylvanian Spotlight',
                'Underworld Challenge',
            ],
        },
        {
            id: 'i34',

            cost: 150,
            max: 1,
            requiresSpecialRule: 'Underworld Challenge',
        },
        {
            id: 'i35',

            cost: 150,
            max: 1,
            requiresSpecialRule: 'Badlands Brawl',
        },
        {
            id: 'i36',

            cost: 150,
            max: 1,
            requiresSpecialRule: ['Badlands Brawl', 'Underworld Challenge'],
        },
        {
            id: 'i37',

            cost: 80,
            max: 1,
        },
        {
            id: 'i17',

            cost: 120,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
            max: 1,
        },
        {
            id: 'i38',
            displayName: "Biased Referee: Ranulf 'Red' Hokuli",
            cost: 130,
            max: 1,
            requiresSpecialRule: ['Lustrian Superleague', 'Old World Classic'],
        },
        {
            id: 'i39',

            cost: 120,
            max: 1,
            requiresSpecialRule: 'Worlds Edge Superleague',
        },
        {
            id: 'i40',

            cost: 120,
            max: 1,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
        },
        {
            id: 'i41',

            cost: 80,
            max: 1,
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 40 },
        },
        {
            id: 'i42',

            cost: 50,
            max: 1,
            requiresSpecialRule: 'Badlands Brawl',
        },
        {
            id: 'i43',

            cost: 30,
            max: 3,
            requiresSpecialRule: 'Favoured of Nurgle',
        },
        {
            id: 'i44',

            cost: 50,
            max: 1,
            requiresSpecialRule: [
                'Old World Classic',
                'Worlds Edge Superleague',
            ],
        },
        {
            id: 'i45',

            cost: 80,
            max: 1,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 60 },
        },
        {
            id: 'i46',

            cost: 40,
            max: 1,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 30 },
        },
        {
            id: 'i47',

            cost: 40,
            max: 3,
            requiresTier: 3,
        },
        {
            id: 'i48',

            cost: 30,
            max: 1,
        },
        {
            id: 'i49',

            cost: 60,
            max: 1,
        },
        {
            id: 'i50',

            cost: 50,
            max: 0,
            sevensMax: 5,
        },
        {
            id: 'i51',

            cost: 100,
            max: 0,
            dungeonBowlMax: 1,
        },
        {
            id: 'i52',

            cost: 350,
            max: 1,
        },
        {
            id: 'i53',

            cost: 50,
            max: 0,
            gutterBowlMax: 99,
        },
        {
            id: 'i54',

            cost: 100,
            max: 0,
            gutterBowlMax: 99,
        },
        {
            id: 'i55',

            cost: 50,
            max: 0,
            gutterBowlMax: 1,
        },
        {
            id: 'i56',

            cost: 100,
            max: 0,
            gutterBowlMax: 1,
        },
        {
            id: 'i57',

            cost: 100,
            max: 0,
            gutterBowlMax: 1,
        },
    ],
};
