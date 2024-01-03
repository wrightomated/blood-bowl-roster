import { elevensGame } from '../../data/gameType.data';
import type { TournamentCustomisation } from '../types/TournmentCustomisation.type';

export const tournamentCustomisation: TournamentCustomisation = {
    gameTypeSettings: {
        ...elevensGame,
        startingTreasury: 1100,
    },
    createTeamTitle: 'Create new Big V 2023 roster',
    format: 'elevens',
    tiers: 4,
    tournamentTeamList: {
        excludedIds: ['22', '25', '27', '28'],
        additionalTeams: [
            {
                name: 'Skinks',
                id: 'bigvskinks2023',
                players: [
                    { id: 43, max: 12 },
                    { id: 44, max: 2 },
                    { id: 46, max: 1 },
                ],
                reroll: { cost: 70, max: 8 },
                allowedApothecary: true,
                tier: 4,
                specialRules: ['Lustrian Superleague'],
            },
            {
                name: 'Underworld Goblins',
                id: 'bigvunderworldgoblins2023',
                players: [
                    { id: 125, max: 12 },
                    { id: 126, max: 6 },
                    { id: 131, max: 1 },
                    { id: 132, max: 1 },
                ],
                reroll: { cost: 70, max: 8 },
                allowedApothecary: true,
                tier: 4,
                specialRules: [
                    'Bribery and Corruption',
                    'Underworld Challenge',
                ],
                maxBigGuys: 1,
            },
            {
                name: 'Goblin Bruisers',
                id: 'bigvgoblinbruisers2023',
                players: [
                    { id: 6, max: 12 },
                    { id: 8, max: 1 },
                ],
                reroll: { cost: 60, max: 8 },
                allowedApothecary: true,
                tier: 4,
                specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
            },
        ],
    },
    updatedTierMap: {
        'High Elf': 2,
        'Underworld Denizens': 2,
        'Chaos Chosen': 3,
        'Imperial Nobility': 3,
        Khorne: 3,
        'Old World Alliance': 3,
        Goblin: 4,
        Halfling: 4,
        Ogre: 4,
    },
    cssVariables: {
        '--main-colour': '#db6d27',
        '--secondary-colour': '#db6d27',
        '--button-shadow': '#fdbb27',
    },
    allowances: {
        sameSkillAllowance: 4,
        statImprovementAllowancePerPlayer: 1,
        allowTraitRemoval: 1,
        increaseTierPerStarPlayer: true,
    },
    tournamentAdvancements: {
        tiers: {
            '0': {
                spp: 12,
                restrictions: ['primary'],
            },
            '1': { spp: 42 },
            '2': { spp: 54 },
            '3': { spp: 66 },
            '4': { spp: 78 },
        },
        advancementCost: {
            primaryrandom: 0,
            primaryselect: 0,
            secondaryrandom: 0,
            secondaryselect: 0,
        },
        // characteristicCostIncrease?: number[];
        advancements: {
            primaryselect: 6,
            secondaryselect: 12,
            characteristic: {
                ma: 15,
                pa: 15,
                av: 15,
                ag: 18,
                st: 24,
            },
            traitRemoval: { spp: 24, disallowedTraits: [79] },
        },
    },
};
