export const norseSpecialRuleString =
    't31t950m0f0d1s1p144p144j1e71ISpecial%20Rule';

export const norseSpecialRuleRoster = {
    teamId: 31,
    players: [
        {
            playerName: '',
            player: {
                position: 'Norse Raider Lineman',
                id: 144,
                cost: 50,
                playerStats: [6, 3, 3, 4, 8],
                skills: [13, 93, 60],
                primary: ['G'],
                secondary: ['A', 'P', 'S'],
            },
            alterations: { spp: 0, ni: 0 },
        },
        {
            playerName: '',
            player: {
                position: 'Norse Raider Lineman',
                id: 144,
                cost: 50,
                playerStats: [6, 3, 3, 4, 8],
                skills: [13, 93, 60],
                primary: ['G'],
                secondary: ['A', 'P', 'S'],
            },
            alterations: { spp: 0, ni: 0, journeyman: true, extraSkills: [71] },
        },
    ],
    teamName: 'Special Rule',
    teamType: 'Norse',
    extra: { dedicated_fans: 1, special_rule: 1 },
    inducements: {},
    treasury: 950,
    mode: 'league',
    format: 'elevens',
};
