const registerPharmacyAdmin = require("../libs/DatabaseHelpers/pharmacy/registerPharmacyAdmin");
const validateEmailPassword = require("../libs/validateEmailPassword");
const hashPassword = require("../utils/bcrypt/hashPassword");

const pharmacySignup = async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
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
  const result = await registerPharmacyAdmin(email, hashedPassword);
  res.status(200).json({ message: "Signup successful", email });
};
module.exports = pharmacySignup;
