/// <reference types="cypress" />

context('Test that team value is calculated correctly', () => {
    it('should calculate team value correctly with no players', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.getBySel('team-value').should('have.text', '0');
    });

    it('should calculate team value correctly with one player', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(1);
        cy.getBySel('team-value').should('have.text', '50,000');
    });

    it('should calculate team value correctly with multiple players', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(3);
        cy.getBySel('team-value').should('have.text', '150,000');
        cy.getBySel('roster-total').should('have.text', '150,000 info');
    });
    it('should calculate team value correctly with inducements', () => {
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
        cy.getBySel('team-value').should('have.text', '100,000');
        cy.getBySel('roster-total').should('have.text', '200,000 info');
    });
    it('should calculate team value correctly with skills', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Skaven').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(1);
        cy.getBySel('player-0-advancement').click();
        cy.contains('Block').click();
        cy.getBySel('close-modal').click();
        cy.getBySel('team-value').should('have.text', '60,000');
    });
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
        cy.getBySel('player-0-advancement').click();
        cy.contains('Block').click();
        cy.getBySel('close-modal').click();
        cy.getBySel('team-value').should('have.text', '110,000');
        cy.getBySel('roster-total').should('have.text', '210,000 info');
    });
    it('should calculate current team value correctly with low cost linemen', () => {
        cy.visit('/');
        cy.getBySel('menu-button').click();
        cy.getBySel('new-team').click();
        cy.get('.search-input').click();
        cy.contains('Snotling').click();
        cy.getBySel('create-team').click();
        cy.addPlayers(10);
        cy.getBySel('new-player-position-select').select('Fun-hoppa 0/2');
        cy.addPlayers(2);
        cy.getBySel('add-star-player').click();
        cy.getBySel('team-value').should('have.text', '190,000');
        cy.getBySel('current-tv').should('have.text', '40,000');
        cy.getBySel('roster-total').should('have.text', '270,000 info');
    });
});
