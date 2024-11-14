const deletePatientReportDetailById = require("../libs/DatabaseHelpers/PatientReportDetail/deletePatientReportDetailById");

const removePatientReportDetail = async (req, res) => {
  try {
    const id = req.params.PatientReportDetailId;

    // Check if id is provided
    if (!id) {
      return res
        .status(400)
        .json({ message: "PatientReportDetailId is required" });
    }

    const result = await deletePatientReportDetailById(id);

    // Check if the deletion was successful
    if (result.rowCount > 0) {
      return res.status(200).json({
        message: "Patient Report Details deleted successfully",
        patientDetails: result.rows[0], // Assuming the deleted row is returned
      });
    } else {
      return res.status(404).json({ message: "Patient Report not found" });
    }
  } catch (error) {
    console.error("Error in deleting patient report details:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = removePatientReportDetail;
