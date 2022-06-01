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
  VALIDATION: "Validation error",
};

module.exports = {
  ContactError,
};
