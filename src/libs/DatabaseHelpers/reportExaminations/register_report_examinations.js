const dbClient = require("../../../../database/database");

const register_report_examinations = async (details) => {
  const insertQuery = `
      INSERT INTO report_examinations (examination_id, patient_report_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

  const { examination_id, patient_report_id } = details;
  try {
    const result = await dbClient.query(insertQuery, [
      examination_id,
      patient_report_id,
    ]);
    return result;
  } catch (error) {
    console.error("Error registering patient report examination:", error);
    throw error;
  }
};

module.exports = register_report_examinations;
