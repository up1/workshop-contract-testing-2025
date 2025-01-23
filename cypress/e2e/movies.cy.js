describe("Movies", () => {
  before(() => {
    cy.setupPact("UIConsumer", "MoviesAPI");
    cy.intercept("http://localhost:3000/movie/1", {
      statusCode: 200,
      body: { id: 1, name: "Finding nemo", year: 2003 },
    }).as("movies");
  });

  it("Movies list", () => {
    cy.visit("/");
    cy.usePactWait("movies").its("response.statusCode").should("eq", 200);
    cy.contains("Finding nemo").should("be.visible");
  });
});
