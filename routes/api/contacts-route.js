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
  addContactBodyValidation,
} = require("../../middlewares/validation-middleware");
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const { auth } = require("../../middlewares/authorization");
const router = express.Router();

router.use(errorHandlerWrapper(auth));
router.get("/", errorHandlerWrapper(getContactsController));

router.get("/:contactId", errorHandlerWrapper(getContactByIdController));

router.post(
  "/",
  addContactBodyValidation,
  errorHandlerWrapper(addContactController)
);

router.delete("/:contactId", errorHandlerWrapper(removeContactController));

router.put(
  "/:contactId",
  addContactBodyValidation,
  errorHandlerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  errorHandlerWrapper(updateStatusContactController)
);

module.exports = {
  contactsRouter: router,
};
