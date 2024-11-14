const dbClient = require("../../../../database/database");

const deleteQuery = `
DELETE FROM Patients
WHERE id = $1
RETURNING *;`;

async function deletePatientById(id) {
  try {
    const result = await dbClient.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      throw new Error("Patient not found");
    }
    return result;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
}

module.exports = deletePatientById;
