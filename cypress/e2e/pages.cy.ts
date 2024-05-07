describe("Pages", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should display dashboard page", () => {
    cy.visit("/dashboard");
    cy.contains("My Attendance Status");
  });

  it("should display employee page", () => {
    cy.visit("/employee");
    cy.contains("List of Employees");
  });

  it("should display employee hierarchy page", () => {
    cy.visit("/organizationstructure");
    cy.contains("Salman Hierarchy");
  });

  it("should display self payroll page", () => {
    cy.visit("/my-payroll");
    cy.contains("My Payroll History");
  });

  it("should display employees payroll page", () => {
    cy.visit("/payroll");
    cy.contains("Employee's Payroll");
  });

  it("should display live attendance page", () => {
    cy.visit("/live-attendance");
    cy.contains("Live Attendance");
  });

  it("should display applications page", () => {
    cy.visit("/applications");
    cy.contains("Applications List");
  });

  it("should display employee hierarchy page", () => {
    cy.visit("/organizationstructure");
    cy.contains("Salman Hierarchy");
  });

  it("should display time-off page", () => {
    cy.visit("/apply");
    cy.contains("Application Form");
  });

  it("should display evaluatin page", () => {
    cy.visit("/evaluation");
    cy.contains("Evaluation");
  });

  it("should display self profile page", () => {
    cy.get('[data-cy="profile-button"]').click()
    cy.get('[data-cy="profile-detail-button"]').click()
    cy.contains("Personal")
  })

  it("should display account setting page", () => {
    cy.get('[data-cy="profile-button"]').click()
    cy.get('[data-cy="account-setting-button"]').click()
    cy.contains("Reset Password")
  })

  it("should logout", () => {
    cy.get('[data-cy="profile-button"]').click()
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]').should("exist");
  })
});
