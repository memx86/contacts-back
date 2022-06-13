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
  NOT_FOUND: "User not found",
  EMAIL_ERROR: "Can't send email",
  NOT_VERIFIED: "Please verify your email",
  VERIFICATION: "Verification has already been passed",
};

class MulterError extends Error {
  constructor({ type, message }) {
    super(message ?? type);
    this.type = type;
  }
}
MulterError.TYPE = {
  NO_FILE: "no file",
};

class ImageError extends Error {
  constructor({ type, message }) {
    super(message ?? type);
    this.type = type;
  }
}
ImageError.TYPE = {
  NOT_IMAGE: "not image",
};

module.exports = {
  ContactError,
  UserError,
  MulterError,
  ImageError,
};
