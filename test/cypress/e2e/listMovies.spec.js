/// <reference types="cypress" />

describe("ListMovies Component", () => {
  beforeEach(() => {
    cy.visit("/path/to/list-movies");
  });

  it("should load the data grid with initial data", () => {
    cy.contains("List Movies").should("be.visible");

    cy.get(".dx-datagrid-headers")
      .should("be.visible")
      .within(() => {
        cy.contains("Name").should("be.visible");
      });
  });

  it("should filter by year and winner status", () => {
    cy.get('input[label="Year"]').type("2000");
    cy.get('select[label="Winner"]').select("Yes");
    cy.contains("Search").click();

    cy.get(".dx-datagrid-rowsview").within(() => {
      cy.get(".dx-row").each(($row) => {
        cy.wrap($row).contains("2000");
        cy.wrap($row).contains("Yes");
      });
    });
  });

  it("should change pages and update the page content", () => {
    cy.get(".dx-page-size").select("10");
    cy.get(".dx-page").contains("2").click();

    cy.get(".dx-datagrid-rowsview").within(() => {
      cy.get(".dx-row").should("have.length", 10);
    });
  });

  it("should update the URL with query params when filters are applied", () => {
    cy.get('input[label="Year"]').type("2001");
    cy.get('select[label="Winner"]').select("No");
    cy.contains("Search").click();

    cy.url().should("include", "year=2001");
    cy.url().should("include", "winner=false");
  });
});
