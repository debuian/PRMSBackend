const fetchPatientReportFullDetails = require("../libs/DatabaseHelpers/PatientReportResult/fetchPatientReportFullDetails");
const formatFullPatientReportDetails = require("../utils/DataFromater/formatFullPatientReportDetails");

const getPatientReportFullDetails = async (req, res) => {
  try {
    // Fetching the full patient report details from the database
    const result = await fetchPatientReportFullDetails();

    // Log the rows of the first query (patient report details)
    console.log(result.rows); // The rows for the first query

    // If no result is found in the first query, return a 404
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No patient report details found." });
    }
    const formattedPatientReports = formatFullPatientReportDetails(result.rows);
    // Send the result back to the client with a 200 status code
    res.status(200).json({
      patientReportDetails: formattedPatientReports, // First query result
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching patient report details:", error);

    // Send a generic error message to the client
    res.status(500).json({
      message: "An error occurred while fetching patient report details.",
      error: error.message, // Optionally include the error message
    });
  }
};

module.exports = getPatientReportFullDetails;
