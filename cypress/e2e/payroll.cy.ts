describe('Payroll test', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="navbar-payroll"]').click();
  });

  it("should open run payroll modal", () => {
    cy.get('[data-cy="button-run-payroll"]').click();
    cy.contains("Payroll Period")
    cy.get('[data-cy="date-input"]').click()
    cy.contains("Payroll Period")
  })

  it("should go to payroll details", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("open");
    });
    cy.get('[data-cy="table-open-button"]').first().click();
    cy.get("@open").should("have.been.calledWithMatch", /payroll\/\d{4}-\d{2}/);
  });

  // it("should go to payroll review", () => {
  //   let newUrl: string = '';
  //   cy.window().then((win) => {
  //     cy.stub(win, "open").as("open").callsFake(url => {
  //       newUrl = url
  //     });
  //   });
  //   cy.get('[data-cy="table-open-button"]').first().click();
  //   cy.visit(newUrl)
  //   cy.get('[data-cy="search-bar-search-employees.."]').type("s");
  //   cy.url().should("include", /payroll\/\d{4}-\d{2}/ + "?search=");
  // });
})