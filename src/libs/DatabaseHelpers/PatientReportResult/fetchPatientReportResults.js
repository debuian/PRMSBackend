const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT * FROM Patient_Report_Results
`;

async function fetchPatientReportResultById() {
  try {
    const result = await dbClient.query(fetchQuery);
    if (result.rows.length === 0) {
      throw new Error("Patient Report Result not found");
    }
    return result; // Return the first row (the patient report result)
  } catch (error) {
    console.error("Error fetching patient report result:", error);
    throw error;
  }
}

module.exports = fetchPatientReportResultById;
