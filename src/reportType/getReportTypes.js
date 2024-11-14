const fetchReportTypes = require("../libs/DatabaseHelpers/reportType/fetchReportTypes");

const getReportTypes = async (req, res) => {
  const result = await fetchReportTypes();
  res.status(200).json({ result: result.rows });
};
module.exports = getReportTypes;
