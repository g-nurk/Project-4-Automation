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

    it('Check the countries dropdown', () => {
    cy.get('#country').children().should('have.length', 4)
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    cy.get('#city').should('be.disabled')
    })    

    it('Check the dropdown and dependencies for Spain', () => {
    const SpainCities = ['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo']
    cy.get('#country').select(1)
    cy.get('#city').find('option').should('have.length', 5)
    SpainCities.forEach((country, index) => {
    cy.get('#city').find('option').eq(index).should('have.text', country)
    })
})

    it('Check the dropdown and dependencies for Estonia', () => {
    const EstonianCities = ['', 'Tallinn', 'Haapsalu', 'Tartu']
    cy.get('#country').select(2)
    cy.get('#city').find('option').should('have.length', 4)
    EstonianCities.forEach((country, index) => {
    cy.get('#city').find('option').eq(index).should('have.text', country)
    })
 })
 it('Check the dropdown and dependencies for Austria', () => {
    const AustrianCities = ['', 'Vienna', 'Salzburg', 'Innsbruck']
    cy.get('#country').select(3)
    cy.get('#city').find('option').should('have.length', 4)
    AustrianCities.forEach((country, index) => {
    cy.get('#city').find('option').eq(index).should('have.text', country)
})
 })

 it('Check that city choice is removed', () => {
    cy.get('#country').select(3)
    cy.get('#city').select(3)
    cy.get('#country').select(2)
    cy.get('#city').should('have.class', 'ng-invalid')
})


    it('Check that checbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked').siblings().should('contain', 'Accept our cookie policy')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked').parent().find('button a').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('input[type="checkbox"]').eq(1).parent().find('button a').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    it('Check that the email format is correct', () => {
        cy.get('input[name="email"]').should('exist').should('be.enabled')
        cy.get('label[for="email"]').should('contain.text', 'Email')
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address.').should('not.be.visible')
        cy.get('input[name="email"]').type('invalid')
        cy.get('h1').contains('Registration page')
        cy.get('span').contains('Invalid email address.').should('be.visible')
        cy.get('input[name="email"]').clear()
        cy.get('span').contains('Email is required.').should('be.visible')
    })
})
