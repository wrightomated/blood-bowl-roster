/// <reference types="cypress" />

context('Test that a team can be validated', () => {
    it('should start invalid', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Exhibition').click();
        cy.contains('Chaos Chosen').click();
        cy.getBySel('create-team').click();

        cy.get('.validator').contains('Tier: 2');
        cy.get('.error-messages').contains('Not enough players in roster.');

        cy.getBySel('new-player-position-select').select('Chaos Ogre 0/1');
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-position-select').select('Chaos Troll 0/1');
        cy.getBySel('add-player').click();

        cy.get('.error-messages').contains('Too many Big Guys');
    });

    it('should be valid after adding enough players', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Exhibition').click();
        cy.contains('Chaos Chosen').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(8);

        cy.getBySel('new-player-position-select').select('Chosen Blocker 0/4');
        cy.addPlayers(4);

        cy.get('.error-messages').children().should('have.length', 0);
    });
});
