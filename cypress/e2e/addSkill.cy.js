/// <reference types="cypress" />

context('Test that a skill can be added to a player', () => {
    it('should add a skill and increase current team value', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.getBySel('add-player').click();
        cy.getBySel('player-0-advancement').click();
        cy.contains('Block').click();
        cy.getBySel('close-modal').click();
        cy.getBySel('player-0-skills').should('include.text', 'Block');
        cy.getBySel('current-tv').should('have.text', '60,000');
    });

    it('should remove a player and reduce ctv', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.getBySel('add-player').click();
        cy.getBySel('player-0-remove').click();
        cy.getBySel('accept-player-deletion').click();
        cy.getBySel('current-tv').should('have.text', '0');
    });
});
