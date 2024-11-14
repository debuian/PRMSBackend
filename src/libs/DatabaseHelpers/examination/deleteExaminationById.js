const dbClient = require("../../../../database/database");

const deleteQuery = `
  DELETE FROM Examinations
  WHERE id = $1
  RETURNING *;
`;
async function deleteExaminationById(examinationId) {
  try {
    const result = await dbClient.query(deleteQuery, [examinationId]);
    console.log(result);

    if (result.rowCount === 0) {
      throw new Error("Examination not found");
    }
    return result;
  } catch (error) {
    console.error("Error deleting examination:", error);
    throw error;
  }
}
module.exports = deleteExaminationById;
