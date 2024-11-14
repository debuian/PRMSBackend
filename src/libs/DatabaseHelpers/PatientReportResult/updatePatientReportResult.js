const dbClient = require("../../../../database/database");

async function updatePatientReportResult(report_examination_id, details) {
  const keys = Object.keys(details);
  const values = Object.values(details);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  values.push(report_examination_id);

  const updateQuery = `
    UPDATE report_results
    SET ${setClause}
    WHERE report_examination_id = $${keys.length + 1}
    RETURNING *;
  `;

  try {
    const result = await dbClient.query(updateQuery, values);
    if (result.rows.length === 0) {
      throw new Error("Patient Report Result not found");
    }
    return result; // Return the updated patient report result
  } catch (error) {
    console.error("Error updating patient report result:", error);
    throw error;
  }
}

module.exports = updatePatientReportResult;
