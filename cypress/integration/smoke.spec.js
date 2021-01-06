/// <reference types="cypress" />

context('Smoke tests', () => {
    const expectedRoster = '{"teamId":1,"players":[{"playerName":"Bob","player":{"id":1,"position":"Imperial Retainer Lineman","playerStats":[6,3,4,4,8],"cost":45,"skills":[16],"primary":["G"],"secondary":["A","S"]}},{"playerName":"","player":{"id":1,"position":"Imperial Retainer Lineman","playerStats":[6,3,4,4,8],"cost":45,"skills":[16],"primary":["G"],"secondary":["A","S"]}},{"playerName":"","player":{"id":1,"position":"Imperial Retainer Lineman","playerStats":[6,3,4,4,8],"cost":45,"skills":[16],"primary":["G"],"secondary":["A","S"]}},{"playerName":"","player":{"id":1,"position":"Imperial Retainer Lineman","playerStats":[6,3,4,4,8],"cost":45,"skills":[16],"primary":["G"],"secondary":["A","S"]}},{"playerName":"","player":{"id":2,"position":"Imperial Thrower","playerStats":[6,3,3,3,9],"cost":75,"skills":[46,47],"primary":["G","P"],"secondary":["A","S"]}},{"playerName":"","player":{"id":3,"position":"Noble Blitzer","playerStats":[7,3,3,4,9],"cost":105,"skills":[13,1],"primary":["A","G"],"secondary":["P","S"]}},{"playerName":"","player":{"id":4,"position":"Bodyguard","playerStats":[6,3,3,5,9],"cost":90,"skills":[58,24],"primary":["G","S"],"secondary":["A"]}},{"playerName":"","player":{"id":4,"position":"Bodyguard","playerStats":[6,3,3,5,9],"cost":90,"skills":[58,24],"primary":["G","S"],"secondary":["A"]}},{"playerName":"","player":{"id":4,"position":"Bodyguard","playerStats":[6,3,3,5,9],"cost":90,"skills":[58,24],"primary":["G","S"],"secondary":["A"]}},{"playerName":"","player":{"id":4,"position":"Bodyguard","playerStats":[6,3,3,5,9],"cost":90,"skills":[58,24],"primary":["G","S"],"secondary":["A"]}},{"playerName":"","player":{"id":5,"position":"Ogre","playerStats":[5,5,4,5,10],"cost":140,"skills":[66,71,55,60,86],"primary":["S"],"secondary":["A","G"]}}],"rerolls":0,"teamName":"Altdorf Daemons","teamType":"Imperial Nobility","extra":{"rerolls":2},"inducements":{},"starPlayers":[]}';
    it('should create, save and load team', () => {
        cy.visit('/');
        cy.get('.new-team').click();
        cy.get('.team-button:nth-child(1)').click();
        cy.get('.team-player-caption').should('have.text', 'Black Orc Team Players');
        cy.get('.team-button:nth-child(10)').click();
        cy.get('.team-player-caption').should('have.text', 'Imperial Nobility Team Players');
        cy.get('.create-team').click();
        cy.get('#team-name').click();
        cy.get('#team-name').type('Altdorf Daemons');
        cy.get('.heading').click();
        cy.get('.name-input').click();
        cy.get('.name-input').type('Bob');
        cy.get('.sub-heading-box').click();
        cy.get('.left-align .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.position > select').select('Imperial Thrower');
        cy.get('.position > select').type('[object Object]');
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.position > select').select('Noble Blitzer');
        cy.get('.position > select').type('[object Object]');
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.position > select').select('Bodyguard');
        cy.get('.position > select').type('[object Object]');
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.position > select').select('Ogre');
        cy.get('.position > select').type('[object Object]');
        cy.get('.left-align > .symbol-control > .material-icons').click();
        cy.get('.table > tr:nth-child(1) .material-icons').click();
        cy.get('.table > tr:nth-child(1) .symbol-control:nth-child(1) > .material-icons').click();
        cy.get('.sub-heading-box').click();
        cy.get('.sub-heading-box > .symbol-control:nth-child(2) > .material-icons').click().should(() => {
            expect(localStorage.getItem('roster')).to.eq(expectedRoster);
            expect(localStorage.getItem('rosterIndex')).to.eq('{"currentIndex":1,"index":[{"id":1,"name":"Altdorf Daemons"}],"count":1}');
            expect(localStorage.getItem('savedRoster1')).to.eq(expectedRoster);
        });

        cy.get('.new-team').click();
        cy.get('.team-button:nth-child(1)').click();
        cy.get('.team-player-caption').should('have.text', 'Black Orc Team Players');
        cy.get('.create-team').click();
        cy.get('.load-team-button').click();
        cy.get('.saved-team-button').click();
        cy.get('.team-player-caption').should('have.text', 'Imperial Nobility Team Players');
    });

    it('Should add star player', () => {
        cy.visit('/');
        cy.get('.new-team').click();
        cy.get('.team-button:nth-child(11)').click();
        cy.get('.create-team').click();
        cy.get('.inducement__toggle .material-icons').click();
        cy.get('.star-player-select').select('Zolcath the Zoat');
        cy.get('tr:nth-child(11) .material-icons').click();
        cy.get('.player-name').should('have.text', 'Zolcath the Zoat');
    })
});
