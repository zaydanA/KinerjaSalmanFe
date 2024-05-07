describe('My payroll test', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="navbar-my-payroll"]').click();
  });

  it("should go to my payroll details", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("open");
    });
    cy.get('[data-cy="table-open-button"]').first().click();
    cy.get("@open").should("have.been.calledWithMatch", /my-payroll\/\d+\/items\/\d{4}-\d{2}/);
  });
})