/// <reference types="cypress" />

describe("StudiosWithWinners Component", () => {
  beforeEach(() => {
    cy.visit("/path/to/studios-with-winners");
  });

  it("should display loading message when data is being fetched", () => {
    cy.contains("Loading...").should("be.visible");
  });

  it("should display error message if data fails to load", () => {
    cy.intercept("GET", "/path/to/api", { statusCode: 500 });
    cy.reload();
    cy.contains("Error loading data.").should("be.visible");
  });

  it("should display correct title with studio count", () => {
    cy.intercept("GET", "/path/to/api", {
      statusCode: 200,
      body: { data: { studios: Array(5).fill({}) } },
    });

    cy.reload();

    cy.contains("Top 5 studios with winners").should("be.visible");
  });

  it("should display the DataGrid with correct columns", () => {
    cy.intercept("GET", "/path/to/api", {
      statusCode: 200,
      body: { data: { studios: [{ id: 1, name: "Studio A", wins: 5 }] } },
    });

    cy.reload();

    cy.get(".dx-datagrid-headers").should("be.visible");
    cy.get(".dx-datagrid-row").should("have.length.greaterThan", 0);
  });

  it("should handle empty data gracefully", () => {
    cy.intercept("GET", "/path/to/api", {
      statusCode: 200,
      body: { data: { studios: [] } },
    });

    cy.reload();

    cy.contains("Top 0 studios with winners").should("be.visible");
    cy.contains("No data to display").should("be.visible");
  });
});
