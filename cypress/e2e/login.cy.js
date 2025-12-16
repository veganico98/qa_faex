describe('Cenário de Teste: Login na Aplicação', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve ser capaz de logar com credenciais válidas', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

  });
});