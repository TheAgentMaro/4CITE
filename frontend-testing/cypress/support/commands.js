// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command pour la connexion
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid=email]').type(email)
  cy.get('[data-testid=password]').type(password)
  cy.get('[data-testid=submit]').click()
})

// Custom command pour vider le panier
Cypress.Commands.add('clearCart', () => {
  cy.clearLocalStorage('cart')
})

// Custom command pour ajouter un produit au panier
Cypress.Commands.add('addToCart', (productId) => {
  cy.get(`[data-testid=add-to-cart-${productId}]`).click()
})

// Custom command pour vérifier le total du panier
Cypress.Commands.add('verifyCartTotal', (expectedTotal) => {
  cy.get('[data-testid=cart-total]').should('contain', `$${expectedTotal}`)
})
