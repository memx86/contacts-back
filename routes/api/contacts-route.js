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
  updateContactValidation,
} = require("../../middlewares/validation-middleware");
const { errorHandlerWrapper } = require("../../helpers/errorHandler");

const router = express.Router();

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
  updateContactValidation,
  errorHandlerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  errorHandlerWrapper(updateStatusContactController)
);

module.exports = router;
