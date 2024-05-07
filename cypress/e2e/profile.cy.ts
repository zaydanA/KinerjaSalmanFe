describe("Application test", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="profile-button"]').click()
    cy.get('[data-cy="profile-detail-button"]').click()
  });

  it("should show personal data", () => {
    cy.contains("Personal Data")
    cy.contains("Full Name");
    cy.contains("Mobile Phone");
    cy.contains("Email");
    cy.contains("Place of Birth");
    cy.contains("Birthdate");
    cy.contains("Gender");
    cy.contains("Marital Status");
    cy.contains("Last Education");
    cy.contains("Blood Type");
  })
})