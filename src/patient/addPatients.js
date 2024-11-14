const registerPatient = require("../libs/DatabaseHelpers/patient/registerPatient");

const addPatients = async (req, res) => {
  const { first_name, middle_name, last_name, gender, age } = req.body;

  try {
    const result = await registerPatient({
      first_name,
      middle_name,
      last_name,
      gender,
      age,
    });

    if (result && result.rows && result.rows.length > 0) {
      // Send success response with the created patient record
      res.status(201).json({
        message: "Patient registered successfully",
        patient: result.rows[0], // Assuming the patient data is returned in the first row
      });
    } else {
      // Handle case where no data is returned
      res.status(400).json({ message: "Failed to register patient" });
    }
  } catch (error) {
    console.error("Error registering patient:", error);
    res
      .status(500)
      .json({ message: "Error registering patient", error: error.message });
  }
};
module.exports = addPatients;
