const registerPatient = require("../libs/DatabaseHelpers/patient/registerPatient");
const registerPatientReportDetail = require("../libs/DatabaseHelpers/PatientReportDetail/registerPatientReportDetail");
const registerPatientReportResult = require("../libs/DatabaseHelpers/PatientReportResult/registerPatientReportResult");
const registerReport_Creator = require("../libs/DatabaseHelpers/reportCreator/registerReport_Creators");
const register_report_examinations = require("../libs/DatabaseHelpers/reportExaminations/register_report_examinations");

const addPatientReportDetails = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user_origin = req.user.origin;
    const { first_name, middle_name, last_name, gender, age, examination_id } =
      req.body;

    const patientDetails = { first_name, middle_name, last_name, gender, age };
    const reportCreatorDetails = {
      creator_id: user_id,
      creator_type: user_origin,
    };
    const [registerPatientResult, registerReportCreatorResult] =
      await Promise.allSettled([
        registerPatient(patientDetails),
        registerReport_Creator(reportCreatorDetails),
      ]);

    if (
      registerPatientResult.status !== "fulfilled" ||
      registerPatientResult.value.rows.length === 0
    ) {
      return res.status(400).json({ message: "Failed to register patient" });
    }
    if (
      registerReportCreatorResult.status !== "fulfilled" ||
      registerReportCreatorResult.value.rows.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Report Creator Registration failed" });
    }

    const patient_id = registerPatientResult.value.rows[0].id;
    const report_creator_id = registerReportCreatorResult.value.rows[0].id;

    const patient_report_details = {
      patient_id,
      report_creator_id,
    };
    const resultPatientreportDeatils = await registerPatientReportDetail(
      patient_report_details
    );
    const patient_report_id = resultPatientreportDeatils.rows[0].id;

    const promises = examination_id.map((e_id) => {
      const reportExaminationDetails = {
        patient_report_id,
        examination_id: e_id,
      };
      return register_report_examinations(reportExaminationDetails);
    });

    const results = await Promise.allSettled(promises);
    const report_examination_ids = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value.rows[0].id;
      } else {
        console.error("Error in one of the promises: ", result.reason);
        return null;
      }
    });

    const report_result_Results = report_examination_ids.map((item) => {
      const report_result_details = {
        report_examination_id: item,
        report_result: "Nothing",
      };
      return registerPatientReportResult(report_result_details);
    });
    const report_result_output = await Promise.allSettled(
      report_result_Results
    );
    const allSuccessful = report_result_output.every(
      (result) => result.status === "fulfilled"
    );

    if (allSuccessful) {
      return res.status(201).json({
        message: "Patient report Register to DB successfully",
        reportResults: report_result_output.map(
          (result) => result.value.rows[0]
        ),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Patient report Register to DBfailed" });
    }
  } catch (error) {
    console.error("Error creating patient report:", error);
    return res.status(500).json({
      message: "Error creating patient report",
      error: error.message,
    });
  }
};

module.exports = addPatientReportDetails;
