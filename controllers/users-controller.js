const {
  signupUser,
  loginUser,
  logoutUser,
  refreshUser,
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
  res.status(204).json({});
};

const refreshUserController = async (req, res, next) => {
  const { userId } = req;
  const { email, subscription } = await refreshUser(userId);
  res.json({ email, subscription });
};

const patchFavoriteUserController = async (req, res, next) => {
  const { userId, body } = req;
  const { subscription: newSubscription } = body;
  const { email, subscription } = await patchFavoriteUser(
    userId,
    newSubscription
  );
  res.json({ email, subscription });
};

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
};
