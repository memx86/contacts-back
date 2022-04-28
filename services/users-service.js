const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/models/usersModel");
const { UserError } = require("../helpers/errors");

const includingProjection = {
  email: 1,
  subscription: 1,
  avatarURL: 1,
  _id: 0,
};

const signupUser = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });
  if (user) throw new UserError({ type: UserError.TYPE.REGISTRATION });
  const newUser = await User.create(body);
  return newUser;
};

const verifyCheck = async (user) => {
  if (!user) throw new UserError({ type: UserError.TYPE.NOT_FOUND });
  if (user.verify) throw new UserError({ type: UserError.TYPE.VERIFICATION });
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  await verifyCheck(user);
  user.verificationToken = "none";
  user.verify = true;
  await user.save();
  return { message: "verification successful" };
};

const reVerifyUser = async (email, verificationToken) => {
  const user = await User.findOne({ email });
  if (!user) throw new UserError({ type: UserError.TYPE.NOT_FOUND });
  user.verificationToken = verificationToken;
  user.verify = false;
  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new UserError({ type: UserError.TYPE.AUTH });
  if (!user.verify) throw new UserError({ type: UserError.TYPE.NOT_VERIFIED });
  const isAuth = await bcrypt.compare(password, user.password);
  if (!isAuth) throw new UserError({ type: UserError.TYPE.AUTH });

  const userId = user._id;
  const token = jwt.sign({ userId }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return user;
};

const checkUserToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.token) {
    throw new UserError({ type: UserError.TYPE.UNAUTHORIZED });
  }
  return user.token;
};

const logoutUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { token: null });
  return user;
};

const refreshUser = async (userId) => {
  const user = User.findById(userId).select(includingProjection);
  return user;
};

const patchSubscription = async (userId, subscription) => {
  try {
    await User.findByIdAndUpdate(
      userId,
      { subscription },
      { runValidators: true }
    );
  } catch ({ message }) {
    throw new UserError({ type: UserError.TYPE.VALIDATION, message });
  }
  const user = await User.findById(userId).select(includingProjection);
  return user;
};

const patchAvatar = async (userId, avatarURL) => {
  await User.findByIdAndUpdate(userId, { avatarURL });
  const user = await User.findById(userId).select(includingProjection);
  return user;
};

module.exports = {
  signupUser,
  verifyUser,
  reVerifyUser,
  loginUser,
  logoutUser,
  refreshUser,
  checkUserToken,
  patchSubscription,
  patchAvatar,
};
