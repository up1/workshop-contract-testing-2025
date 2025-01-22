const request = require("supertest");
const { server, importData } = require("../provider");
const movies = require("../../data/movies.json");
const { Validator } = require("jsonschema");
const schema = require("../../schemas/movieSchema");

describe("GET empty", () => {
  test("/movies", async () => {
    await request(server)
      .get("/movies")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject([]);
      });
  });

  test("/movies with jsonschema", async () => {
    const validator = new Validator();

    await request(server)
      .get("/movies")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        const validationResult = validator.validate(res.body, schema.moviesSchema);
        expect(validationResult.errors).toHaveLength(0);
      });
  });

  test("/movie/:id not found", async () => {
    await request(server)
      .get("/movie/100")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body).toMatchObject({});
      });
  });

});

describe("GET data", () => {
  beforeEach(() => {
    importData();
  });

  test("/movies", async () => {
    await request(server)
      .get("/movies")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toMatchObject(movies[0]);
        expect(res.body).toStrictEqual(movies);
      });
  });

  test("/movie/:id not found", async () => {
    await request(server)
      .get("/movie/100")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body.error).toBe("Movie not found");
      });
  });

  test("/movie/:id success", async () => {
    await request(server)
      .get("/movie/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toStrictEqual(movies[0]);
      });
  });

  test("/movie/:id success with jsonschema", async () => {
    const validator = new Validator();

    await request(server)
      .get("/movie/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        const validationResult = validator.validate(res.body, schema.movieSchema);
        expect(validationResult.errors).toHaveLength(0);
      });
  });
});
