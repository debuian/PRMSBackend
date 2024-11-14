const dbClient = require("../../../database/database");

async function createTables() {
  const createTablesQuery = `
CREATE TABLE IF NOT EXISTS patient_report_details (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    report_creator_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    updated_at TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE,
    FOREIGN KEY (report_creator_id) REFERENCES Report_Creators(id) ON DELETE CASCADE
);

`;
  try {
    const result = await dbClient.query(createTablesQuery);
    console.log(
      "Patient_Report_Details Tables created successfully or already exist"
    );
  } catch (e) {
    console.error("Error creating tables:", e);
  }
}

module.exports = createTables;
