const updatePatientReportResult = require("../libs/DatabaseHelpers/PatientReportResult/updatePatientReportResult");

const editPatientReportResults = async (req, res) => {
  try {
    const { report_result } = req.body;
    const report_examination_id = req.query.examination_id;

    if (!report_result || !report_examination_id) {
      return res
        .status(400)
        .json({ message: "Patient result and report detail ID are required" });
    }

    const details = { report_result };

    const result = await updatePatientReportResult(
      report_examination_id,
      details
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Failed to register patient result" });
    }
    return res.status(201).json({
      message: "Result Updated successfully",
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
module.exports = editPatientReportResults;
