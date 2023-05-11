import type { TournamentCustomisation } from '../types/TournmentCustomisation.type';

export const BigV2023: TournamentCustomisation = {
    treasury: 1100,
    tournamentTeamList: {
        excludedIds: [22, 25, 28],
        additionalTeams: [
            {
                name: 'Skinks',
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
};
