const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { UserError } = require("../helpers/errors");
const EMAIL_FROM = process.env.EMAIL_FROM;

const sendVerificationEmail = async (email, link) => {
  const text = `You're on your way! Let's confirm your email address. 
  By clicking on the following link, you are confirming your email address.
  ${link}`;
  const html = `<div>You're on your way! Let's confirm your email address. 
   By clicking on the following link, you are confirming your email address.
   <a href=${link} target="_blank" rel="noopener noreferrer">${link}</a>
  </div>`;
  const msg = {
    to: `${email}`,
    from: EMAIL_FROM,
    subject: "Welcome to contacts app!",
    text,
    html,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new UserError({ type: UserError.TYPE.EMAIL_ERROR });
  }
};

module.exports = {
  sendVerificationEmail,
};
