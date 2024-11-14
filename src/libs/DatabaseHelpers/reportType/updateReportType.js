const dbClient = require("../../../../database/database");

const updateQuery = `
  UPDATE Report_Types
  SET name = $1
  WHERE id = $2
  RETURNING *;
`;

async function updateReportType(reportTypeId, name) {
  try {
    const result = await dbClient.query(updateQuery, [name, reportTypeId]);
    if (result.rowCount === 0) {
      return null; // Indicate that the report type was not found
    }
    return result;
  } catch (error) {
    console.error("Error updating report type:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

module.exports = updateReportType;
