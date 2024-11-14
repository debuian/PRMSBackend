const deleteExaminationById = require("../libs/DatabaseHelpers/examination/deleteExaminationById");

const removeExamination = async (req, res) => {
  const examinationId = req.params.id;
  // Validate input
  if (!examinationId) {
    return res.status(400).json({ message: "examinationId is required" });
  }
  try {
    const result = await deleteExaminationById(examinationId);
    res.status(200).json({
      message: "Examination deleted successfully",
      result: result.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = removeExamination;
