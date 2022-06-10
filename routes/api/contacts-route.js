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
} = require("../../middlewares/validation-middleware");
const { errorHandlerWrapper } = require("../../helpers/errorHandler");
const { auth } = require("../../middlewares/authorization");
const router = express.Router();

router.use(errorHandlerWrapper(auth));
router.get("/", errorHandlerWrapper(getContactsController));

router.get("/:contactId", errorHandlerWrapper(getContactByIdController));

router.post(
  "/",
  contactBodyValidation,
  errorHandlerWrapper(addContactController)
);

router.delete("/:contactId", errorHandlerWrapper(removeContactController));

router.put(
  "/:contactId",
  contactBodyValidation,
  errorHandlerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  errorHandlerWrapper(updateStatusContactController)
);

module.exports = {
  contactsRouter: router,
};
