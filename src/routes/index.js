const express = require("express");
const router = express.Router();

const pathologySignup = require("../pathology/signup");
const pathologyLogin = require("../pathology/login");
const pharmacySignup = require("../pharmacy/signup");
const pharmacyLogin = require("../pharmacy/login");
const addReportType = require("../reportType/addReportType");
const getReportTypes = require("../reportType/getReportTypes");
const editReportTypeDetails = require("../reportType/editReportTypeDetails");
const removeReportType = require("../reportType/removeReportType");
const addExamination = require("../examination/addExamination");
const getExaminations = require("../examination/getExaminations");
const editExaminationDetails = require("../examination/editExaminationDetails");
const removeExamination = require("../examination/removeExamination");
const addPatients = require("../patient/addPatients");
const getPatients = require("../patient/getPatients");
const editPatientDetails = require("../patient/editPatientDetails");
const removePatient = require("../patient/removePatient");
const addPatientReportDetails = require("../PatientReportDetails/addPatientReportDetail");
const validateToken = require("../libs/middleware/validateToken");
const getPatientReportDetails = require("../PatientReportDetails/getPatientReportDetails");
const editPatientReportDetails = require("../PatientReportDetails/editPatientReportDetails");
const removePatientReportDetail = require("../PatientReportDetails/removePatientReportDetail");
const addPatientReportResults = require("../PatientReportResults/addPatientReportResults");
const editPatientReportResults = require("../PatientReportResults/editPatientReportResults");
const getExaminationsByReportId = require("../examination/getExaminationsByReportId");
const getReportExaminationDetails = require("../reportExamination/getReportExaminationDetails");
const getPatientReportFullDetails = require("../PatientReportDetails/getPatientReportFullDetails");

router.post("/pathologysignup", pathologySignup);
router.post("/pathologylogin", pathologyLogin);

router.post("/pharmacySignUp", pharmacySignup);
router.post("/pharmacyLogin", pharmacyLogin);

// pathology admins
router.post("/addReportType", addReportType);
router.get("/getReportTypes", getReportTypes);
router.put("/editReportTypeDetails", editReportTypeDetails);
router.delete("/removeReportType/", removeReportType);

// pathology admins
router.post("/addExamination", addExamination);
router.get("/getExaminations", getExaminations);
router.get("/getExaminationsByReportId", getExaminationsByReportId);
router.put("/editExaminationDetails", editExaminationDetails);
router.delete("/removeExamination/:id", removeExamination);

router.post("/addPatients", addPatients);
router.get("/getPatients", getPatients);
router.put("/editPatientDetails", editPatientDetails);
router.delete("/removePatient/:id", removePatient);

router.post("/addPatientReportDetail", validateToken, addPatientReportDetails);
router.get("/getPatientReportDetails", getPatientReportDetails);
router.put("/editPatientReportDetails", editPatientReportDetails);
router.delete(
  "/removePatientReportDetail/:PatientReportDetailId",
  validateToken,
  removePatientReportDetail
);

router.post(
  "/addPatientReportResults/:report_detail_id",
  addPatientReportResults
);
router.put("/editPatientReportResults", editPatientReportResults);

router.get(
  "/getReportExaminationDetailsByPatientReportId",
  getReportExaminationDetails
);

router.get("/pro", validateToken, (req, res) => {
  res.send(req.user);
});

router.get("/FullReportDetails", getPatientReportFullDetails);

module.exports = router;
