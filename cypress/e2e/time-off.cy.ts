describe("Application test", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="navbar-time-off"]').click();
  });

  it("should change type of application form", () => {
    cy.get('[data-cy="leave-radio-button"]').click();
    cy.get('[data-cy="duty-radio-button"]').click();
  });

  it("should show error on empty form", () => {
    cy.get('[data-cy="button-submit"]').click();
    cy.get('[data-cy="input-text-error"]').should('exist')
  })
});
