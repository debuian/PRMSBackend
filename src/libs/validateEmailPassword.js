const validateEmail = require("../utils/emailvalidation");
const { validatePassword } = require("../utils/passwordvalidation");

const validateEmailPassword = (email, password) => {
  const errors = [];
  const messages = [];

  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    messages.push("Email validation failed");
    errors.push("Invalid Email Format");
  }
  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    messages.push("Password validation failed");
    errors.push(...passwordValidation.errors);
  }
  return {
    isValid: errors.length === 0,
    messages: messages,
    errors: errors,
  };
};

module.exports = validateEmailPassword;
