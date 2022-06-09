const express = require("express");
const router = express.Router();
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
} = require("../../controllers/users-controller");
const { auth } = require("../../middlewares/authorization");
const {
  userBodyValidation,
} = require("../../middlewares/validation-middleware");

router.post(
  "/signup",
  userBodyValidation,
  errorHandlerWrapper(signupUserController)
);

router.post(
  "/login",
  userBodyValidation,
  errorHandlerWrapper(loginUserController)
);

router.use(errorHandlerWrapper(auth));

router.get("/logout", errorHandlerWrapper(logoutUserController));

router.get("/current", errorHandlerWrapper(refreshUserController));

router.patch("/", errorHandlerWrapper(patchFavoriteUserController));

module.exports = {
  usersRouter: router,
};
