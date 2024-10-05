beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe('Section 1: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 120)   
        cy.get('img').invoke('width').should('be.lessThan', 180)
            .and('be.greaterThan', 175)
    })
    it('Check that radio button list is correct', () => {
    cy.get('input[type="radio"]').should('have.length', 4)
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check the dropdown and dependencies', () => {
    cy.get('#country').children().should('have.length', 4)
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    cy.get('#country').select('Spain')
    cy.get('#city').select('Madrid')
    //cy.get('#country').select('Estonia')
    //cy.get('#city').select('Haapsalu')
    cy.get('body').click()
    })      

    //ei oska 
    it('Check that checbox list is correct', () => {
    })

    //ei oska
    it('Check that the email format is correct', () => {
        //cy.get('input[name="email"]').should('contain', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        cy.get('input[name="email"]').type('invalid')
        //cy.get('#input_error_message').should('be.visible').should('contain', 'Invalid email address.')
        //cy.get('ng-show="myForm.email.$error.email').should('be.visible').should('contain', 'Invalid email address.')
    })
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */