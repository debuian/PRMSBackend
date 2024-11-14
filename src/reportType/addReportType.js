const registerReportType = require("../libs/DatabaseHelpers/reportType/registerReportType");

const addReportType = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Name Required");
  }
  const result = await registerReportType(name);
  res
    .status(201)
    .json({ message: ` ${name} report type register to db success` });
};
module.exports = addReportType;
