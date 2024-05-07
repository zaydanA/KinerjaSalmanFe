describe("Employee page", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="navbar-employee"]').click();
  });

  it("should go to add employee page", () => {
    cy.get('[data-cy="button-add-employee"]').click();
  
    // Wait for the URL to include '/employee/add'
    cy.url().should("include", "/employee/add");
  });
  

  it("should type in search bar", () => {
    cy.get('[data-cy="search-bar-search-employees.."]').type("s");
    cy.url().should("include", "/employee?search=");
  });

  it("should go to employee details", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("open");
    });
    cy.get('[data-cy="table-edit-button"]').first().click();
    cy.get("@open").should("have.been.calledWithMatch", /employee\/\d+/);
  });
});
