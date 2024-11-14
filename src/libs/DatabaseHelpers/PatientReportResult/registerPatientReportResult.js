const dbClient = require("../../../../database/database");

const insertQuery = `
INSERT INTO report_results (report_examination_id, report_result)
VALUES ($1, $2)
RETURNING *;
`;

async function registerPatientReportResult(details) {
  const { report_examination_id, report_result } = details;

  try {
    const result = await dbClient.query(insertQuery, [
      report_examination_id,
      report_result,
    ]);
    return result;
  } catch (error) {
    console.error("Error registering patient report result:", error);
    throw error;
  }
}

module.exports = registerPatientReportResult;
