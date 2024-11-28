const dbClient = require("../../../../database/database");

async function fetchAllPharmacy() {
  // Use parameterized query with $1 placeholder
  const ReadQuery = "SELECT * FROM pharmacy_admins ORDER BY id DESC;"; // Use lowercase for column names if necessary
  try {
    // Pass email as an array to the query
    const result = await dbClient.query(ReadQuery); // Pass as an array
    // Return the rows from the result
    return result.rows; // Assuming you want to return the result rows
  } catch (error) {
    console.error("Error reading user:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

module.exports = fetchAllPharmacy;
