describe('Cenário de Teste: Login na Aplicação', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

    it('Deve ser capaz de incluir itens no carrinho e validar se foram inclusos', () => {
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
    });
});