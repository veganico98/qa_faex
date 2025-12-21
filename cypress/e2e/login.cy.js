describe('Cenário de Teste: Login na Aplicação', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve ser capaz de bloquear um acesso com o usuário incorreto e a senha correta', () => {
    cy.get('[data-test="username"]').type('nicolas');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.get('h3[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Username and password do not match any user');
    cy.wait(2000);
    cy.get('[data-test="error-button"]').click();
  });

  it('Deve ser capaz de bloquear um acesso com usuário correto e a senha incorreta', () => {
    cy.get('[data-test="username"]').type('secret_sauce');
    cy.get('[data-test="password"]').type('1234');
    cy.get('[data-test="login-button"]').click();
    cy.get('h3[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Username and password do not match any user');
    cy.wait(2000);
    cy.get('[data-test="error-button"]').click();
  });

  it('Deve ser capaz de logar com credenciais válidas', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('[id="react-burger-menu-btn"]').click();
    cy.wait(2000);
    cy.get('[data-test="logout-sidebar-link"]').click();
  });
});
