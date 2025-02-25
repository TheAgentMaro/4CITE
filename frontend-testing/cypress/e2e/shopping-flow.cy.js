describe('E2E Shopping Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept('GET', '**').as('pageLoad');
  });

  it('should complete full shopping flow from registration to payment', () => {
    // 1. Register
    cy.visit('/register', { timeout: 120000 });
    cy.wait('@pageLoad');
    
    // Vérifier que le formulaire est chargé
    cy.get('form', { timeout: 10000 }).should('be.visible');
    
    // Remplir le formulaire
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    
    // Soumettre et attendre la redirection
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/shop');

    // 2. Shop - Add multiple items
    cy.get('.shop-page', { timeout: 10000 }).should('be.visible');
    
    // Add items to cart
    cy.get('.product-item').first().find('.add-to-cart').click();
    cy.get('.product-item').first().find('.add-to-cart').click();
    cy.get('.product-item').eq(1).find('.add-to-cart').click();
    
    // Verify cart
    cy.get('.cart', { timeout: 10000 }).within(() => {
      cy.get('.cart-item').should('have.length', 3);
    });

    // 3. Proceed to Checkout
    cy.get('.checkout-button').click();
    cy.url().should('include', '/checkout');

    // 4. Fill payment details
    cy.get('.checkout-page', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="cardName"]').type('John Doe');
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');

    // Complete payment
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/confirmation', { timeout: 10000 });
  });

  it('should validate form fields during registration', () => {
    cy.visit('/register', { timeout: 120000 });
    cy.wait('@pageLoad');
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Verify form validation
    cy.get('input[name="email"]').should('have.class', 'error');
    cy.get('.error-message').should('be.visible');
  });

  it('should validate payment details', () => {
    cy.visit('/shop', { timeout: 120000 });
    cy.wait('@pageLoad');
    
    // Add item and go to checkout
    cy.get('.product-item').first().find('.add-to-cart').click();
    cy.get('.checkout-button').click();
    
    // Try invalid card details
    cy.get('input[name="cardNumber"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });
});
