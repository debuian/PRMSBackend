const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "your_secret_key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
};

module.exports = { generateToken, verifyToken };
