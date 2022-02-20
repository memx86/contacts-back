const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();
const {
  signupUser,
  verifyUser,
  reVerifyUser,
  loginUser,
  logoutUser,
  refreshUser,
  patchFavoriteUser,
  patchAvatar,
} = require("../services/users-service");
const { sendVerificationEmail } = require("../services/email-service");
const { handleAvatarFile } = require("../services/avatars-service");

const getVerificationUrl = (verificationToken) => {
  const HOMEPAGE = process.env.HOMEPAGE;
  const PORT = process.env.PORT;
  return `${HOMEPAGE}:${PORT}/api/users/verify/${verificationToken}`;
};

const signupUserController = async (req, res, next) => {
  const { body } = req;
  const avatar = gravatar.url(body.email, {
    protocol: "https",
  });
  const verificationToken = nanoid();
  body.avatarURL = avatar;
  body.verificationToken = verificationToken;

  const { email, subscription, avatarURL } = await signupUser(body);

  const link = getVerificationUrl(verificationToken);
  await sendVerificationEmail(email, link);

  res.status(201).json({ email, subscription, avatarURL });
};

const verifyUserController = async (req, res, next) => {
  const { verificationToken } = req.params;
  const response = await verifyUser(verificationToken);
  res.json(response);
};

const reVerifyUserController = async (req, res, next) => {
  const { email } = req.body;
  const { verificationToken } = await reVerifyUser(email);
  const link = getVerificationUrl(verificationToken);
  await sendVerificationEmail(email, link);
  res.json({ message: "Verification email sent" });
};

const loginUserController = async (req, res, next) => {
  const { body } = req;
  const { email, subscription, avatarURL, token } = await loginUser(body);
  res.json({ token, user: { email, subscription, avatarURL } });
};

const logoutUserController = async (req, res, next) => {
  const { userId } = req;
  await logoutUser(userId);
  res.status(204).json({});
};

const refreshUserController = async (req, res, next) => {
  const { userId } = req;
  const user = await refreshUser(userId);
  res.json(user);
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
  verifyUserController,
  reVerifyUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
  patchAvatarController,
};
