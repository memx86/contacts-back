const express = require("express");

const router = express.Router();
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchFavoriteUserController,
  patchAvatarController,
} = require("../../controllers/users-controller");
const { auth } = require("../../middlewares/authorization");
const {
  addUserBodyValidation,
} = require("../../middlewares/validation-middleware");
const { upload } = require("../../middlewares/multer-middleware");
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

router.patch(
  "/avatars",
  upload.single("avatar"),
  errorHandlerWrapper(patchAvatarController)
);

module.exports = {
  usersRouter: router,
};