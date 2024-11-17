const formatFullPatientReportDetails = (rawData) => {
  // Initialize a map to store the formatted data
  const formattedData = {};

  // Iterate over each row in the result
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

    // If this patient_report_id doesn't exist in the formatted data, initialize it
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
        examinations: [],
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

  // Convert the map values to an array to return the formatted result
  return Object.values(formattedData);
};

module.exports = formatFullPatientReportDetails;
