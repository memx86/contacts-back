const { ContactError } = require("./errors");

const errorHandlerWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  const { type, message } = error;
  switch (type) {
    case ContactError.TYPE.CONTACT_NOT_FOUND:
    case ContactError.TYPE.NOT_FOUND:
      return res.status(404).json({ message });
    case ContactError.TYPE.MISSING_REQ:
    case ContactError.TYPE.MISSING:
    case ContactError.TYPE.MISSING_FAV:
    case ContactError.TYPE.VALIDATION:
      return res.status(400).json({ message });
    default:
      return res.status(500).json({ message });
  }
};

module.exports = {
  errorHandlerWrapper,
  errorHandler,
};
