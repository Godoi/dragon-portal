context('Application Dragon Portal', () => {
  describe('Accessing page not found', function() {
    beforeEach(function () {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();  
      cy.wait(2000);
      cy.visit('http://localhost:4200/xyz');
      cy.wait(2000);
    });
    it('page not found', function() { 
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/404');
      }); 
    });
  });
});