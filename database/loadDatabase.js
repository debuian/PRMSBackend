const createPathologyTable = require("../src/pathology/dbSchema/pathologySchema");
const createPharmacyTable = require("../src/pharmacy/dbSchema/pharmacySchema");
const createPatientsTable = require("../src/patient/dbSchema/patientsSchema");
const createReportTypesTable = require("../src/reportType/dbSchema/reportTypeSchema");
const createExaminationsTable = require("../src/examination/dbSchema/examinationSchema");
const createReportCreatorsTable = require("../src/reportCreator/dbSchema/reportCreatordbSchema");
const createPatientReportDetailsTable = require("../src/PatientReportDetails/dbSchema/PatientReportDetailsdbSchema");
const createreportExaminationSchema = require("../src/reportExamination/dbSchema/reportExaminationSchema");
const createPatientReportResultsTable = require("../src/PatientReportResults/dbSchema/PatientReportResultsdbSchema");

async function createAllTables() {
  try {
    await createPathologyTable();
    await createPharmacyTable();
    await createPatientsTable();
    await createReportTypesTable();
    await createExaminationsTable();
    await createReportCreatorsTable();
    await createPatientReportDetailsTable();
    await createreportExaminationSchema();
    await createPatientReportResultsTable();
  } catch (e) {
    console.error("Error creating tables:", e);
  }
}

createAllTables();
