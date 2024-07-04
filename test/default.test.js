const request = require("supertest");
const app = require("../src/app");

describe("Defalt Routes", () => {
  test("/ should work", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("/api/v1/health should work", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
