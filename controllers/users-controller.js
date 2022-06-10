const gravatar = require("gravatar");

const {
  signupUser,
  loginUser,
  logoutUser,
  patchFavoriteUser,
  patchAvatar,
} = require("../services/users-service");
const { handleAvatarFile } = require("../services/avatars-service");

const signupUserController = async (req, res, next) => {
  const { body } = req;
  const avatar = gravatar.url(body.email, {
    protocol: "https",
  });
  body.avatarURL = avatar;
  const { email, subscription, avatarURL } = await signupUser(body);
  res.status(201).json({ email, subscription, avatarURL });
};

const loginUserController = async (req, res, next) => {
  const { body } = req;
  const { email, subscription, avatarURL, token } = await loginUser(body);
  res.json({ token, user: { email, subscription, avatarURL } });
};

const logoutUserController = async (req, res, next) => {
  const { userId } = req;
  await logoutUser(userId);
  res.status(204);
};

const refreshUserController = async (req, res, next) => {
  const { user } = req;
  const { email, subscription } = user;
  res.json({ email, subscription });
};

const patchFavoriteUserController = async (req, res, next) => {
  const { userId, body } = req;
  const { subscription: newSubscription } = body;
  const user = await patchFavoriteUser(userId, newSubscription);
  res.json(user);
};

const patchAvatarController = async (req, res, next) => {
  const { userId, file } = req;
  const newAvatar = await handleAvatarFile(file);
  const user = await patchAvatar(userId, newAvatar);
  res.json(user);
};

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
  patchAvatarController,
};
