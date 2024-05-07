describe("show login page", () => {
  it("should show login page", () => {
    cy.visit("/");
    cy.get('[data-cy="email-input"]').should("exist");
    cy.get('[data-cy="password-input"]').should("exist");
  });
});

describe("show invalid credentials", () => {
  it("should show invalid credentials message", () => {
    cy.visit("/");
    cy.get('[data-cy="email-input"]').type("director@salmanitb.com");
    cy.get('[data-cy="password-input"]').type("direct");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="error-info"]').should("exist");
  });
});

describe("show dashboard", () => {
  it("should redirect to dashboard page", () => {
    cy.visit("/");
    cy.get('[data-cy="email-input"]').type("director@salmanitb.com");
    cy.get('[data-cy="password-input"]').type("director");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});