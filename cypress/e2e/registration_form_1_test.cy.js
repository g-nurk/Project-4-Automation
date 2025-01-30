// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 */

describe('This is first test suite, Gätlin Nurk',() => {
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('GTestFirstName')
        cy.get('#lastName').type('GTestLastName')
        cy.get('input[name="password"]').type('NewPassword96')
        cy.get('[name="confirm"]').type('NewPassword96')
        cy.get('#username').type('Something')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button', { timeout: 10000 }).should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        cy.get('[name="confirm"]').type('{enter}')
        cy.window().scrollTo('bottom')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
        
        // type('{enter}') is clicking native enter button from thekeyboard
        // for example, to click backspace use '{backspace}'
        // Scroll to bottom of the page
        // Assert that password error message is visible, and message should contain 'Passwords do not match!
        // Assert that success message is not visible
        // Asserting that Submit button is disabled
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */

        // Add test, similar to previous one with phone number field not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that successful message is not visible
        it('User cannot submit data when phone number is absent', () => {
            cy.get('#username').type('johnDoe')
            cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
            cy.get("input[name='password']").type('Password123')
            cy.get('[name="confirm"]').type('Password123')
    
            // Scroll back to phone input field
            cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
            cy.get('[data-testid="phoneNumberTestId"]').clear()
            cy.get('h2').contains('Password').click()
    
            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')
    
            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
        })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        // Add test, similar to previous one with password field not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that successful message is not visible
        cy.get('#username').type('johnDoe')
        cy.get('#firstName').type('GTestFirstName')
        cy.get('#lastName').type('GTestLastName')
        cy.get('input[name="password"]').type('NewPassword96')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('[name="confirm"]').type('Password123')
        cy.get("input[name='password']").scrollIntoView()
        cy.get("input[name='password']").clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot add letters to phone number', () => {
        // Next verification is given as example
        // how we can check from html code, that phone number should contain only numbers
        //cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')

        // Add steps, when all fields are correctly filled in, except phone number
        // Try typing letters to phone number field
        // Assert that submit button is not enabled and that successful message is not visible
        cy.get('#username').type('johnDoe')
        cy.get('#firstName').type('GTestFirstName')
        cy.get('#lastName').type('GTestLastName')
        cy.get('input[name="password"]').type('NewPassword96')
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    })
})
