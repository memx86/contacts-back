const Joi = require("joi");
const { ContactError } = require("../../helpers/errors");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const favoriteValidation = (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    const { message, details } = error;
    const type = details[0].type;
    if (type === "any.required") {
      throw new ContactError({ type: ContactError.TYPE.MISSING_FAV });
    }
    throw new ContactError({ type: ContactError.TYPE.VALIDATION, message });
  }
  next();
};

module.exports = favoriteValidation;
