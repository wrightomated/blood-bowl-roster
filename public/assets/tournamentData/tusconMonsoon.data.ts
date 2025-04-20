import { TournamentCustomisation } from '../../../src/customisation/types/TournmentCustomisation.type';

export const data: TournamentCustomisation = {
    customContent: {
        createTeamTitle: 'Tucson Monsoon Roster',
        menuSubtitle: 'Tucson Monsoon',
        teamTypeTitle: 'Tucson Monsoon',
    },
    format: 'elevens',
    hideProfile: true,
    treasury: 1100,
    lockTreasury: true,
    tournamentTeamList: {
        additionalTeams: [
            {
                name: 'Black Goblins',
                id: 'custom1',
                players: [
                    { id: 6, max: 16 },
                    { id: 8, max: 1 },
                ],
                reroll: { cost: 60, max: 8 },
                allowedApothecary: true,
                tier: 4,
                specialRules: ['Badlands Brawl', 'Bribery and Corruption'],
            },
            {
                name: 'Skinks',
                id: 'custom2',
                players: [
                    { id: 43, max: 16 },
                    { id: 44, max: 2 },
                    { id: 46, max: 1 },
                ],
                reroll: { cost: 70, max: 8 },
                allowedApothecary: true,
                tier: 4,
                specialRules: ['Lustrian Superleague'],
            },
            {
                name: 'Underworld (only including Goblins, Snotling)',
                id: 'custom3',
                players: [
                    { id: 125, max: 12 },
                    { id: 126, max: 6 },
                    { id: 127, max: 3 },
                    { id: 128, max: 1 },
                    { id: 129, max: 1 },
                    { id: 130, max: 1 },
                    { id: 131, max: 1 },
                    { id: 132, max: 1 },
                ],
                reroll: { cost: 70, max: 8 },
                allowedApothecary: true,
                tier: 1,
                specialRules: [
                    'Bribery and Corruption',
                    'Underworld Challenge',
                ],
                maxBigGuys: 1,
            },
        ],
    },
    updatedTierMap: {
        Gnome: 4,
        Halfling: 4,
        Goblin: 4,
        Ogre: 4,
        Snotling: 4,
    },
    tiers: 4,
    allowances: {
        maxOfSkillId: 4,
        noSkillStacking: true,
        statImprovementAllowancePerPlayer: 0,
        blockSppEditing: true,
        allowancesPerTier: {
            1: {
                primarySkill: 4,
                secondarySkill: 1,
                starPlayer: 2,
                spp: 0,
            },
            2: {
                primarySkill: 5,
                secondarySkill: 1,
                starPlayer: 2,
                spp: 0,
            },
            3: {
                primarySkill: 6,
                secondarySkill: 1,
                starPlayer: 2,
                spp: 0,
            },
            4: {
                primarySkill: 7,
                secondarySkill: 1,
                starPlayer: 2,
                spp: 0,
            },
        },
    },
    inducementSettings: {
        includedInducementIds: [
            'i4',
            'i7',
            'i8',
            'i9',
            'i10',
            'i11',
            'i12',
            'i52',
        ],
    },
};
