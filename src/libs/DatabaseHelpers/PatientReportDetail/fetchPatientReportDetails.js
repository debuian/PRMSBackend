const dbClient = require("../../../../database/database");

const fetchQuery = `
SELECT
    prd.id AS report_id,  
    prd.patient_id,   
    prd.report_creator_id,   
    prd.created_at AS report_created_at,   
    prd.status AS report_status,   
    prd.updated_at AS report_updated_at,
    p.id AS patient_id,
    p.first_name AS patient_first_name,
    p.middle_name AS patient_middle_name,
    p.last_name AS patient_last_name,
    p.gender AS patient_gender,
    p.age AS patient_age,
    rc.id AS report_creator_id,
    rc.creator_id AS report_creator_user_id,
    rc.creator_type AS report_creator_type
FROM
    patient_report_details prd
LEFT JOIN
    Patients p ON prd.patient_id = p.id
LEFT JOIN
    Report_Creators rc ON prd.report_creator_id = rc.id;


`;

async function fetchPatientReportDetails() {
  try {
    const result = await dbClient.query(fetchQuery);
    if (result.rows.length === 0) {
      throw new Error("Patient Report Detail not found");
    }
    return result; // Return the first row (the patient report detail)
  } catch (error) {
    console.error("Error fetching patient report detail:", error);
    throw error;
  }
}

module.exports = fetchPatientReportDetails;
