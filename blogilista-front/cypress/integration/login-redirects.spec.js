describe('User ends up on login page when', function () {
  it('they open app for the first time', function () {
    cy.visit('/')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')

    cy.get('.notification')
      .should('not.exist')
  })

  it('they visit /create while not logged in', function () {
    cy.visit('/create')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')
    cy.get('.notification')
      .should('have.class', 'warn')
      .contains('Please log in first')
  })

  it('they visit /blogs while not logged in', function () {
    cy.visit('/blogs')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')
    cy.get('.notification')
      .should('have.class', 'warn')
      .contains('Please log in first')
  })

  it('they visit /users while not logged in', function () {
    cy.visit('/users')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')
    cy.get('.notification')
      .should('have.class', 'warn')
      .contains('Please log in first')
  })

  it('they visit /blogs/:id while not logged in', function () {
    cy.visit('/blogs/12345')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')
    cy.get('.notification')
      .should('have.class', 'warn')
      .contains('Please log in first')
  })

  it('they visit /users/:id while not logged in', function () {
    cy.visit('/users/12345')
    cy.contains('Fullstack-Bloglist')
    cy.contains('Login')
    cy.get('.notification')
      .should('have.class', 'warn')
      .contains('Please log in first')
  })
})
