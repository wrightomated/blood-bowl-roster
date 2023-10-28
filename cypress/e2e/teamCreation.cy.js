/// <reference types="cypress" />

context('Team creation', () => {
    it('should create, save and load team', () => {
        const teamName = 'Altdorf Daemons';
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Black Orc').click();
        cy.getBySel('selected-team-caption').should(
            'have.text',
            'Black Orc Team Players'
        );
        cy.contains('Imperial Nobility').click();
        cy.getBySel('selected-team-caption').should(
            'have.text',
            'Imperial Nobility Team Players'
        );
        cy.getBySel('create-team').click();

        cy.getBySel('team-name').type(teamName);

        cy.getBySel('new-player-name-input').type('Bob');
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();

        cy.getBySel('new-player-position-select').select('Imperial Thrower');
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-position-select').select('Noble Blitzer');
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-position-select').select('Bodyguard');
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-position-select').select('Ogre');
        cy.getBySel('add-player').click();
        cy.getBySel('add-rerolls').click();
        cy.getBySel('add-rerolls').click();
        cy.getBySel('save-roster')
            .click()
            .should(() => {
                let { rosterId, ...rosterNoId } = JSON.parse(
                    localStorage.getItem('roster')
                );
                rosterNoId.players = rosterNoId.players.map((p) => {
                    const { playerId, ...restOfPlayer } = p;
                    return restOfPlayer;
                });
                expect(rosterNoId).to.deep.equal(expectedRoster);
                expect(localStorage.getItem('rosterIndex')).to.eq(
                    '{"currentIndex":1,"index":[{"id":1,"name":"Altdorf Daemons"}],"count":1}'
                );
            });

        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Black Orc').click();
        cy.getBySel('selected-team-caption').should(
            'have.text',
            'Black Orc Team Players'
        );

        cy.getBySel('menu-button').click();
        cy.getBySel('load-team').click();
        cy.getBySel('load-team-box').contains(teamName).click();
        cy.getBySel('team-name').should('have.value', teamName);
    });

    it('Should add star player', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Lizardmen').click();
        cy.getBySel('create-team').click();
        cy.getBySel('star-player-select').select('Zolcath the Zoat');
        cy.getBySel('add-star-player').click();
        cy.getBySel('player-0-name').should('have.text', 'Zolcath the Zoat');
    });
});

const expectedRoster = {
    version: '3.0',
    teamId: '1',
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
            alterations: { spp: 0, ni: 0, playerNumber: 1 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 2 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 3 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 4 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 5 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 6 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 7 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 8 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 9 },
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
            alterations: { spp: 0, ni: 0, playerNumber: 10 },
        },
        {
            playerName: '',
            player: {
                id: 5,
                position: 'Ogre',
                playerStats: [5, 5, 4, 5, 10],
                cost: 140,
                skills: [66, 71, 55, 60, 86],
                primary: ['S'],
                secondary: ['A', 'G'],
                bigGuy: true,
            },
            alterations: { spp: 0, ni: 0, playerNumber: 11 },
        },
    ],
    teamName: 'Altdorf Daemons',
    teamType: 'Imperial Nobility',
    extra: { dedicated_fans: 1, rerolls: 2 },
    inducements: {},
    treasury: 0,
    mode: 'league',
    format: 'elevens',
    leagueRosterStatus: 'draft',
    matchSummary: [],
    coachDetails: {},
};
