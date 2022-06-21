const { isValidObjectId } = require("mongoose");
const { IdError } = require("../helpers/errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new IdError({ type: IdError.TYPE.WRONG_ID });
  }
  next();
};

module.exports = isValidId;
