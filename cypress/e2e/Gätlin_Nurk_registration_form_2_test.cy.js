beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignment 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        inputValidData('UsernameTest')
        cy.get('#confirm').type('IncorrectPassword')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#confirm').clear().type('MyPass')
        cy.get('h2').contains('Password section').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')

        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        // Change the test, so the passwords would match
        // Add assertion, that error message is not visible anymore
        // Add assertion, that submit button is now enabled
    })
    
    it('User can submit form with all fields added', ()=>{
        inputValidData('UsernameTest')
        cy.get('#htmlFavLanguage').click().should('be.checked')
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('cat')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('UsernameTest')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

    })

    it('User cannot submit form without email', ()=>{
        inputValidData('UsernameTest')
        cy.get('#email').clear()
        cy.get('h3').contains('Input email').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // Add at least 1 test for checking some mandatory field's absence)
    })

})

/*
Assignment 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)

        // get element and check its parameter height
        // it should be less than 178 and greater than 100
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src'). should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116).and('be.greaterThan', 80)
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 120)
        .and('be.greaterThan', 85)

        // Create similar test for checking the second picture
    })

    it('Check first navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        // Get navigation element, find its first child, check the link content and click it
        // Check that currently opened URL is correct
        // Go back to previous page
    })

    it('Check second navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
        .and('have.attr', 'href', 'registration_form_3.html')
        .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
        
        // Check that opened URL for RF3 is correct
        // Go back to previous page
        // Create similar test for checking the second link 
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

        // Array of found elements with given selector has 4 elements in total
        //Verify default state of radio buttons
        // Selecting one will remove selection from the other radio button
        // Verify labels of the radio buttons
    })

    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        
        // Verify all the labels of checkboxes
        // Verify default state of checkboxes
        // Verify that both checkboxes are checked
        // Create test similar to previous one verifying check boxes
    })

    it('Check that car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Check that animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
       
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        
        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        // Value='mouse' written incorrectly (bug), should be: 'horse'

            // Verify all values
            // Create test similar to previous one
        })      
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}
