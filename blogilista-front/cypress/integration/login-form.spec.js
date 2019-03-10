describe('When user enters information to login form', function () {
  beforeEach(function() {
    cy.visit('/')
  })

  it('app notifies of invalid credentials if information is incorrect', function () {
    cy.get('input[name="Username"]')
      .type('en-ole-olemassa')
    cy.get('input[name="Password"]')
      .type('salasana')
    cy.get('button[type="submit"]')
      .click()

    cy.get('.notification')
      .should('have.class', 'error')
      .contains('Invalid username or password')
  })

  it('app notifies of invalid credentials if password is incorrect', function () {
    cy.get('input[name="Username"]')
      .type('jaskajoku')
    cy.get('input[name="Password"]')
      .type('salasana')
    cy.get('button[type="submit"]')
      .click()

    cy.get('.notification')
      .should('have.class', 'error')
      .contains('Invalid username or password')
  })

  it('app notifies of succesfull login and proceeds to /blogs', function () {
    cy.get('input[name="Username"]')
      .type('jaskajoku')
    cy.get('input[name="Password"]')
      .type('abc123')
    cy.get('button[type="submit"]')
      .click()

    cy.get('.notification')
      .should('have.class', 'ok')
      .contains('logged in')

    cy.url()
      .should('include', '/blogs')

    cy.contains('Fullstack-Bloglist')
    cy.contains('blogs')

    cy.get('.navigation')
      .contains('jaskajoku')
  })
})
