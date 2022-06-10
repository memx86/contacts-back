const {
  signupUser,
  loginUser,
  logoutUser,
  patchFavoriteUser,
} = require("../services/users-service");

const signupUserController = async (req, res, next) => {
  const { body } = req;
  const { email, subscription } = await signupUser(body);
  res.status(201).json({ email, subscription });
};

const loginUserController = async (req, res, next) => {
  const { body } = req;
  const { email, subscription, token } = await loginUser(body);
  res.json({ token, user: { email, subscription } });
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

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
};
