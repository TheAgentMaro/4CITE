describe('E2E Shopping Flow', () => {
  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    cy.clearLocalStorage();
  });

  it('should complete full shopping flow from registration to payment', () => {
    // 1. Register
    cy.visit('/register');
    cy.get('[data-testid=register-email]').type('test@example.com');
    cy.get('[data-testid=register-password]').type('Password123!');
    cy.get('[data-testid=register-confirm-password]').type('Password123!');
    cy.get('[data-testid=register-firstname]').type('John');
    cy.get('[data-testid=register-lastname]').type('Doe');
    cy.get('[data-testid=register-submit]').click();

    // 2. Shop - Add multiple items
    cy.url().should('include', '/shop');
    
    // Add Product 1 twice
    cy.get('[data-testid=add-to-cart-1]').click();
    cy.get('[data-testid=add-to-cart-1]').click();
    
    // Add Product 2 once
    cy.get('[data-testid=add-to-cart-2]').click();
    
    // Verify cart
    cy.get('[data-testid=cart]').within(() => {
      cy.get('[data-testid=cart-item-1]').should('have.length', 2);
      cy.get('[data-testid=cart-item-2]').should('have.length', 1);
    });

    // Verify total price
    cy.get('[data-testid=cart-total]').should('contain', '$40'); // (2 * $10) + (1 * $20)

    // 3. Proceed to Checkout
    cy.get('[data-testid=checkout-button]').click();
    cy.url().should('include', '/checkout');

    // 4. Fill payment details and complete purchase
    cy.get('[data-testid=card-number]').type('4111111111111111');
    cy.get('[data-testid=expiry-date]').type('12/25');
    cy.get('[data-testid=cvv]').type('123');

    // Verify order summary
    cy.get('[data-testid=order-summary]').within(() => {
      cy.get('[data-testid=checkout-item-1]').should('have.length', 2);
      cy.get('[data-testid=checkout-item-2]').should('have.length', 1);
      cy.get('[data-testid=checkout-total]').should('contain', '$40');
    });

    // Complete payment
    cy.get('[data-testid=submit-payment]').click();

    // 5. Verify redirect to confirmation
    cy.url().should('include', '/confirmation');
  });

  it('should validate form fields during registration', () => {
    cy.visit('/register');
    
    // Try to submit empty form
    cy.get('[data-testid=register-submit]').click();
    
    // Verify form validation
    cy.get('[data-testid=register-email]').should('have.attr', 'required');
    cy.get('[data-testid=register-password]').should('have.attr', 'required');
    
    // Fill invalid email
    cy.get('[data-testid=register-email]').type('invalid-email');
    cy.get('[data-testid=register-submit]').click();
    cy.url().should('include', '/register'); // Should stay on register page
  });

  it('should validate payment details', () => {
    // Setup cart with an item
    cy.visit('/shop');
    cy.get('[data-testid=add-to-cart-1]').click();
    cy.get('[data-testid=checkout-button]').click();
    
    // Try invalid card number
    cy.get('[data-testid=card-number]').type('1234');
    cy.get('[data-testid=submit-payment]').click();
    cy.url().should('include', '/checkout'); // Should stay on checkout page
    
    // Try invalid expiry date
    cy.get('[data-testid=card-number]').clear().type('4111111111111111');
    cy.get('[data-testid=expiry-date]').type('13/25'); // Invalid month
    cy.get('[data-testid=submit-payment]').click();
    cy.url().should('include', '/checkout');
  });
});
