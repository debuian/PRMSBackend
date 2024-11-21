const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT * FROM patient_report_details
WHERE id = $1;
`;

async function fetchPatientReportDetailById(id) {
  try {
    const result = await dbClient.query(fetchQuery, [id]);
    if (result.rows.length === 0) {
      throw new Error("Patient Report Detail not found");
    }
    return result.rows[0]; // Return the first row (the patient report detail)
  } catch (error) {
    console.error("Error fetching patient report detail:", error);
    throw error;
  }
}

module.exports = fetchPatientReportDetailById;
