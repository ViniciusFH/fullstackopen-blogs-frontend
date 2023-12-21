const testBlogOne = {
  title: 'New blog for testing',
  author: 'Author Tester',
  url: 'https://testingblog.com.br/test',
  likes: 5
}

const testBlogTwo = {
  title: 'Another blog for testing',
  author: 'Author Tester',
  url: 'https://testingblog.com.br/test',
  likes: 14
}

const testBlogThree = {
  title: 'And yet another blog for testing',
  author: 'Author Tester',
  url: 'https://testingblog.com.br/test',
  likes: 8
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetTest()
    cy.createUser({
      username: 'testing_user',
      name: 'Tester',
      password: '123456',
    })
    cy.visit('')
  })

  describe('Login', function () {
    it('Login form is shown', function () {
      cy.contains('Log in')
      cy.contains('username')
      cy.contains('password')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testing_user')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testing_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification-error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Tester logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing_user', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('.newBlogTitleInput').type(testBlogOne.title)
      cy.get('.newBlogAuthorInput').type(testBlogOne.author)
      cy.get('.newBlogUrlInput').type(testBlogOne.url)
      cy.get('.newBlogSubmitButton').click()

      cy.get('.notification-success')
        .should('contain', `A new blog ${testBlogOne.title} by ${testBlogOne.author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('.blogTitleAuthor')
        .should('contain', `${testBlogOne.title} ${testBlogOne.author}`)
    })
  })

  describe('When there\'s a blog', function () {
    beforeEach(function () {
      cy.login({ username: 'testing_user', password: '123456' })
      cy.createBlog(testBlogOne)
    })

    it('Users can like', function () {
      cy.get('.blogViewButton').click()
      cy.get('.blogLikes').should('contain', '0')
      cy.get('.blogLikeButton').click()
      cy.get('.blogLikes').should('contain', '1')
    })

    it('The user who created it can remove it', function () {
      cy.get('.blogViewButton').click()
      cy.get('.blogRemoveButton').click()
      cy.on('window:confirm', () => true);
      cy.get('.notification-success')
        .should('contain', `Removed blog ${testBlogOne.title} by ${testBlogOne.author}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('Other users cannot remove it', function () {
      cy.createUser({
        username: 'another_user',
        name: 'Another',
        password: '123456',
      })
      cy.login({ username: 'another_user', password: '123456' })

      cy.get('.blogViewButton').click()
      cy.get('.blogRemoveButton').should('not.exist')
    })
  })

  describe('When there are many blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'testing_user', password: '123456' })
      cy.createBlog(testBlogOne)
      cy.createBlog(testBlogTwo)
      cy.createBlog(testBlogThree)
    })

    it.only('They are ordered descending by number of likes', function () {
      cy.get('.blog').eq(0).should('contain', 'Another blog for testing')
      cy.get('.blog').eq(1).should('contain', 'And yet another blog for testing')
      cy.get('.blog').eq(2).should('contain', 'New blog for testing')
    })
  })
})