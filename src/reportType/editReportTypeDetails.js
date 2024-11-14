const updateReportType = require("../libs/DatabaseHelpers/reportType/updateReportType");

const editReportTypeDetails = async (req, res) => {
  try {
    const reportTypeId = req.query.reportTypeId;
    const { name } = req.body;

    // Validate input
    if (!reportTypeId) {
      return res.status(400).json({ message: "reportTypeId is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Update report type
    const result = await updateReportType(reportTypeId, name);
    if (!result) {
      return res.status(404).json({ message: "Report type not found" });
    }

    res
      .status(200)
      .json({ message: "Updated successfully", reportType: result.rows[0] });
  } catch (error) {
    console.error("Error updating report type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = editReportTypeDetails;
