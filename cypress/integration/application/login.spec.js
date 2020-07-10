context('Application Dragon Portal', () => {
  describe('Accessing The Login page', function() {
    it('successfully loads', function() {
      cy.visit('http://localhost:4200/');
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/login');
      });
    });
  });
  describe('Accessing the Login page', function() {
    it('Username and password not found', function() {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('sicredi');
      cy.get('[data-cy=password]').type('sicredi');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();
      cy.get('[data-cy=alert-message]').should(($identifier) => {
        expect($identifier[0].innerText).to.equal('Username and password not found.');
      });   
    });
    it('successfully login page', function() {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();
    
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/home');
      });      
    });
    it('logout page return login', function() {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();
      cy.wait(2000);
      cy.get('[data-cy=menu-logout]').click();
      cy.wait(1000);    
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/login');
      });      
    });
  });
});