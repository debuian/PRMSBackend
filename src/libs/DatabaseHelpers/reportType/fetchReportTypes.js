const dbClient = require("../../../../database/database");

async function fetchReportTypes() {
  const fetchQuery = `SELECT * FROM Report_Types ORDER BY id ASC`;
  try {
    const result = await dbClient.query(fetchQuery);
    return result;
  } catch (error) {
    console.error("Error fetching report types:", error);
    throw error;
  }
}
module.exports = fetchReportTypes;
