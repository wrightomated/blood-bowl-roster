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

    it('should load roster', () => {
        const roster = '{"teamId":3,"players":[{"playerName":"Erny","player":{"id":9,"position":"Beastman Runner Lineman","playerStats":[6,3,3,4,9],"cost":60,"skills":[30],"primary":["G","M","S"],"secondary":["A","P"]},"alterations":{"spp":0,"ni":0}}],"teamName":"The Horns","teamType":"Chaos Chosen","extra":{"dedicated_fans":1},"inducements":{},"treasury":1000}'
        cy.visit('?code=t3t1000d1p9IThe%20Horns:Erny');
        cy.get('.team-player-caption').should('have.text', 'Chaos Chosen Team Players');
        expect(localStorage.getItem('roster')).to.eq(roster);
    })
    
});

