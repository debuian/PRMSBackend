const registerPatientReportResult = require("../libs/DatabaseHelpers/PatientReportResult/registerPatientReportResult");

const addPatientReportResults = async (req, res) => {
  try {
    const { report_result } = req.body; // The result data should be in the request body
    const report_detail_id = req.params.report_detail_id; // The report detail ID should be in the URL parameters

    if (!report_result || !report_detail_id) {
      return res
        .status(400)
        .json({ message: "Patient result and report detail ID are required" });
    }

    const details = { report_result, report_detail_id };

    const result = await registerPatientReportResult(details);

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Failed to register patient result" });
    }

    return res.status(201).json({
      message: "Result created successfully",
      PatientResult: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding patient report results:", error);
    return res.status(500).json({
      message: "Error adding patient report results",
      error: error.message,
    });
  }
};

module.exports = addPatientReportResults;
