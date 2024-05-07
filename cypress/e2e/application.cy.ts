describe('Application test', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="navbar-applications"]').click();
  });

  it("should go to leave tab", () => {
    cy.get('[data-cy="leave-application-tab"]').click();
  });

  it("should go to duty tab", () => {
    cy.get('[data-cy="duty-application-tab"]').click();
  });

  it("should show application details", () => {
    cy.get('[data-cy="application-container"]').first().click();
    cy.contains("Application Details")
    cy.contains("Application ID")
    cy.contains("Name")
    cy.contains("Start Date")
    cy.contains("End Date")
    cy.contains("Type")
    cy.contains("Close")
  })
})