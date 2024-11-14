const dbClient = require("../../../../database/database");

const deleteQuery = `
DELETE FROM Patient_Report_Details
WHERE id = $1
RETURNING *;
`;

async function deletePatientReportDetailById(id) {
  try {
    const result = await dbClient.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      throw new Error("Patient Report Detail not found");
    }
    return result; // Return the deleted patient report detail
  } catch (error) {
    console.error("Error deleting patient report detail:", error);
    throw error;
  }
}

module.exports = deletePatientReportDetailById;
