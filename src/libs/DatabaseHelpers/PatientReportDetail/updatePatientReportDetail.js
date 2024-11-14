const dbClient = require("../../../../database/database");

async function updatePatientReportDetail(id, details) {
  const keys = Object.keys(details);
  const values = Object.values(details);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  // Construct the SET clause dynamically
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  // Add the id to the values array for the WHERE clause
  values.push(id);

  const updateQuery = `
    UPDATE Patient_Report_Details
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *;
  `;

  try {
    const result = await dbClient.query(updateQuery, values);
    console.log(result.rows.length);

    if (result.rows.length === 0) {
      throw new Error("Patient Report Detail not found");
    }
    return result; // Return the updated patient report detail
  } catch (error) {
    console.error("Error updating patient report detail:", error);
    throw error;
  }
}

module.exports = updatePatientReportDetail;
