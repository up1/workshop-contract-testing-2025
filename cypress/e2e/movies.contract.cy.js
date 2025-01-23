describe("Movies", () => {
  before(() => {
    cy.setupPact("UIConsumer", "MoviesAPI");
    cy.intercept("http://localhost:3000/movie/1", {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: { id: 1, name: "The Shawshank Redemption", year: 1994 },
    }).as("movies");
  });

  it("Movies list", () => {
    cy.visit("/");
    cy.usePactWait("movies").its("response.statusCode").should("eq", 200);
    cy.contains("The Shawshank Redemption").should("be.visible");
  });
});
