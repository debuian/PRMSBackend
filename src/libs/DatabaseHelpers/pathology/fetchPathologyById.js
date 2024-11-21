const dbClient = require("../../../../database/database");

async function fetchPathologyById(id) {
  // Use parameterized query with $1 placeholder
  const ReadQuery = "SELECT * FROM Pathology_Admins WHERE id = $1"; // Use lowercase for column names if necessary
  try {
    // Pass email as an array to the query
    const result = await dbClient.query(ReadQuery, [id]); // Pass as an array
    // Return the rows from the result
    return result.rows[0]; // Assuming you want to return the result rows
  } catch (error) {
    console.error("Error reading user:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

module.exports = fetchPathologyById;
