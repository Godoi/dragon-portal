context('Application Dragon Portal', () => {

  describe('Accessing The Home page', function() {
    beforeEach(function () {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();  
      cy.wait(2000);
    });

    it('successfully loads home', function() { 
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/home');
      }); 
    });

    it('go to registration page', function() {  
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

    it('should call the GET api getAllDragon and validate the number of items on the screen', () => {
      cy.request('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon').as('dragons');
      cy.get('@dragons').then(response => {
          cy.get('[data-cy=list-dragon]').should(($identifier) => {
              expect($identifier.length).to.equal(response.body.length);
          });
      });
    });

    it('exit the home page', function() {
      cy.get('[data-cy=menu-logout]').click();
      cy.wait(1000);
      cy.location().should(loc => {
        expect(loc.href).to.eq('http://localhost:4200/login');
      }); 
    });
  });
  
  describe('Validating the buttons', function() {
    let theDragons = {};
    let theNameDragons = {};
    beforeEach(function () {
      cy.visit('http://localhost:4200/');
      cy.get('[data-cy=username]').type('demo');
      cy.get('[data-cy=password]').type('demo');
      cy.wait(1000);
      cy.get('[data-cy=cySubmit]').click();  
      cy.wait(2000);

      cy.request('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon').as('dragons');
      cy.get('@dragons').should(response => {
        theDragons = response.body;
      });

      cy.get('[data-cy=name]').eq(0).should(($identifier) => {
        theNameDragons = $identifier[0].innerText;
      });
    });

    it('successfully edit dragon', function() { 
      cy.get('[data-cy=btn-edit]').eq(0).click(); 
      cy.wait(2000);
      cy.get('[data-cy=title]').should(($identifier) => {
        expect($identifier[0].innerText).to.equal('Edition');
      });
    });

    it('successfully view dragon', function() { 
      cy.get('[data-cy=btn-view]').eq(0).click(); 
      cy.get('[data-cy=name]').should(($identifier) => {
        expect( $identifier[0].innerText).to.equal(theNameDragons);
      });
    });

    it('successfully cancel delete action', function() {  
      cy.get('[data-cy=btn-delete]').eq(0).click();      
      cy.wait(2000);
      cy.get('[data-cy=btn-cancel]').eq(0).click();  
      cy.get('[data-cy=list-dragon]').should(($identifier) => {
        const total = theDragons.length;
        expect($identifier.length).to.equal(total);
      });      
    });
    
    it('successfully delete dragon', function() {  
      cy.get('[data-cy=btn-delete]').eq(0).click();      
      cy.wait(2000);
      cy.get('[data-cy=btn-confirm]').eq(0).click();  
      cy.get('[data-cy=list-dragon]').should(($identifier) => {
        const total = theDragons.length - 1;
        expect($identifier.length).to.equal(total);
      });      
    });

  });
});