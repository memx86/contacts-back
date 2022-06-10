const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { User } = require("../db/models/usersModel");

const PORT = process.env.PORT || 3000;
const TEST_MONGO_URL = process.env.TEST_MONGO_URL;

describe("login controller unit test", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_MONGO_URL).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("should return status 200, token and user object with email and subscription", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "123456",
    };

    const { _id } = await User.create(newUser);

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;
    const { token, email, subscription } = await User.findById(_id);

    expect(response.statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.token).toBe(token);
    expect(body.user).toBeDefined();
    expect(body.user).toEqual(
      expect.objectContaining({
        email,
        subscription,
      })
    );
  });
});
