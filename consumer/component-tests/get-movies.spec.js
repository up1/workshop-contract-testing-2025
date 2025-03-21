const consumer = require("../consumer");
const nock = require("nock");

describe("Success case", () => {
  test("/fetchMovies with 2 items", async () => {
    // Arrange
    nock("http://localhost:3000")
      .get("/movies")
      .reply(200, [
        { id: 1, name: "Movie 1", year: 2020 },
        { id: 2, name: "Movie 2", year: 2021 },
      ]);

    const result = await consumer.fetchMovies("http://localhost:3000");
    expect(result).toEqual([
      { id: 1, name: "Movie 1", year: 2020 },
      { id: 2, name: "Movie 2", year: 2021 },
    ]);
  });
});

describe("Failure case", () => {
  test("/fetchMovies with code = 404", async () => {
    nock("http://localhost:3000").get("/movies").reply(404);
    const result = await consumer.fetchMovies("http://localhost:3000");
    expect(result.status).toEqual(404);
    expect(result.statusText).toEqual("Not Found");
  });

  test("/fetchMovies with code = 500", async () => {
    nock("http://localhost:3000").get("/movies").reply(500);
    const result = await consumer.fetchMovies("http://localhost:3000");
    expect(result.status).toEqual(500);
    expect(result.statusText).toEqual("Internal Server Error");
  });
});
