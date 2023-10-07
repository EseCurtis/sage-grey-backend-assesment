const request = require("supertest");
const app = require("../src/App");

const testUser = {
  username: "test_user1-username--create-user-"+Date.now(),
  password: "test_user1-password--create-user",
  balance: 0,
}

describe("POST /api/user", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe(testUser.username);
  });
});