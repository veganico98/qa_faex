describe('Cenário de Teste: Login na Aplicação', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

    it('Deve ser capaz de realizar todo o processo de compra', () => {
        //Realizando login válido
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        //Entrando em determinado item e adicionando ao carrinho
        cy.url().should("include", "/inventory.html");
        cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').click();
        cy.url().should("include",'/inventory-item.html?id=4');
        cy.get('[data-test="add-to-cart"]').click();

        //Entrando no carrinho e validando o item adicionado
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should("include", "/cart.htm");
        cy.get('[data-test="item-quantity"]').should('be.visible').and('contain.text', "1")

        //prosseguindo com a compra
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');
        cy.get('[data-test="firstName"]').type('Nicolas');
        cy.get('[name="lastName"]').type('Linares');
        cy.get('[data-test="postalCode"]').type('1234-000');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.wait(2000);
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should("include", "/inventory.html");

        //Logout pelo site
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.wait(2000);
        cy.get('[data-test="logout-sidebar-link"]').click();
    });
});