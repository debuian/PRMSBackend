const updatePatientReportDetail = require("../libs/DatabaseHelpers/PatientReportDetail/updatePatientReportDetail");

const editPatientReportDetails = async (req, res) => {
  try {
    const id = req.query.PatientReportDetailId;
    const details = { status: "Complete", updated_at: new Date() };

    if (!id) {
      return res
        .status(400)
        .json({ message: "PatientReportDetailId is required" });
    }

    const result = await updatePatientReportDetail(id, details);

    // Check if the update was successful
    if (result.rowCount > 0) {
      return res.status(200).json({
        message: "Patient Report Details updated successfully",
        updatedReport: result.rows[0],
      });
    } else {
      return res
        .status(404)
        .json({ message: "Patient Report Detail not found" });
    }
  } catch (error) {
    console.error("Error updating patient report details:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = editPatientReportDetails;
