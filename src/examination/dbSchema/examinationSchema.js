const dbClient = require("../../../database/database");

async function createExaminationsTable() {
  const createExaminationsTableQuery = `
CREATE TABLE IF NOT EXISTS Examinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    report_type_id INT NOT NULL,
    category VARCHAR(100),
    normal_range_min NUMERIC NOT NULL,
    normal_range_max NUMERIC NOT NULL,
    unit VARCHAR(50) NOT NULL,
    FOREIGN KEY (report_type_id) REFERENCES Report_Types(id)
);      
`;
  try {
    const result = await dbClient.query(createExaminationsTableQuery);
    console.log("Examinations table created successfully or already exists");
  } catch (e) {
    console.error("Error creating table:", e);
  }
}

module.exports = createExaminationsTable;
