const updatePatient = require("../libs/DatabaseHelpers/patient/updatePatient");

const editPatientDetails = async (req, res) => {
  try {
    const id = req.query.patientId;

    const editDetails = req.body;

    const result = await updatePatient(id, editDetails);
    if (result && result.rows && result.rows.length > 0) {
      res.status(200).json({
        message: "Patients Details Updated successfully",
        patients: result.rows,
      });
    } else {
      // If no patients found, return an empty array
      res.status(404).json({
        message: "No patients found",
        patients: [],
      });
    }
  } catch (error) {
    console.error("Error Updating patients:", error);
    res
      .status(500)
      .json({ message: "Error Updating patients", error: error.message });
  }
};
module.exports = editPatientDetails;
