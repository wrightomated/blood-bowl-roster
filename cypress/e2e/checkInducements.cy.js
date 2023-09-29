/// <reference types="cypress" />

context('Test that the correct inducements are displayed', () => {
    it('should display the correct inducements for a sevens roster', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.contains('sevens').click();
        cy.contains('Orc').click();
        cy.getBySel('create-team').click();
        cy.getBySel('toggle-inducements').click();
        cy.contains('Bribe');
        cy.contains('Desperate Measure');
        cy.contains('Extra Team Training');
        cy.contains('Halfling Master Chef');
        cy.contains('Mercenary');
        cy.contains('Part-time Assistant Coach');
        cy.contains('Temp Agency Cheerleader');
        cy.contains('Wandering Apothecary');
    });
});
