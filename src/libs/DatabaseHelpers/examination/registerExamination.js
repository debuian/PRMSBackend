const dbClient = require("../../../../database/database");

const insertExaminationQuery = `
INSERT INTO Examinations (name, report_type_id, category, normal_range_min, normal_range_max, unit)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
`;

async function registerExamination(
  name,
  report_type_id,
  category,
  normal_range_min,
  normal_range_max,
  unit
) {
  try {
    const result = await dbClient.query(insertExaminationQuery, [
      name,
      report_type_id,
      category,
      normal_range_min,
      normal_range_max,
      unit,
    ]);
    return result;
  } catch (error) {
    console.error("Error registering examination:", error);
  }
}
module.exports = registerExamination;
