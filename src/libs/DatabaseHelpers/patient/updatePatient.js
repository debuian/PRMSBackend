const dbClient = require("../../../../database/database");

async function updatePatient(id, details) {
  const keys = Object.keys(details);
  const values = Object.values(details);

  if (keys.length === 0) {
    throw new Error("No fields to update");
  }

  // Construct the SET clause dynamically
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  // Add the ID to the values array for the WHERE clause
  values.push(id);

  const updateQuery = `
    UPDATE Patients
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *;
  `;

  try {
    const result = await dbClient.query(updateQuery, values);
    if (result.rows.length === 0) {
      throw new Error("Patient not found");
    }
    return result;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
}

module.exports = updatePatient;
