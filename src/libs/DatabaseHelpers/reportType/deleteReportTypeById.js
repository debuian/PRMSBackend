const dbClient = require("../../../../database/database");

const deleteQuery = `
  DELETE FROM Report_Types
  WHERE id = $1
  RETURNING *; 
`;

const deleteReportTypeById = async (reportTypeId) => {
  try {
    const result = await dbClient.query(deleteQuery, [reportTypeId]);
    if (result.rowCount === 0) {
      return null; // Indicate that no report type was found with the provided ID
    }
    return result.rows[0]; // Return the deleted report type
  } catch (error) {
    console.error("Error deleting report type:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

module.exports = deleteReportTypeById;
