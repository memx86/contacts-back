class ContactError extends Error {
  constructor({ type, message }) {
    super(message ?? type);
    this.type = type;
  }
}
ContactError.TYPE = {
  NOT_FOUND: "Not found",
  CONTACT_NOT_FOUND: "Contact not found",
  MISSING: "Missing fields",
  MISSING_REQ: "Missing required fields",
  MISSING_FAV: "Missing required field favorite",
  VALIDATION: "Validation error",
};
class UserError extends Error {
  constructor({ type, message }) {
    super(message ?? type);
    this.type = type;
  }
}
UserError.TYPE = {
  VALIDATION: "Validation error",
  REGISTRATION: "Email in use",
  AUTH: "Email or password is wrong",
  UNAUTHORIZED: "Not authorized",
  TOKEN_TYPE: "Wrong token type",
};

module.exports = {
  ContactError,
  UserError,
};
