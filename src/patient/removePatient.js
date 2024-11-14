const deletePatientById = require("../libs/DatabaseHelpers/patient/deletePatientById");

const removePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deletePatientById(id);
    console.log(result);

    if (result && result.rowCount == 1) {
      res.status(200).json({
        message: "Patient details deleted successfully",
        pateint: result.rows,
      });
    } else {
      res.status(404).json({
        message: "No patient found",
        pateint: [],
      });
    }
  } catch (error) {
    console.error("Error deleting patients details", error);
    res.status(500).json({
      message: "Error deleting patients details",
      error: error.message,
    });
  }
};
module.exports = removePatient;
