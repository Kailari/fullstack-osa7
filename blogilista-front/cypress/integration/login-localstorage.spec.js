const username = 'jaskajoku'
const password = 'abc123'

describe('when logged in', function () {
  beforeEach(function () {
    cy.visit('/')
    cy.get('input[name="Username"]')
      .type(username)
    cy.get('input[name="Password"]')
      .type(password)
    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/blogs')
  })

  it('app remembers login information after page reload', function () {
    cy.reload()

    cy.contains('Fullstack-Bloglist')
    cy.contains('blogs')

    cy.get('.navigation')
      .contains(username)
  })

  it('pressing logout redirects user to login form', function () {
    cy.get('button[name=Logout]')
      .click()

    cy.url()
      .should('not.include', '/blogs')
      .should('eq', `${Cypress.config().baseUrl}/`)
    cy.contains('Fullstack-Bloglist')
    cy.contains('login')

    cy.get('.navigation')
      .should('not.exist')
  })


  it('logging out and reloading page still has user logged out', function () {
    cy.get('button[name=Logout]')
      .click()

    cy.url()
      .should('not.include', '/blogs')

    cy.reload()

    cy.url()
      .should('not.include', '/blogs')
      .should('eq', `${Cypress.config().baseUrl}/`)
    cy.contains('Fullstack-Bloglist')
    cy.contains('login')

    cy.get('.navigation')
      .should('not.exist')
  })
})