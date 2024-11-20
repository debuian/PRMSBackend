const fetchPatientReportFullDetails = require("../libs/DatabaseHelpers/PatientReportResult/fetchPatientReportFullDetails");
const formatFullPatientReportDetails = require("../utils/DataFromater/formatFullPatientReportDetails");

const getPatientReportFullDetails = async (req, res) => {
  try {
    const report_id = req.query.report_id;
    const result = await fetchPatientReportFullDetails(report_id);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No patient report details found." });
    }
    const formattedPatientReports = formatFullPatientReportDetails(result.rows);
    res.status(200).json({
      patientReportDetails: formattedPatientReports,
    });
  } catch (error) {
    console.error("Error fetching patient report details:", error);

    res.status(500).json({
      message: "An error occurred while fetching patient report details.",
      error: error.message,
    });
  }
};

module.exports = getPatientReportFullDetails;
