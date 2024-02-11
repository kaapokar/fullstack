describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {      
      name: 'Kuapo Karpi',      
      username: 'kuap',      
      password: 'bana'    
    }    
    const user2 = {      
      name: 'Kuapo',      
      username: 'kua',      
      password: 'ban'    
    }  
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    cy.visit('http://localhost:5173')
    it('Login form is shown', function() {s
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('kuap')
      cy.get('#password').type('bana')
      cy.get('#login-button').click()
      cy.contains('kuap logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('kaup')
      cy.get('#password').type('justhiinsa')
      cy.get('#login-button').click()
      cy.get('#error').should('contain', 'wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('kuap')
        cy.get('#password').type('bana')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkampf')
        cy.get('#author').type('Hutler')
        cy.get('#url').type('www.dot.com')
        cy.contains('create').click()
        cy.contains('Meinkampf')
      })

      it('A blog can be liked', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkampf')
        cy.get('#author').type('Hutler')
        cy.get('#url').type('www.dot.com')
        cy.contains('create').click()


        cy.contains('Meinkampf')
        cy.contains('view').click()
        cy.contains('0')
        cy.get('#likeButton').click()
        cy.contains('1')
      })

      it('A blog can be deleted', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkampf')
        cy.get('#author').type('Hutler')
        cy.get('#url').type('www.dot.com')
        cy.contains('create').click()
        cy.contains('Meinkampf')
        cy.contains('view').click()
        cy.get('#deleteButton').click()
        cy.reload()
        cy.contains('Meinkampf').should('not.exist')
      })

      it('Only owner of the the blog can delete', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkampf')
        cy.get('#author').type('Hutler')
        cy.get('#url').type('www.dot.com')
        cy.contains('create').click()
        cy.contains('Meinkampf')
        cy.contains('logout').click()
        cy.contains('login').click()
        cy.get('#username').type('kua')
        cy.get('#password').type('ban')
        cy.get('#login-button').click()
        cy.contains('Meinkampf')
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })
      
      it('Blogs in order by likes', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkampf')
        cy.get('#author').type('Hutler')
        cy.get('#url').type('www.dot.com')
        cy.contains('create').click()
        cy.contains('view').click()
        cy.get('#likeButton').click()

        cy.contains('new Blog').click()
        cy.get('#title').type('Meinkamp')
        cy.get('#author').type('Hutlr')
        cy.get('#url').type('www.do.com')
        cy.contains('create').click()
        cy.contains('view').click()

        cy.get('.blog:last-child #likeButton').invoke('text').then((initialLikes) => {
          cy.get('.blog:last-child #likeButton').click()
          cy.get('.blog:last-child #likeButton').click()
          cy.get('.blog:last-child #likeButton').click()
          cy.get('.blog:last-child #likeButton').click()
        })
        cy.reload()
      })
    })
  })
})