const dbClient = require("../../../database/database");

async function createReportCreatorTables() {
  const createReportCreatorTablesQuery = `
CREATE TABLE IF NOT EXISTS Report_Creators (
    id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL,
    creator_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Pathology_Admins(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Pharmacy_Admins(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
`;
  try {
    const result = await dbClient.query(createReportCreatorTablesQuery);
    console.log("Report_Creators Tables created successfully or already exist");
  } catch (e) {
    console.error("Error creating tables:", e);
  }
}

module.exports = createReportCreatorTables;
