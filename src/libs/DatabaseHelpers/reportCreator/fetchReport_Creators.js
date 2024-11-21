const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT * FROM Report_Creators
WHERE id = $1;
`;

async function fetchReport_CreatorById(creator_id) {
  try {
    const result = await dbClient.query(fetchQuery, [creator_id]);
    if (result.rows.length === 0) {
      throw new Error("Report Creator not found");
    }
    return result.rows[0]; // Return the first row (the patient report detail)
  } catch (error) {
    console.error("Error fetching report creator:", error);
    throw error;
  }
}

module.exports = fetchReport_CreatorById;
