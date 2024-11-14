const dbClient = require("../../../../database/database");

const fetchPatientReportFullDetails = async () => {
  const Query = `
    SELECT * 
    FROM patient_report_details AS prd
    LEFT JOIN patients AS p 
        ON prd.patient_id = p.id
    LEFT JOIN report_examinations AS re
        ON re.patient_report_id = prd.id
    LEFT JOIN report_results AS rr
        ON re.id = rr.report_examination_id
    ORDER BY prd.id ASC;

  `;

  try {
    const result = await dbClient.query(Query);
    return result;
  } catch (error) {
    console.error("Error fetching patient report details:", error);
    throw error;
  }
};

module.exports = fetchPatientReportFullDetails;
