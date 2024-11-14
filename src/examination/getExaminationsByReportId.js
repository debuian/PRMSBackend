const fetchExaminationsByReportId = require("../libs/DatabaseHelpers/examination/fetchExaminationByReportID");

const getExaminationsByReportId = async (req, res) => {
  const report_Id = req.query.report_Id;
  try {
    const result = await fetchExaminationsByReportId(report_Id);
    res.status(200).json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getExaminationsByReportId;
