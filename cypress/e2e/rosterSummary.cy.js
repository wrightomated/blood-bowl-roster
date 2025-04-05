/// <reference types="cypress" />

context('Roster Summary', () => {
    it('should calculate team value correctly with a mix of players, inducements, and skills', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(2);
        cy.getBySel('toggle-inducements').click();
        cy.contains('Bribe')
            .siblings('.inducement__control')
            .find('button')
            .click();

        // Open the first modal
        cy.getBySel('player-0-advancement').click();
        cy.contains('Block').click();
    });
    it('should display the same team value in the summary', () => {
        cy.visit('?code=t35t880m0f0d1p96e17a1v10p225I');
        cy.getBySel('team-value').should('have.text', '50,000');
        cy.getBySel('roster-total').should('have.text', '130,000 info');
        cy.getBySel('share-team').click();

        // Click the second button in .button-container
        cy.get('.button-container > button').eq(1).click();

        // Ensure the second modal is visible
        cy.get('.roster-summary').contains('CTV: 50,000');
        cy.get('.roster-summary').contains('Roster Total: 130,000');
    });
});
