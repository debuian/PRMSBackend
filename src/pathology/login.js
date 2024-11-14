const findByPathologyEmail = require("../libs/DatabaseHelpers/pathology/findByPathologyEmail");
const validateEmailPassword = require("../libs/validateEmailPassword");
const verifyPassword = require("../utils/bcrypt/verifyPassword");
const { generateToken } = require("../utils/jwt/jwt");

const PathologyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email and password format
    const validation = validateEmailPassword(email, password);
    if (!validation.isValid) {
      return res.status(400).json({
        message: validation.messages.join(", "),
        errors: validation.errors,
      });
    }

    // Find the user by email
    const user = await findByPathologyEmail(email);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "User not found" });
    } else {
      const userPassword = user[0].password; // Renamed to avoid conflict
      const isValidPassword = await verifyPassword(password, userPassword);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const { password: _, ...payload } = user[0];
      // Renamed password to '_'
      // Generate JWT token
      payload.origin = "pathology"; // Add origin to the payload

      const token = generateToken(payload);

      // Set the token in a cookie and send the response
      res
        .cookie("userDetails", token, {
          maxAge: 900000, // 15 minutes
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Pathology Login successful", email });
    }
  } catch (error) {
    console.error("Error during pathology login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = PathologyLogin;
