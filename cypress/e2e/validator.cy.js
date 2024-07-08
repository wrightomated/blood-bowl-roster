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

        cy.getBySel('new-player-position-select').select('Chaos Ogre');
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();

        cy.get('.error-messages').contains(
            'Too many of player type: Chaos Ogre'
        );
        cy.get('.error-messages').contains('Too many Big Guys');
    });

    it('should be valid after adding enough players', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Exhibition').click();
        cy.contains('Chaos Chosen').click();
        cy.getBySel('create-team').click();

        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('new-player-position-select').select('Chosen Blocker');
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();
        cy.getBySel('add-player').click();

        cy.get('.error-messages').children().should('have.length', 0);
    });
});
