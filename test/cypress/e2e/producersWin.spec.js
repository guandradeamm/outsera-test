/// <reference types="cypress" />

describe("ProducersWin Component", () => {
  beforeEach(() => {
    cy.visit("/path/to/producers-win");
  });

  it("should display loading message when data is being fetched", () => {
    cy.contains("Loading...").should("be.visible");
  });

  it("should display error message if data fails to load", () => {
    cy.intercept("GET", "/path/to/api", { statusCode: 500 });
    cy.reload();
    cy.contains("Error loading data.").should("be.visible");
  });

  it("should display data grid with 'Maximum' producers data", () => {
    cy.contains("Maximum").should("be.visible");
    cy.get(".dx-datagrid-headers").should("be.visible");
  });

  it("should display data grid with 'Minimum' producers data", () => {
    cy.contains("Minimum").should("be.visible");
    cy.get(".dx-datagrid-headers").should("be.visible");
  });

  it("should render the columns with centered alignment", () => {
    cy.get(".dx-datagrid-content").within(() => {
      maxColumns.forEach((column) => {
        cy.get(
          `.dx-datagrid-text-content:contains("${column.caption}")`
        ).should("have.css", "text-align", "center");
      });

      minColumns.forEach((column) => {
        cy.get(
          `.dx-datagrid-text-content:contains("${column.caption}")`
        ).should("have.css", "text-align", "center");
      });
    });
  });
});
