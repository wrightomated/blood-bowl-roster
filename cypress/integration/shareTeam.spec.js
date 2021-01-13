/// <reference types="cypress" />

context('Test that a team can be copied', () => {
    it('should create a share link', () => {
        cy.visit('/');
        cy.get('.new-team').click();
        cy.get('.team-button:nth-child(10)').click();
        cy.get('.create-team').click();
        cy.get('#team-name').click();
        cy.get('#team-name').type('The Treelovers');
        cy.get('.tables').click();
        cy.get('.left-align .material-icons').click();
        cy.get('.name-input').click();
        cy.get('.name-input').type('Tallboy');
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.tables').click();
        cy.get('.symbol-control:nth-child(4) > .material-icons').click();
        cy.get('#code-input').click();
        cy.get('.share-box:nth-child(1)').click();
        cy.get('#url-input').click();
        cy.get('.share-box:nth-child(1) .material-icons').click();
    });

    // it('should load roster', () => {
    //     cy.visit('/');

    // })
});

