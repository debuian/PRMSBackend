const dbClient = require("../../../../database/database");

const fetchPatientReportFullDetails = async () => {
  const Query = `
    SELECT 
     prd.*,
       p.*,
      re.*,
      rr.*,
      e.id AS examination_id,
      e.name AS examination_name,
      e.category AS examination_category,
      e.normal_range_min AS examination_normal_range_min,
      e.normal_range_max AS examination_normal_range_max,
      e.unit AS examination_unit,
      rt.id AS report_type_id,
      rt.name AS report_type_name

    FROM patient_report_details AS prd
    LEFT JOIN patients AS p 
        ON prd.patient_id = p.id

    LEFT JOIN report_examinations AS re
        ON re.patient_report_id = prd.id

    LEFT JOIN report_results AS rr
        ON re.id = rr.report_examination_id
    LEFT JOIN examinations AS e 
    ON e.id = re.examination_id  

    LEFT JOIN report_types AS rt
    ON rt.id = e.report_type_id
    
        ORDER BY prd.id ASC;  
  

  `;

  try {
    const result = await dbClient.query(Query);
    return result;
  } catch (error) {
    console.error("Error fetching patient report details:", error);
    throw error;
  }
};

module.exports = fetchPatientReportFullDetails;
