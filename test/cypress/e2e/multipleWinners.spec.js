/// <reference types="cypress" />

describe("MultipleWinners Component", () => {
  beforeEach(() => {
    cy.visit("/path/to/multiple-winners");
  });

  it("should display loading message when data is being fetched", () => {
    cy.contains("Loading...").should("be.visible");
  });

  it("should display error message if data fails to load", () => {
    cy.intercept("GET", "/path/to/api", { statusCode: 500 });
    cy.reload();
    cy.contains("Error loading data.").should("be.visible");
  });

  it("should display data grid with multiple winners data", () => {
    cy.get("#dashboard").within(() => {
      cy.get(".dx-datagrid-headers").should("be.visible");
    });

    cy.contains("List years with multiple winners").should("be.visible");
  });

  it("should render the columns with centered alignment", () => {
    multipleColumns.forEach((column) => {
      cy.get(".dx-datagrid-content").within(() => {
        cy.get(
          `.dx-datagrid-text-content:contains("${column.caption}")`
        ).should("have.css", "text-align", "center");
      });
    });
  });
});
