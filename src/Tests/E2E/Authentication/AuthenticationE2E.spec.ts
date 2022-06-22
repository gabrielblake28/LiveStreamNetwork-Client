import cypress from "cypress";

describe("Authentication e2e test suite", () => {
  it("Should log a user in successfully", () => {
    cy.visit("http://localhost:3000");

    const element = cy.get(".top-nav-user-avatar").first();

    element.click();

    cy.url().should("include", "https://www.twitch.tv/login");

    cy.get('[aria-label="Enter your username"]').first().type("twetest");
    cy.get('[aria-label="Enter your password"]')
      .first()
      .type("asdftwefrontend123");

    cy.get('[data-a-target="passport-login-button"]').click();
    cy.url().should("include", "http://localhost:3000/");

    element.click();

    cy.url().should("include", "http://localhost:3000/");

    expect(cy.get("MuiList-root")).to.not.equal(null);

    cy.get(".MuiMenuItem-root").last().click();
  });
});

export {};
