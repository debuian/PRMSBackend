const dbClient = require("../../../../database/database");

const insertQuery = `
 INSERT INTO Patients (first_name, middle_name, last_name, gender, age)
VALUES ($1, $2, $3, $4, $5) 
RETURNING *;
 `;

async function registerPatient(details) {
  const { first_name, middle_name, last_name, gender, age } = details;
  try {
    const result = await dbClient.query(insertQuery, [
      first_name,
      middle_name,
      last_name,
      gender,
      age,
    ]);
    return result;
  } catch (error) {
    console.error("Error registering examination:", error);
  }
}
module.exports = registerPatient;
