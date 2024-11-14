const fetch_report_examinations = require("../libs/DatabaseHelpers/reportExaminations/fetch_report_Examinations");

const getReportExaminationDetails = async (req, res) => {
  const report_id = req.query.report_id;
  if (!report_id) {
    return res.status(400).json({ message: "report_id is required" });
  }
  if (isNaN(report_id)) {
    return res
      .status(400)
      .json({ message: "report_id must be a valid integer" });
  }
  try {
    const result = await fetch_report_examinations(report_id);

    const formattedData = {
      report_examinations: result.map((item) => ({
        id: item.report_examination_id,
        patient_report_id: item.patient_report_id,
        examination: {
          id: item.examination_id,
          examination_name: item.examination_name,
          category: item.category,
          normal_range_min: item.normal_range_min,
          normal_range_max: item.normal_range_max,
          unit: item.unit,
          result: {
            id: item.report_examination_result_id,
            report_result: item.report_result,
          },
        },
      })),
    };

    return res.status(201).json({
      message: "Result fetched successfully",
      result: formattedData,
    });
  } catch (error) {
    console.error("Error fetching report examination details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getReportExaminationDetails;
