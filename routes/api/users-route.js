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
  userBodyValidation,
} = require("../../middlewares/validation-middleware");
const { upload } = require("../../middlewares/multer-middleware");
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

router.patch(
  "/avatars",
  upload.single("avatar"),
  errorHandlerWrapper(patchAvatarController)
);

module.exports = {
  usersRouter: router,
};
