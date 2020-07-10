context('Application Dragon Portal', () => { 
  describe('Accessing Register new dragon', function() { 
    beforeEach(function () {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();  
      cy.wait(2000);
    });

    it('successfully loads register', function() { 
      cy.get('[data-cy=menu-add-dragon]').click();
      cy.wait(1000);
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/register');
      });
    });

    it('register new dragon', function() { 
      cy.get('[data-cy=menu-add-dragon]').click();
      cy.wait(1000);
      cy.get('[data-cy=type]').type('AA-TYPE');
      cy.get('[data-cy=name]').type('AA-NAME');
      cy.get('[data-cy=history]').type('Mussum Ipsum, cacilds vidis litro abertis.');
      cy.get('[data-cy=btn-register]').click();  

      cy.wait(2000);
      cy.get('[data-cy=name]').eq(0).should(($identifier) => {
        expect($identifier[0].innerText).to.equal('AA-NAME');
      });
    }); 

    it('record editing', function() { 
      cy.get('[data-cy=btn-edit]').eq(0).click(); 
      cy.wait(2000);
      cy.get('[data-cy=type]').clear().type('AAA-TYPE');
      cy.get('[data-cy=name]').clear().type('AAA-NAME');
      cy.get('[data-cy=history]').clear().type('Mussum Ipsum, cacilds vidis litro abertis.');
      cy.wait(2000);
      cy.get('[data-cy=btn-register]').click();  

      cy.wait(2000);
      cy.get('[data-cy=name]').eq(0).should(($identifier) => {
        expect($identifier[0].innerText).to.equal('AAA-NAME');
      });
    });
  });
});