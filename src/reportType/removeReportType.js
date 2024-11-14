const deleteReportTypeById = require("../libs/DatabaseHelpers/reportType/deleteReportTypeById");

const removeReportType = async (req, res) => {
  const reportTypeId = req.query.reportTypeId;

  // Validate input
  if (!reportTypeId) {
    return res.status(400).json({ message: "reportTypeId is required" });
  }

  try {
    const result = await deleteReportTypeById(reportTypeId); // Await the asynchronous function

    // Check if a report type was deleted
    if (!result) {
      return res.status(404).json({ message: "Report type not found" });
    }

    // Respond with a success message and the deleted report type
    res.status(200).json({
      message: "Report type deleted successfully",
      deletedReportType: result,
    });
  } catch (error) {
    console.error("Error removing report type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = removeReportType;
