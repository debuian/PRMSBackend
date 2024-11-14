const dbClient = require("../../../database/database");

async function createReportTypeTable() {
  const createReportTypeTableQuery = `
CREATE TABLE IF NOT EXISTS Report_Types (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(100) NOT NULL
);
`;
  try {
    const result = await dbClient.query(createReportTypeTableQuery);
    console.log("Report_Types Table created successfully or already exists");
  } catch (e) {
    console.error("Error creating table:", e);
  }
}
module.exports = createReportTypeTable;
