const express = require("express");

const router = express.Router();
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  patchSubscriptionController,
  patchAvatarController,
  verifyUserController,
  reVerifyUserController,
} = require("../../controllers/users-controller");
const { auth } = require("../../middlewares/authorization");
const { userBodyValidation } = require("../../middlewares/validation");
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

router.get(
  "/verify/:verificationToken",
  errorHandlerWrapper(verifyUserController)
);

router.post("/verify", errorHandlerWrapper(reVerifyUserController));

router.use(errorHandlerWrapper(auth));

router.get("/logout", errorHandlerWrapper(logoutUserController));

router.get("/current", errorHandlerWrapper(refreshUserController));

router.patch("/", errorHandlerWrapper(patchSubscriptionController));

router.patch(
  "/avatars",
  upload.single("avatar"),
  errorHandlerWrapper(patchAvatarController)
);

module.exports = {
  usersRouter: router,
};
