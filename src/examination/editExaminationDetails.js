const updateExamination = require("../libs/DatabaseHelpers/examination/updateExamination");

const editExaminationDetails = async (req, res) => {
  const examinationId = req.query.examinationId;
  if (!examinationId) {
    return res.status(400).json({ message: "examinationId is required" });
  }
  const {
    name,
    report_type_id,
    category,
    normal_range_min,
    normal_range_max,
    unit,
  } = req.body;

  try {
    const result = await updateExamination(
      examinationId,
      name,
      report_type_id,
      category,
      normal_range_min,
      normal_range_max,
      unit
    );
    res.status(200).json({
      message: "Examination updated successfully",
      result: result.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = editExaminationDetails;
