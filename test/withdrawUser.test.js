const request = require("supertest");
const app = require("../src/App");

let testUser = {
    username: "test_user1-username--withdraw-user-"+Date.now(),
    password: "test_user1-password--withdraw-user",
    balance: 0,
};

let userId;
let authToken;

describe("User Deposit withdrawal Flow", () => {
    it("should create a new user account", async () => {
        const res = await request(app).post("/api/users").send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe(testUser.username);

        // Store the user ID for future use
        userId = res.body.insertedId;
    });

    it("should generate user authorization token", async () => {
        const res = await request(app).post("/api/authenticate").send({
            username: testUser.username,
            password: testUser.password,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeTruthy();

        // Store the authorization token for future use
        authToken = res.body.token;
    });

    it("should fetch user data by ID with authorization", async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set("Authorization", authToken);

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe(testUser.username);

        testUser = res.body
    });

    it("should withdraw from 200 units user account", async () => {
        const withdrawAmount = 200;

        const res = await request(app)
            .post(`/api/users/withdraw`)
            .set("Authorization", authToken)
            .send({
                id: userId,
                amount: withdrawAmount
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.balance).toBe(testUser.balance + withdrawAmount);
    });
});
