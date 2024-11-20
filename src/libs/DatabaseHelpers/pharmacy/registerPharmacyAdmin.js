const dbClient = require("../../../../database/database");

async function registerPharmacyAdmin(email, password) {
  const insertQuery =
    "INSERT INTO Pharmacy_Admins (email,password) VALUES ($1,$2)";
  try {
    const result = await dbClient.query(insertQuery, [email, password]);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}
module.exports = registerPharmacyAdmin;
