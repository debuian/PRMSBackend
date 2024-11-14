const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT * FROM Report_Creators
WHERE creator_id = $1;
`;

async function fetchReport_Creators(creator_id) {
  try {
    const result = await dbClient.query(fetchQuery, [creator_id]);
    if (result.rows.length === 0) {
      throw new Error("Report Creator not found");
    }
    return result; // Return the first row (if it exists)
  } catch (error) {
    console.error("Error fetching report creator:", error);
    throw error;
  }
}

module.exports = fetchReport_Creators;
