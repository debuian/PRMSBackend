const bcrypt = require("bcrypt");
async function verifyPassword(enteredPassword, storedHashedPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying password:", error);
  }
}

module.exports = verifyPassword;
