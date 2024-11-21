const generatePdf = require("./generatePdf");
const fetchPatientReportFullDetails = require("../libs/DatabaseHelpers/PatientReportResult/fetchPatientReportFullDetails");
const formatFullPatientReportDetailsByExaminations = require("../utils/DataFromater/formatFullPatientReportDetailsByExaminations");

const generateReportPdfById = async (req, res) => {
  try {
    const report_id = req.query.report_id;
    const result = await fetchPatientReportFullDetails(report_id);
    const data = formatFullPatientReportDetailsByExaminations(result.rows);
    const Pdfresult = await generatePdf(data[0]);
    res.status(200).json({
      message: "Pdf created succesfully",
      pdfLink: ` http://localhost:3000/pdfs/${report_id}.pdf`,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = generateReportPdfById;
