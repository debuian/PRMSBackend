const { log } = require("console");
const nodemailer = require("nodemailer");
const path = require("path");

// Create transporter with correct configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // Correct host for Gmail
  port: 587,
  secure: false, // TLS
  auth: {
    user: "savage89100@gmail.com", // Your email
    pass: "lnln gmbi yxue kysc",
    // Your email password
  },
});

// Function to send the email
const sendMail = async (reciver_email, fileName) => {
  try {
    await transporter.sendMail({
      from: {
        name: "PRMS", // Set the name of your organization
        address: "savage89100@gmail.com",
      },
      to: `${reciver_email}`, // Receiver's email
      subject: "Patient Report",
      text: "Success", // Text content of the email
      html: "<h1>Patient Report</h1>", // HTML content of the email
      attachments: [
        {
          filename: `${fileName}`, // Filename of the attached file
          path: path.join(
            process.cwd(),
            "src",
            "ReportPdf",
            "PdfFiles",
            `${fileName}`
          ), // Full path to the PDF
          contentType: "application/pdf", // Correct MIME type for PDFs
        },
      ],
    }); // Pass mailOptions here
    console.log("Success: Email sent");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Call the sendMail function
module.exports = sendMail;
