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

  it("status 200, token and user object with email and subscription", async () => {
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

  it("empty user, status 400, 'Missing required fields'", async () => {
    const newUser = {};

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Missing required fields");
  });

  it("no password, status 400, 'Missing required fields'", async () => {
    const newUser = {
      email: "test@mail.com",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Missing required fields");
  });

  it("no email, status 400, 'Missing required fields'", async () => {
    const newUser = {
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Missing required fields");
  });

  it('extra field, status 400, "extra" is not allowed', async () => {
    const newUser = {
      email: "test@mail.com",
      password: "123456",
      extra: 123,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"extra" is not allowed');
  });

  it("wrong email 123 , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: 123,
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("wrong email false , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: false,
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("wrong email {} , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: {},
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("wrong email [] , status 400, '\"email\" must be a string'", async () => {
    const newUser = {
      email: [],
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"email" must be a string');
  });

  it("wrong password 123456 , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: 123456,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("wrong password false , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: false,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("wrong password {} , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: {},
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("wrong password [] , status 400, '\"password\" must be a string'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: [],
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe('"password" must be a string');
  });

  it("no such email in base, status 401, Email or password is wrong", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  it("wrong password, status 401, Email or password is wrong", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "123456",
    };
    await User.create(newUser);

    const wrongUser = {
      ...newUser,
      password: "1234567",
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(wrongUser);
    const { body } = response;

    expect(response.statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });
});
