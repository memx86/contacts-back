const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/models/usersModel");
const { UserError } = require("../helpers/errors");

const includingProjection = {
  email: 1,
  subscription: 1,
  avatarURL: 1,
  token: 1,
  _id: 0,
};

const signupUser = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });
  if (user) throw new UserError({ type: UserError.TYPE.REGISTRATION });
  const newUser = await User.create(body);
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new UserError({ type: UserError.TYPE.AUTH });
  const isAuth = await bcrypt.compare(password, user.password);
  if (!isAuth) throw new UserError({ type: UserError.TYPE.AUTH });

  const userId = user._id;
  const token = jwt.sign({ userId }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return user;
};

const checkUserToken = async (userId) => {
  const user = await User.findById(userId).select(includingProjection);
  if (!user || !user.token) {
    throw new UserError({ type: UserError.TYPE.UNAUTHORIZED });
  }
  return user;
};

const logoutUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { token: null });
  return user;
};

const patchFavoriteUser = async (userId, subscription) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { subscription },
      {
        runValidators: true,
        returnDocument: "after",
      }
    ).select(includingProjection);
    return user;
  } catch ({ message }) {
    throw new UserError({ type: UserError.TYPE.VALIDATION, message });
  }
};

const patchAvatar = async (userId, avatarURL) => {
  await User.findByIdAndUpdate(userId, { avatarURL });
  const user = await User.findById(userId).select(includingProjection);
  return user;
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  checkUserToken,
  patchFavoriteUser,
  patchAvatar,
};
