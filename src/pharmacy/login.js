const findByPharmacyEmail = require("../libs/DatabaseHelpers/pharmacy/findByPharmacyEmail");
const validateEmailPassword = require("../libs/validateEmailPassword");
const verifyPassword = require("../utils/bcrypt/verifyPassword");
const { generateToken } = require("../utils/jwt/jwt");

const pharmacyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const validation = validateEmailPassword(email, password);
    if (!validation.isValid) {
      return res.status(400).json({
        message: validation.messages.join(", "),
        errors: validation.errors,
      });
    }
    const user = await findByPharmacyEmail(email);
    if (!user || user.length === 0) {
      res.status(401).json({ message: "User not found" });
    } else {
      const userPassword = user[0].password; // Renamed to avoid conflict
      const isValidPassword = await verifyPassword(password, userPassword);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const { password: _, ...payload } = user[0];

      payload.origin = "pharmacy"; // Add origin to the payload

      const token = generateToken(payload);

      // Set the token in a cookie and send the response
      res
        .cookie("userDetails", token, {
          maxAge: 900000, // 15 minutes
          httpOnly: true,
        })
        .cookie("loginDetails", "true", {
          maxAge: 900000,
        })
        .status(200)
        .json({ message: "Pharmacy Login successful", email });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = pharmacyLogin;
