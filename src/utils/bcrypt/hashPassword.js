const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // Cost factor for the hashing process
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword);
    return hashedPassword; // This hashed password can be stored in your database
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}
module.exports = hashPassword;
