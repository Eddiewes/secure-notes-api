const request = require("supertest");
const app = require("../src/app");

let token;

beforeAll(async () => {
  await request(app).post("/register").send({ email: "user2@test.com", password: "123456" });
  const res = await request(app).post("/login").send({ email: "user2@test.com", password: "123456" });
  token = res.body.token;
});

describe("Notes Endpoints", () => {
  test("Create note", async () => {
    const res = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Test note" });
    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe("Test note");
  });

  test("View notes", async () => {
    const res = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Update note", async () => {
    const res1 = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);
    const noteId = res1.body[0].id;

    const res2 = await request(app)
      .put(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Updated note" });
    expect(res2.body.content).toBe("Updated note");
  });

  test("Delete note", async () => {
    const res1 = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);
    const noteId = res1.body[0].id;

    const res2 = await request(app)
      .delete(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res2.body.message).toBe("Note deleted");
  });

  test("Health endpoint", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});