context('Application Breaking Bad', () => {
  describe('Accessing The Home Page', function() {
    it('successfully loads', function() {
      cy.visit('http://localhost:4200/');
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/');
      });
    });
  }); 
})