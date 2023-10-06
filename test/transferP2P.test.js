const request = require("supertest");
const app = require("../src/App");

let testUser = {
    username: "test_user1-username--trasfer-p2p",
    password: "test_user1-password--trasfer-p2p",
    balance: 140,
};

let testUser2 = {
    username: "test_user2-username--trasfer-p2p",
    password: "test_user2-password--trasfer-p2p",
    balance: 100,
};

describe("User Deposit Fund Flow", () => {
    it("should create a new user1 account", async () => {
        const res = await request(app).post("/api/users").send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe(testUser.username);

        // Store the user ID for future use
        testUser.userId = res.body.insertedId;
    });

    it("should create a new user2 account", async () => {
        const res = await request(app).post("/api/users").send(testUser2);

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe(testUser2.username);

        // Store the user ID for future use
        testUser2.userId = res.body.insertedId;
    });

    it("should generate user1 authorization token", async () => {
        const res = await request(app).post("/api/authenticate").send({
            username: testUser.username,
            password: testUser.password,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeTruthy();

        // Store the authorization token for future use
        testUser.authToken = res.body.token;
    });

    it("should generate user2 authorization token", async () => {
        const res = await request(app).post("/api/authenticate").send({
            username: testUser2.username,
            password: testUser2.password,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeTruthy();

        // Store the authorization token for future use
        testUser2.authToken = res.body.token;
    });

    it("should fetch user1 data by ID with authorization", async () => {
        const res = await request(app)
            .get(`/api/users/${testUser.userId}`)
            .set("Authorization", testUser.authToken);

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe(testUser.username);

        testUser = { ...testUser, ...res.body }
    });

    it("should fetch user1 data by ID with authorization", async () => {
        const res = await request(app)
            .get(`/api/users/${testUser2.userId}`)
            .set("Authorization", testUser2.authToken);

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe(testUser2.username);

        testUser2 = { ...testUser2, ...res.body }
    });

    it("should transfer 20 units from user1 account to user2 account", async () => {
        const transferAmount = 20;

        const res = await request(app)
            .post(`/api/transactions/transfer`)
            .set("Authorization", testUser2.authToken)
            .send({
                senderId: testUser._id,
                receiverId: testUser2._id,
                amount: transferAmount
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Funds transferred successfully");
    });
});
