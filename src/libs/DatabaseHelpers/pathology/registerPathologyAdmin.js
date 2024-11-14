const dbClient = require("../../../../database/database");
async function registerPathologyAdmin(email, password) {
  const insertQuery =
    "INSERT INTO Pathology_Admins (email, password) VALUES ($1, $2)";
  try {
    const result = await dbClient.query(insertQuery, [email, password]);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

module.exports = registerPathologyAdmin;
