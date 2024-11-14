const registerPathologyAdmin = require("../libs/DatabaseHelpers/pathology/registerPathologyAdmin");
const validateEmailPassword = require("../libs/validateEmailPassword");
const hashPassword = require("../utils/bcrypt/hashPassword");

const pathologySignup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const validation = validateEmailPassword(email, password);
  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.messages.join(", "),
      errors: validation.errors,
    });
  }
  const hashedPassword = await hashPassword(password);
  const result = await registerPathologyAdmin(email, hashedPassword);
  res.status(200).json({ message: "Signup successful", email });
};
module.exports = pathologySignup;
