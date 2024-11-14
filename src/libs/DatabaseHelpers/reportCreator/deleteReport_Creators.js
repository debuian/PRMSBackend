const dbClient = require("../../../../database/database");

const deleteQuery = `
DELETE FROM Report_Creators
WHERE creator_id = $1
RETURNING *;
`;

async function deleteReport_Creators(creator_id) {
  try {
    const result = await dbClient.query(deleteQuery, [creator_id]);
    if (result.rowCount === 0) {
      throw new Error("Report Creator not found");
    }
    return result; // Return the deleted report creator
  } catch (error) {
    console.error("Error deleting report creator:", error);
    throw error;
  }
}

module.exports = deleteReport_Creators;
