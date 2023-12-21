Cypress.Commands.add('resetTest', () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})

Cypress.Commands.add('login', (credentials) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, credentials)
        .then(({ body }) => {
            localStorage.setItem('loggedBlogUser', JSON.stringify(body))
            cy.visit('')
        })
})

Cypress.Commands.add('createUser', (user) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
})

Cypress.Commands.add('createBlog', (blog) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('BACKEND')}/blogs`,
        body: blog,
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
        }
    }).then(() => cy.visit(''))
})