const Joi = require("joi");
const { ContactError, UserError } = require("../helpers/errors");

const contactBodySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-z\s]+$/i)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[+]?[(]?[0-9]{3}?[)(]?[-\s]?[0-9]{2,3}?[)]?[-\s]?[0-9]{4,7}$/im)
    .required(),
  favorite: Joi.boolean(),
});

const userBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const contactBodyValidation = (req, res, next) => {
  const { error } = contactBodySchema.validate(req.body);
  if (error) {
    const { message, details } = error;
    const type = details[0].type;
    if (type === "any.required") {
      throw new ContactError({ type: ContactError.TYPE.MISSING_REQ });
    }
    throw new ContactError({ type: ContactError.TYPE.VALIDATION, message });
  }
  next();
};

const userBodyValidation = (req, res, next) => {
  const { error } = userBodySchema.validate(req.body);
  if (error) {
    const { message } = error;
    throw new UserError({ type: UserError.TYPE.VALIDATION, message });
  }
  next();
};

module.exports = {
  contactBodyValidation,
  userBodyValidation,
};
