/// <reference types="cypress" />

describe("MovieByYear Component", () => {
  beforeEach(() => {
    cy.visit("/path/to/movie-by-year");
  });

  it("should display loading message when data is being fetched", () => {
    cy.contains("Loading...").should("be.visible");
  });

  it("should display error message if data fails to load", () => {
    cy.intercept("GET", "/path/to/api", { statusCode: 500 });
    cy.reload();
    cy.contains("Error loading data.").should("be.visible");
  });

  it("should display filtered data after entering a valid year", () => {
    cy.get("input[type='number']").type("2020");
    cy.get("button").contains("Search").click();

    cy.contains("Filtered Data by Year").should("be.visible");
    cy.get(".dx-datagrid-headers").should("be.visible");

    cy.get(".dx-datagrid-row").should("have.length.greaterThan", 0);
  });

  it("should display no data message if no movies found for the selected year", () => {
    cy.get("input[type='number']").type("1900");
    cy.get("button").contains("Search").click();

    cy.contains("No data to display").should("be.visible");
  });

  it("should render the columns with correct alignment", () => {
    cy.get(".dx-datagrid-content").within(() => {
      movieByYearColumns.forEach((column) => {
        cy.get(
          `.dx-datagrid-text-content:contains("${column.caption}")`
        ).should("have.css", "text-align", column.alignment);
      });
    });
  });

  it("should render the DataGrid and show proper headers", () => {
    cy.contains("Filtered Data by Year").should("be.visible");
    cy.get(".dx-datagrid-headers").should("be.visible");
  });
});
