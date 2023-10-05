import type { GameType as GameTypeSettings } from '../models/gameType.model';

export const sevensGame: GameTypeSettings = {
    teamFormat: 'sevens',
    maxPlayers: 11,
    minPlayers: 7,
    startingTreasury: 600,
    rerollDetails: { costMultiplier: 2, max: 6 },
    assistantCoaches: { cost: 20, max: 3 },
    cheerleaders: { cost: 20, max: 6 },
    apothecary: { cost: 80, max: 1 },
    dedicatedFans: { cost: 20, max: 6 },
    advancementSettings: [
        {
            type: 'primary',
            selectionTypes: ['random'],
        },
        {
            type: 'secondary',
            selectionTypes: ['random'],
        },
    ],
    starPlayersAllowance: 0,
    maxSpecialists: 4,
    inducementCostKey: 'sevensCost',
    inducementMaxKey: 'sevensMax',
    pitch: {
        length: 20,
        width: 11,
        gutter: 4,
    },
};

export const elevensGame: GameTypeSettings = {
    teamFormat: 'elevens',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    rerollDetails: { costMultiplier: 1, max: 8 },
    assistantCoaches: { cost: 10, max: 6 },
    cheerleaders: { cost: 10, max: 12 },
    apothecary: { cost: 50, max: 1 },
    dedicatedFans: { cost: 10, max: 6 },
    advancementSettings: [
        {
            type: 'primary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'secondary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'characteristic',
            selectionTypes: ['random'],
        },
    ],
    starPlayersAllowance: 2,
    pitch: {
        length: 26,
        width: 15,
        gutter: 4,
    },
};

export const dungeonBowlGame: GameTypeSettings = {
    teamFormat: 'dungeon bowl',
    maxPlayers: 16,
    minPlayers: 11,
    startingTreasury: 1000,
    rerollDetails: { costMultiplier: 1, max: 8, overrideCost: 50 },
    assistantCoaches: { cost: 10, max: 0 },
    cheerleaders: { cost: 10, max: 0 },
    apothecary: { cost: 50, max: 0 },
    dedicatedFans: { cost: 10, max: 0 },
    advancementSettings: [
        {
            type: 'primary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'secondary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'characteristic',
            selectionTypes: ['random'],
        },
    ],
    starPlayersAllowance: 0,
    inducementMaxKey: 'dungeonBowlMax',
};

export const gutterBowlGame: GameTypeSettings = {
    teamFormat: 'gutter bowl',
    maxPlayers: 16,
    minPlayers: 7,
    startingTreasury: 750,
    rerollDetails: { costMultiplier: 1, max: 8, overrideCost: 100 },
    assistantCoaches: { cost: 10, max: 0 },
    cheerleaders: { cost: 10, max: 0 },
    apothecary: { cost: 50, max: 0 },
    dedicatedFans: { cost: 10, max: 6 },
    advancementSettings: [
        {
            type: 'primary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'secondary',
            selectionTypes: ['random', 'select'],
        },
        {
            type: 'characteristic',
            selectionTypes: ['random'],
        },
    ],
    starPlayersAllowance: 0,
    maxSpecialists: 5,
    inducementMaxKey: 'gutterBowlMax',
    turnsPerHalf: 6,
};
