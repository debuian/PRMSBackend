const path = require("path");
const sendMail = require("./transpoter");
const fetchPatientReportDetailById = require("../libs/DatabaseHelpers/PatientReportDetail/fetchPatientReportDetailById");
const fetchReport_CreatorById = require("../libs/DatabaseHelpers/reportCreator/fetchReport_Creators");
const fetchPathologyById = require("../libs/DatabaseHelpers/pathology/fetchPathologyById");
const fetchPharmacyById = require("../libs/DatabaseHelpers/pharmacy/fetchPharmacybyId");
const fs = require("fs");

const sendEmail = async (req, res) => {
  const report_id = req.query.report_id;
  const fileName = `${report_id}.pdf`;
  const filePath = path.join(
    process.cwd(),
    "src",
    "ReportPdf",
    "PdfFiles",
    fileName
  );

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log(`File ${fileName} not found at ${filePath}`);
    return res.status(404).json({ message: "File Not Found" });
  }

  try {
    const reportDeatils = await fetchPatientReportDetailById(report_id);
    const report_creator_id = reportDeatils.report_creator_id;

    const creator = await fetchReport_CreatorById(report_creator_id);
    const { creator_type, creator_id } = creator;
    let reciver_email;

    if (creator_type === "Pathology_Admin") {
      const admin = await fetchPathologyById(creator_id);
      reciver_email = admin.email;
    } else {
      const admin = await fetchPharmacyById(creator_id);
      reciver_email = admin.email;
    }

    console.log(`Sending email to: ${reciver_email} with file: ${fileName}`);

    // Send the email with the report attached
    await sendMail(reciver_email, fileName);

    // Send success response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(500).json({ message: "Email sent failed" });
  }
};

module.exports = sendEmail;
