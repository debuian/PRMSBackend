const dbClient = require("../../../database/database");

async function createTables() {
  try {
    const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS Report_Results (
    id SERIAL PRIMARY KEY,
    report_examination_id INT NOT NULL,
    report_result VARCHAR(255) NOT NULL,
    FOREIGN KEY (report_examination_id) REFERENCES report_examinations(id) ON DELETE CASCADE
);
`;
    const result = await dbClient.query(createTablesQuery);
    console.log(
      "Patient_Report_Results Tables created successfully or already exist"
    );
  } catch (e) {
    console.error("Error creating tables:", e);
  }
}
module.exports = createTables;
