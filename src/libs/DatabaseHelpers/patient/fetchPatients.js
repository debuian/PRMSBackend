const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT * FROM Patients
`;
async function fetchPatients() {
  try {
    const result = dbClient.query(fetchQuery);
    return result;
  } catch (error) {
    console.error("Error getting patients:", e);
  }
}
module.exports = fetchPatients;
