const fetchPatients = require("../libs/DatabaseHelpers/patient/fetchPatients");

const getPatients = async (req, res) => {
  try {
    // Fetch all patients
    const result = await fetchPatients();

    // Check if the result has rows (patients data)
    if (result && result.rows && result.rows.length > 0) {
      // Send success response with the patients data
      res.status(200).json({
        message: "Patients fetched successfully",
        patients: result.rows, // Assuming the patients data is in the `rows` property
      });
    } else {
      // If no patients found, return an empty array
      res.status(404).json({
        message: "No patients found",
        patients: [],
      });
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ message: "Error fetching patients", error: error.message });
  }
};

module.exports = getPatients;
