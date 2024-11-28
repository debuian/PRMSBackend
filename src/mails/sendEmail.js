const path = require("path");
const fs = require("fs");
const sendMail = require("./transpoter");
const fetchPatientReportDetailById = require("../libs/DatabaseHelpers/PatientReportDetail/fetchPatientReportDetailById");
const fetchReport_CreatorById = require("../libs/DatabaseHelpers/reportCreator/fetchReport_Creators");
const fetchPathologyById = require("../libs/DatabaseHelpers/pathology/fetchPathologyById");
const fetchPharmacyById = require("../libs/DatabaseHelpers/pharmacy/fetchPharmacybyId");
const fetchPatientReportFullDetails = require("../libs/DatabaseHelpers/PatientReportResult/fetchPatientReportFullDetails");
const formatFullPatientReportDetailsByExaminations = require("../utils/DataFromater/formatFullPatientReportDetailsByExaminations");
const generatePdf = require("../ReportPdf/generatePdf");

const sendEmail = async (req, res) => {
  const report_id = req.query.report_id;

  if (!report_id) {
    return res.status(400).json({ message: "Report ID is required" });
  }

  const fileName = `${report_id}.pdf`;
  const filePath = path.join(
    process.cwd(),
    "src",
    "ReportPdf",
    "PdfFiles",
    fileName
  );

  try {
    const result = await fetchPatientReportFullDetails(report_id);
    const data = formatFullPatientReportDetailsByExaminations(result.rows);

    if (!fs.existsSync(filePath)) {
      console.log(`File ${fileName} not found at ${filePath}`);
      await generatePdf(data[0]);
    }

    const report_creator_id = data[0].report_creator_id;
    const creator = await fetchReport_CreatorById(report_creator_id);
    const { creator_type, creator_id } = creator;
    let receiver_email;

    if (creator_type === "Pathology_Admin") {
      const admin = await fetchPathologyById(creator_id);
      receiver_email = admin.email;
    } else {
      const admin = await fetchPharmacyById(creator_id);
      receiver_email = admin.email;
    }
    if (!receiver_email) {
      return res.status(404).json({ message: "Receiver email not found" });
    }

    console.log(`Sending email to: ${receiver_email} with file: ${fileName}`);
    await sendMail(receiver_email, fileName);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in sending email:", error);
    return res
      .status(500)
      .json({ message: "Email sending failed", error: error.message });
  }
};

module.exports = sendEmail;
