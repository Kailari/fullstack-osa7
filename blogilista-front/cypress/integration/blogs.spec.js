describe('while logged in', function () {
  const username = 'jaskajoku'
  const password = 'abc123'

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

  it('user can add a blog via /create', function () {
    const title = 'A blog'
    const author = 'An Author'
    const url = 'https://wwww.ablogbyanauthor.blog'

    cy.visit('/create')
    cy.get('input[name="Title"]')
      .type(title)
    cy.get('input[name="Author"]')
      .type(author)
    cy.get('input[name="URL"]')
      .type(url)
    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/blogs')
  })

  describe('after adding a blog', function () {
    const title = 'A blog'
    const author = 'An Author'
    const url = 'https://wwww.ablogbyanauthor.blog'

    beforeEach(function () {
      cy.visit('/create')
      cy.get('input[name="Title"]')
        .type(title)
      cy.get('input[name="Author"]')
        .type(author)
      cy.get('input[name="URL"]')
        .type(url)
      cy.get('button[type="submit"]')
        .click()

      cy.url()
        .should('include', '/blogs')
    })

    it('blog is visible on the main blog list', function () {
      cy.get('.blog.list')
        .contains(`${title} by ${author}`)
    })

    it('blog title can be clicked to get to the details page', function () {
      cy.get('.blog.list')
        .contains(`${title} by ${author}`)

      cy.get('.blog.list > .blog.entry > .title > a')
        .click()

      cy.url()
        .should('include', '/blogs')

      cy.contains('Added by')
      cy.contains('Jaska Jokunen')
      cy.contains('Likes')
      cy.contains(title)
      cy.contains(author)
      cy.contains(url)
    })
  })
})