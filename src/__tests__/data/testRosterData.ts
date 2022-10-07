import type { Roster } from '../../models/roster.model';

export const testRoster = {
    teamId: 1,
    mode: 'exhibition',
    format: 'elevens',
    players: [
        {
            playerName: 'Bob',
            player: {
                id: 1,
                position: 'Imperial Lineman',
                playerStats: [6, 3, 4, 4, 8],
                cost: 45,
                skills: [16],
                primary: ['G'],
                secondary: ['A', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 1,
                position: 'Imperial Lineman',
                playerStats: [6, 3, 4, 4, 8],
                cost: 45,
                skills: [16],
                primary: ['G'],
                secondary: ['A', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 1,
                position: 'Imperial Lineman',
                playerStats: [6, 3, 4, 4, 8],
                cost: 45,
                skills: [16],
                primary: ['G'],
                secondary: ['A', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 1,
                position: 'Imperial Lineman',
                playerStats: [6, 3, 4, 4, 8],
                cost: 45,
                skills: [16],
                primary: ['G'],
                secondary: ['A', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 2,
                position: 'Imperial Thrower',
                playerStats: [6, 3, 3, 3, 9],
                cost: 75,
                skills: [46, 47],
                primary: ['G', 'P'],
                secondary: ['A', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 3,
                position: 'Noble Blitzer',
                playerStats: [7, 3, 3, 4, 9],
                cost: 105,
                skills: [13, 1],
                primary: ['A', 'G'],
                secondary: ['P', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: 'Bill',
            player: {
                id: 4,
                position: 'Bodyguard',
                playerStats: [6, 3, 3, 5, 9],
                cost: 90,
                skills: [58, 24],
                primary: ['G', 'S'],
                secondary: ['A'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 4,
                position: 'Bodyguard',
                playerStats: [6, 3, 3, 5, 9],
                cost: 90,
                skills: [58, 24],
                primary: ['G', 'S'],
                secondary: ['A'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 4,
                position: 'Bodyguard',
                playerStats: [6, 3, 3, 5, 9],
                cost: 90,
                skills: [58, 24],
                primary: ['G', 'S'],
                secondary: ['A'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 4,
                position: 'Bodyguard',
                playerStats: [6, 3, 3, 5, 9],
                cost: 90,
                skills: [58, 24],
                primary: ['G', 'S'],
                secondary: ['A'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                id: 5,
                position: 'Ogre',
                bigGuy: true,
                playerStats: [5, 5, 4, 5, 10],
                cost: 140,
                skills: [66, 71, 55, 60, 86],
                primary: ['S'],
                secondary: ['A', 'G'],
            },
            alterations: { spp: 3, ni: 0 },
        },
    ],
    teamName: 'Altdorf Daemons',
    teamType: 'Imperial Nobility',
    extra: { dedicated_fans: 1, rerolls: 2 },
    inducements: {},
    treasury: 1000,
};

export const inducementAndStarPlayer = {
    teamId: 22,
    mode: 'exhibition',
    format: 'elevens',
    players: [
        {
            player: {
                id: 224,
                position: 'Zolcath the Zoat',
                playerStats: [5, 5, 4, 5, 10],
                playsFor: ['Lustrian Superleague', 'Elven Kingdoms League'],
                skills: [27, 54, 71, 55, 33, 77, 12],
                cost: 230,
                specialRules: ['Excuse Me, Are You a Zoat?'],
            },
            playerName: 'Zolcath the Zoat',
            starPlayer: true,
        },
    ],
    teamName: '',
    teamType: 'Amazon (ToL)',
    extra: { dedicated_fans: 1, apothecary: 1 },
    inducements: { i8: 1 },
    treasury: 10,
};

export const playerSkills = {
    teamId: 25,
    mode: 'exhibition',
    format: 'elevens',
    players: [
        {
            player: {
                position: 'Norse Lineman',
                id: 104,
                cost: 50,
                playerStats: [6, 3, 3, 4, 8],
                skills: [13],
                primary: ['G'],
                secondary: ['A', 'S'],
            },
            playerName: '',
            alterations: {
                spp: 1,
                ni: 1,
                extraSkills: [21, 55],
                tr: true,
                statChange: [1, 0, -1, 0, 1],
            },
        },
    ],
    teamName: '',
    teamType: 'Norse (ToL)',
    extra: { dedicated_fans: 1 },
    inducements: {},
    treasury: 20,
};

export const noTeamName: Roster = {
    teamId: 2,
    mode: 'exhibition',
    format: 'elevens',
    players: [
        {
            playerName: 'Bob',
            player: {
                id: 6,
                position: 'Goblin Bruiser Lineman',
                playerStats: [6, 2, 3, 4, 8],
                cost: 45,
                skills: [4, 78, 81, 60],
                primary: ['A'],
                secondary: ['G', 'P', 'S'],
            },
            alterations: { spp: 0, ni: 0, valueChange: 20 },
        },
        {
            playerName: '',
            player: {
                id: 6,
                position: 'Goblin Bruiser Lineman',
                playerStats: [6, 2, 3, 4, 8],
                cost: 45,
                skills: [4, 78, 81, 60],
                primary: ['A'],
                secondary: ['G', 'P', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
    ],
    teamName: '',
    teamType: 'Black Orc',
    extra: { dedicated_fans: 1 },
    inducements: {},
    treasury: 1000,
};

export const inducementAndStarPlayerString = 't22t10m1f0d1y1i8.1p224I';

export const testRosterString =
    't1t1000m1f0d1r2p1p1p1p1p2p3p4p4p4p4p5s3IAltdorf%20Daemons:Bob::::::Bill';

export const encodedRosterString =
    't1t1000m1f0d1r2p1p1p1p1p2p3p4p4p4p4p5s3IAltdorf%20Daemons%3ABob%3A%3A%3A%3A%3A%3ABill';

export const playerSkillsString = 't25t20m1f0d1p104s1n1e21.55t1c10-101I';
