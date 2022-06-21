const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contacts-controller");
const {
  contactBodyValidation,
  favoriteValidation,
} = require("../../middlewares/validation");
const isValidId = require("../../middlewares/isValidId");
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const { auth } = require("../../middlewares/authorization");
const router = express.Router();

router.use(errorHandlerWrapper(auth));
router.get("/", errorHandlerWrapper(getContactsController));

router.get(
  "/:contactId",
  isValidId,
  errorHandlerWrapper(getContactByIdController)
);

router.post(
  "/",
  contactBodyValidation,
  errorHandlerWrapper(addContactController)
);

router.delete(
  "/:contactId",
  isValidId,
  errorHandlerWrapper(removeContactController)
);

router.put(
  "/:contactId",
  isValidId,
  contactBodyValidation,
  errorHandlerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  favoriteValidation,
  errorHandlerWrapper(updateStatusContactController)
);

module.exports = {
  contactsRouter: router,
};
