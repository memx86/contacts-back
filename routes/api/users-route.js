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
  addUserBodyValidation,
} = require("../../middlewares/validation-middleware");

router.post(
  "/signup",
  addUserBodyValidation,
  errorHandlerWrapper(signupUserController)
);

router.post(
  "/login",
  addUserBodyValidation,
  errorHandlerWrapper(loginUserController)
);

router.use(errorHandlerWrapper(auth));

router.get("/logout", errorHandlerWrapper(logoutUserController));

router.get("/current", errorHandlerWrapper(refreshUserController));

router.patch("/", errorHandlerWrapper(patchFavoriteUserController));

module.exports = {
  usersRouter: router,
};
