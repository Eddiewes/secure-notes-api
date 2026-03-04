const request = require("supertest");
const app = require("../src/app");

describe("Auth Endpoints", () => {
  test("Register user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(201);
  });

  test("Login user", async () => {
    await request(app)
      .post("/register")
      .send({ email: "login@test.com", password: "123456" });

    const res = await request(app)
      .post("/login")
      .send({ email: "login@test.com", password: "123456" });

    expect(res.body.token).toBeDefined();
  });
});