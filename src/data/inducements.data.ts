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
            publication: 'rulebook',
        },
        {
            id: 'i2',
            cost: 20,
            max: 3,
            sevensMax: 1,
            sevensCost: 30,
            publication: 'rulebook',
        },
        {
            id: 'i3',
            cost: 30,
            max: 1,
            publication: 'rulebook',
        },
        {
            id: 'i4',
            cost: 50,
            max: 2,
            sevensMax: 2,
            publication: 'rulebook',
        },
        // {
        //     id: 'i5',
        //     cost: 100,
        //     max: 5,
        //     sevensMax: 5,
        //     publication: 'rulebook',
        // },
        {
            id: 'i6',
            cost: 100,
            max: 8,
            sevensCost: 150,
            dungeonBowlMax: 8,
            sevensMax: 8,
            publication: 'rulebook',
        },
        {
            id: 'i7',
            cost: 100,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 50 },
            max: 3,
            dungeonBowlMax: 3,
            sevensMax: 3,
            publication: 'rulebook',
        },
        {
            id: 'i8',

            cost: 100,
            max: 2,
            sevensMax: 2,
            requiresApothecary: true,
            publication: 'rulebook',
        },
        {
            id: 'i9',

            cost: 100,
            max: 1,
            sevensMax: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
            publication: 'rulebook',
        },
        {
            id: 'i10',

            cost: 100,
            max: 1,
            sevensMax: 1,
            requiresSpecialRule: 'Favoured of Nurgle',
            publication: 'rulebook',
        },
        {
            id: 'i11',

            cost: 100,
            max: 1,
            requiresSpecialRule: 'Low Cost Linemen',
            publication: 'rulebook',
        },
        {
            id: 'i12',

            cost: 300,
            reducedCost: { teamName: 'Halfling', cost: 100 },
            max: 1,
            sevensMax: 1,
            publication: 'rulebook',
        },
        {
            id: 'i15',

            cost: 100,
            max: 1,
            publication: 'rulebook',
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
            publication: 'deathzone',
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
            publication: 'deathzone',
        },
        {
            id: 'i20',

            cost: 40,
            max: 1,
            requiresSpecialRule: 'Elven Kingdoms League',
            publication: 'deathzone',
        },
        {
            id: 'i21',

            cost: 70,
            max: 1,
            requiresSpecialRule: 'Underworld Challenge',
            publication: 'deathzone',
        },
        {
            id: 'i22',

            cost: 100,
            max: 1,
            publication: 'deathzone',
        },
        {
            id: 'i23',

            cost: 130,
            max: 1,
            requiresSpecialRule: 'Sylvanian Spotlight',
            publication: 'deathzone',
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
            publication: 'deathzone',
        },
        {
            id: 'i25',

            cost: 90,
            max: 1,
            requiresSpecialRule: ['Badlands Brawl', 'Underworld Challenge'],
            publication: 'deathzone',
        },
        {
            id: 'i26',

            cost: 90,
            max: 1,
            publication: 'deathzone',
        },
        // {
        //     id: 'i16',

        //     cost: 150,
        //     max: 1,
        // },
        {
            id: 'i17',

            cost: 120,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
            max: 1,
            publication: 'rulebook',
        },
        {
            id: 'i38',
            displayName: "Biased Referee: Ranulf 'Red' Hokuli",
            cost: 130,
            max: 1,
            requiresSpecialRule: ['Lustrian Superleague', 'Old World Classic'],
            publication: 'deathzone',
        },
        {
            id: 'i39',

            cost: 120,
            max: 1,
            requiresSpecialRule: 'Worlds Edge Superleague',
            publication: 'deathzone',
        },
        {
            id: 'i40',

            cost: 120,
            max: 1,
            reducedCost: { specialRule: 'Bribery and Corruption', cost: 80 },
            publication: 'deathzone',
        },
        {
            id: 'i41',

            cost: 80,
            max: 1,
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 40 },
            publication: 'deathzone',
        },
        {
            id: 'i42',

            cost: 50,
            max: 1,
            requiresSpecialRule: 'Badlands Brawl',
            publication: 'deathzone',
        },
        {
            id: 'i43',

            cost: 30,
            max: 3,
            requiresSpecialRule: 'Favoured of Nurgle',
            publication: 'deathzone',
        },
        {
            id: 'i44',

            cost: 50,
            max: 1,
            requiresSpecialRule: [
                'Old World Classic',
                'Worlds Edge Superleague',
            ],
            publication: 'deathzone',
        },
        {
            id: 'i45',

            cost: 80,
            max: 1,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 60 },
            publication: 'deathzone',
        },
        {
            id: 'i46',

            cost: 40,
            max: 1,
            requiresSpecialRule: ['Halfling Thimble Cup', 'Old World Classic'],
            reducedCost: { specialRule: 'Halfling Thimble Cup', cost: 30 },
            publication: 'deathzone',
        },
        {
            id: 'i47',

            cost: 40,
            max: 3,
            requiresTier: 3,
            publication: 'deathzone',
        },
        {
            id: 'i48',

            cost: 30,
            max: 1,
            publication: 'deathzone',
        },
        {
            id: 'i49',

            cost: 60,
            max: 1,
            publication: 'deathzone',
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
        // {
        //     id: 'i52',

        //     cost: 350,
        //     max: 1,
        // },
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
        {
            id: 'i1000',
            cost: 60,
            max: 1,
        },
        {
            id: 'i1001',
            cost: 60,
            max: 1,
        },
    ],
};
