// examinationService.js

const dbClient = require("../../../../database/database");

const fetchExaminationsByReportId = async (reportId) => {
  const query = "SELECT * FROM examinations WHERE report_type_id = $1";
  try {
    const result = await dbClient.query(query, [reportId]);
    return result;
  } catch (error) {
    console.error("Error fetching examinations:", error);
    throw error;
  }
};

module.exports = fetchExaminationsByReportId;
