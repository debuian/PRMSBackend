const dbClient = require("../../../../database/database");

const fetch_report_examinations = async (patientReportId) => {
  const query = `
  SELECT
    re.id AS report_examination_id,
    re.examination_id,
    re.patient_report_id,
    rr.id AS report_examination_result_id,
    rr.report_result, 
    e.name AS examination_name,
    e.category,
    e.normal_range_min,
    e.normal_range_max,
    e.unit
FROM report_examinations re
LEFT JOIN Examinations e ON e.id = re.examination_id
RIGHT JOIN report_results rr ON rr.report_examination_id = re.id
WHERE re.patient_report_id = $1;

  `;

  try {
    const result = await dbClient.query(query, [patientReportId]);
    console.log(result.rows);

    return result.rows;
  } catch (error) {
    console.error("Error fetching report examinations:", error.message);
    throw new Error("Failed to fetch report examinations");
  }
};

module.exports = fetch_report_examinations;
