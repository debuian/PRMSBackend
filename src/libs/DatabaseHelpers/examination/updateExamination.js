const dbClient = require("../../../../database/database");

const updateQuery = `
  UPDATE Examinations
  SET name = $1, report_type_id = $2, category = $3, normal_range_min = $4, normal_range_max = $5, unit = $6
  WHERE id = $7
  RETURNING *;
`;

async function updateExamination(
  examinationId,
  name,
  report_type_id,
  category,
  normal_range_min,
  normal_range_max,
  unit
) {
  try {
    const result = await dbClient.query(updateQuery, [
      name,
      report_type_id,
      category,
      normal_range_min,
      normal_range_max,
      unit,
      examinationId,
    ]);
    if (result.rowCount === 0) {
      throw new Error("Examination not found");
    }
    return result;
  } catch (error) {
    console.error("Error updating examination:", error);
    throw error;
  }
}

module.exports = updateExamination;
