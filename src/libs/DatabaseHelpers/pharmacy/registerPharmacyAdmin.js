const dbClient = require("../../../../database/database");

async function registerPharmacyAdmin(name, email, password, location) {
  const insertQuery =
    "INSERT INTO Pharmacy_Admins (email,password,name,location) VALUES ($1,$2,$3,$4)";
  try {
    const result = await dbClient.query(insertQuery, [
      email,
      password,
      name,
      location,
    ]);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}
module.exports = registerPharmacyAdmin;
