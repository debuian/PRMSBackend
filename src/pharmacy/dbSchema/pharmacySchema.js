const dbClient = require("../../../database/database");

async function CreatePharmacyTable() {
  const CreatePharmacyTableQuery = `
CREATE TABLE IF NOT EXISTS Pharmacy_Admins (
    id SERIAL PRIMARY KEY,  -- Auto-incrementing id
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);
`;
  try {
    const result = await dbClient.query(CreatePharmacyTableQuery);
    console.log("Pharmacy_Admins Table created successfully or already exists");
  } catch (e) {
    console.error("Error creating table:", e);
  }
}

module.exports = CreatePharmacyTable;
