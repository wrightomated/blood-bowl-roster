/// <reference types="cypress" />

context('Test that a team can be copied', () => {
    it('should create a share link', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Chaos Chosen').click();
        cy.getBySel('create-team').click();
        cy.getBySel('team-name').type('The Treelovers');
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-name-input').type('Tallboy');
        cy.getBySel('add-player').click();
        cy.getBySel('share-team').click();
        cy.getBySel('code-input').click();
        cy.getBySel('copy-share-url').click();
    });

    it('should load roster', () => {
        const expectedRoster = {
            teamId: '3',
            version: '3.0',
            extra: { dedicated_fans: 1 },
            players: [
                {
                    player: {
                        id: 9,
                        position: 'Beastman Lineman',
                        playerStats: [6, 3, 3, 4, 9],
                        cost: 60,
                        skills: [30],
                        primary: ['G', 'M', 'S'],
                        secondary: ['A', 'P'],
                    },
                    playerName: 'Erny',
                    alterations: { spp: 0, ni: 0, playerNumber: 1 },
                },
            ],
            teamName: 'The Horns',
            teamType: 'Chaos Chosen',
            inducements: {},
            treasury: 1000,
            mode: 'exhibition',
            format: 'elevens',
            matchSummary: [],
            coachDetails: {},
            config: { customSkillColour: {} },
        };
        cy.visit('?code=t3t1000d1p9IThe%20Horns:Erny');
        cy.getBySel('team-name').should(() => {
            const { rosterId, ...rosterNoId } = JSON.parse(
                localStorage.getItem('roster')
            );
            rosterNoId.players = rosterNoId.players.map((p) => {
                const { playerId, ...restOfPlayer } = p;
                return restOfPlayer;
            });
            console.log(JSON.stringify(rosterNoId, null, 2));
            expect(rosterNoId).to.deep.equal(expectedRoster);
        });
    });
});
