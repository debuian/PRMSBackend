const dbClient = require("../../../../database/database");

const insertQuery = `
INSERT INTO Report_Creators (creator_id,creator_type) 
VALUES ($1,$2)
RETURNING *`;
async function registerReport_Creator(details) {
  const { creator_id, creator_type } = details;
  try {
    const result = await dbClient.query(insertQuery, [
      creator_id,
      creator_type,
    ]);
    return result;
  } catch (error) {
    console.error("Error registering examination:", error);
  }
}
module.exports = registerReport_Creator;
