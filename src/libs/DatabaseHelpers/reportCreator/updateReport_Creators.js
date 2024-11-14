const dbClient = require("../../../../database/database");

async function updateReport_Creators(creator_id, details) {
  const keys = Object.keys(details);
  const values = Object.values(details);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  // Construct the SET clause dynamically
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  // Add the creator_id to the values array for the WHERE clause
  values.push(creator_id);

  const updateQuery = `
    UPDATE Report_Creators
    SET ${setClause}
    WHERE creator_id = $${keys.length + 1}
    RETURNING *;
  `;

  try {
    const result = await dbClient.query(updateQuery, values);
    if (result.rows.length === 0) {
      throw new Error("Report Creator not found");
    }
    return result; // Return the updated report creator
  } catch (error) {
    console.error("Error updating report creator:", error);
    throw error;
  }
}

module.exports = updateReport_Creators;
