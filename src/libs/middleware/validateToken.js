const { verifyToken } = require("../../utils/jwt/jwt");

async function validateToken(req, res, next) {
  try {
    const cookieName = "userDetails"; // The cookie name
    const cookieValue = req.cookies[cookieName];

    if (!cookieValue) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No cookie found" });
    }
    const value = verifyToken(cookieValue);
    // Attach the user info to the request object for use in other routes
    req.user = value;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
}

module.exports = validateToken;
