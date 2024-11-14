const dbClient = require("../../../database/database");

async function createPatientsTable() {
  const createPatientsTableQuery = `
CREATE TABLE IF NOT EXISTS Patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL
);
`;
  try {
    const result = await dbClient.query(createPatientsTableQuery);
    console.log("Patients table created successfully or already exists");
  } catch (e) {
    console.error("Error creating Patients table:", e);
  }
}

module.exports = createPatientsTable;
