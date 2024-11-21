const formatFullPatientReportDetails = require("./formatFullPatientReportDetails");

const formatFullPatientReportDetailsByExaminations = (rawData) => {
  const formattedData = {};

  // Iterate over each row in the raw data to structure the patient report
  rawData.forEach((row) => {
    const {
      patient_report_id,
      patient_id,
      first_name,
      middle_name,
      last_name,
      gender,
      age,
      report_creator_id,
      created_at,
      status,
      updated_at,
      report_examination_id,
      examination_id,
      report_result,
      examination_name,
      report_type_id,
      examination_category,
      examination_normal_range_min,
      examination_normal_range_max,
      examination_unit,
      report_type_name,
    } = row;

    // Initialize the report if it doesn't exist yet
    if (!formattedData[patient_report_id]) {
      formattedData[patient_report_id] = {
        patient_report_id,
        report_creator_id,
        created_at,
        status,
        updated_at,
        patient: {
          patient_id,
          first_name,
          middle_name,
          last_name,
          gender,
          age,
        },
        examinations: [], // Initial empty array for examinations
      };
    }

    // Add the examination result to the corresponding patient report
    formattedData[patient_report_id].examinations.push({
      report_examination_id,
      examination: {
        id: examination_id,
        name: examination_name,
        category: examination_category,
        normal_range_min: examination_normal_range_min,
        normal_range_max: examination_normal_range_max,
        unit: examination_unit,
        report_type: {
          id: report_type_id,
          name: report_type_name,
        },
      },
      result: {
        report_result,
      },
    });
  });

  // Convert the formatted data to an array and then group the examinations by report type name
  const patientReports = Object.values(formattedData).map((report) => {
    const groupedExaminations = report.examinations.reduce(
      (acc, examination) => {
        const reportTypeName = examination.examination.report_type.name;
        if (!acc[reportTypeName]) {
          acc[reportTypeName] = [];
        }
        acc[reportTypeName].push({
          report_examination_id: examination.report_examination_id,
          examination: {
            id: examination.examination.id,
            name: examination.examination.name,
            category: examination.examination.category,
            normal_range_min: examination.examination.normal_range_min,
            normal_range_max: examination.examination.normal_range_max,
            unit: examination.examination.unit,
          },
          result: examination.result,
        });
        return acc;
      }
    );
    return {
      ...report,
      examinations: groupedExaminations,
    };
  });

  return patientReports;
};

module.exports = formatFullPatientReportDetailsByExaminations;
