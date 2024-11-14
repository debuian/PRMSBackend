const dbClient = require("../../../database/database");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS Pathology_Admins (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
`;

async function createTable() {
  try {
    // Execute the query to create the table if it does not exist
    const result = await dbClient.query(createTableQuery);
    console.log(
      "Pathology_Admins Table created successfully or already exists"
    );
  } catch (e) {
    console.error("Error creating table:", e);
  }
}

// Call the function to create the table
module.exports = createTable;
