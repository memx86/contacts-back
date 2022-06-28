const Joi = require("joi");
const { UserError } = require("../../helpers/errors");

const emailVerifySchema = Joi.object({
  email: Joi.string().email().required(),
});

const emailVerifyValidation = (req, res, next) => {
  const { error } = emailVerifySchema.validate(req.body);
  if (error) {
    const { message, details } = error;
    const type = details[0].type;
    if (type === "any.required") {
      throw new UserError({ type: UserError.TYPE.MISSING_REQ });
    }
    throw new UserError({ type: UserError.TYPE.VALIDATION, message });
  }
  next();
};

module.exports = emailVerifyValidation;
