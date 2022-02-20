const jwt = require("jsonwebtoken");
const { UserError } = require("../helpers/errors");
const { checkUserToken } = require("../db/services/users-service");

const auth = async (req, res, next) => {
  if (!req.headers.authorization)
    throw new UserError({ type: UserError.TYPE.UNAUTHORIZED });

  const [tokenType, token] = req.headers.authorization.split(" ");

  if (tokenType !== "Bearer")
    throw new UserError({ type: UserError.TYPE.TOKEN_TYPE });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_KEY);
    const userToken = await checkUserToken(userId);

    if (token !== userToken)
      throw new UserError({ type: UserError.TYPE.UNAUTHORIZED });

    req.userId = userId;
    next();
  } catch (error) {
    throw new UserError({ type: UserError.TYPE.UNAUTHORIZED });
  }
};

module.exports = {
  auth,
};
