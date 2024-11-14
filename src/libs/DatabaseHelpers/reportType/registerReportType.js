const dbClient = require("../../../../database/database");

async function registerReportType(name) {
  const insertQuery = "INSERT INTO Report_Types (name) VALUES ($1)";
  try {
    const result = await dbClient.query(insertQuery, [name]);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

module.exports = registerReportType;
