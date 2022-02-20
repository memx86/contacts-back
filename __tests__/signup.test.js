const gravatar = require("gravatar");
const { signupUserController } = require("../controllers/users-controller");
const userService = require("../services/users-service");

describe("Signup controller unit test", () => {
  it("should add avatar property to body and call res.status(201)", async () => {
    const mReq = {
      body: {
        email: "email@mail.com",
      },
    };
    const avatar = gravatar.url(mReq.body.email, {
      protocol: "https",
    });
    const mRes = jest.fn();
    mRes.status = jest.fn();
    mRes.status.json = jest.fn();
    const mNext = {};

    const mBody = {
      email: mReq.body.email,
      subscription: "starter",
      avatarURL: avatar,
    };

    jest
      .spyOn(userService, "signupUser")
      .mockImplementationOnce(async () => mBody);
    await signupUserController(mReq, mRes, mNext);
    expect(mReq.body.avatar).toEqual(avatar);
    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.status.json).toHaveBeenCalledWith({
      email: mBody.email,
      subscription: mBody.subscription,
      avatar: mBody.avatarURL,
    });
  });
});
