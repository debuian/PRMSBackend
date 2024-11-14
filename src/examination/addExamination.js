const registerExamination = require("../libs/DatabaseHelpers/examination/registerExamination");

const addExamination = async (req, res) => {
  const {
    name,
    report_type_id,
    category,
    normal_range_min,
    normal_range_max,
    unit,
  } = req.body;
  const result = await registerExamination(
    name,
    report_type_id,
    category,
    normal_range_min,
    normal_range_max,
    unit
  );
  const insertedExamination = result.rows[0];
  res.status(201).json({
    message: "Examination registered successfully",
    examination: insertedExamination,
  });
};

module.exports = addExamination;
