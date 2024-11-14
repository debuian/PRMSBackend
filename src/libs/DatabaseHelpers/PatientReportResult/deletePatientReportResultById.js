const dbClient = require("../../../../database/database");

const deleteQuery = `
DELETE FROM Patient_Report_Results
WHERE id = $1
RETURNING *;
`;

async function deletePatientReportResultById(id) {
  try {
    const result = await dbClient.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      throw new Error("Patient Report Result not found");
    }
    return result.rows[0]; // Return the deleted patient report result
  } catch (error) {
    console.error("Error deleting patient report result:", error);
    throw error;
  }
}

module.exports = deletePatientReportResultById;
