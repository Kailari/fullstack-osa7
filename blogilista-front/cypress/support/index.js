const backendUrl = 'http://localhost:3003'

beforeEach(function () {
  cy.request('POST', `${backendUrl}/api/testing/reset`)

  cy.fixture('users/jaskajoku').then(user => {
    cy.request('POST', `${backendUrl}/api/users`, user)
  })
  cy.fixture('users/jokutoinen').then(user => {
    cy.request('POST', `${backendUrl}/api/users`, user)
  })
})
