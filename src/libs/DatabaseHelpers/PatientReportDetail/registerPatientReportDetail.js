const dbClient = require("../../../../database/database");

const insertQuery = `
INSERT INTO Patient_Report_Details (patient_id, report_creator_id)
VALUES ($1, $2)
RETURNING *;
`;

async function registerPatientReportDetail(details) {
  const { patient_id, report_creator_id } = details;
  try {
    const result = await dbClient.query(insertQuery, [
      patient_id,
      report_creator_id,
    ]);
    return result; // Return the created patient report detail
  } catch (error) {
    console.error("Error registering patient report detail:", error);
    throw error;
  }
}

module.exports = registerPatientReportDetail;
