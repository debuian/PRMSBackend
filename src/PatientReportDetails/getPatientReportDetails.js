const fetchPatientReportDetails = require("../libs/DatabaseHelpers/PatientReportDetail/fetchPatientReportDetails");

const getPatientReportDetails = async (req, res) => {
  try {
    const result = await fetchPatientReportDetails();
    if (result.rows.length > 0) {
      const formattedResult = result.rows.map((row) => ({
        reportDetails: {
          report_id: row.report_id,
          created_at: row.report_created_at,
          status: row.report_status,
          updated_at: row.report_updated_at,
        },
        patientDetails: {
          patient_id: row.patient_id,
          first_name: row.patient_first_name,
          middle_name: row.patient_middle_name,
          last_name: row.patient_last_name,
          gender: row.patient_gender,
          age: row.patient_age,
        },
        reportCreatorDetails: {
          report_creator_id: row.report_creator_id,
          creator_id: row.report_creator_user_id,
          creator_type: row.report_creator_type,
        },
      }));

      return res.status(200).json({
        message: "All Patients Report fetched successfully",
        patientsReport: formattedResult,
      });
    } else {
      return res.status(404).json({
        message: "No Patient Report available",
        patientsReport: [],
      });
    }
  } catch (error) {
    console.error("Error fetching patient report details:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = getPatientReportDetails;
