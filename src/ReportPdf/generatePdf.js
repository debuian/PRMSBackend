const puppeteer = require("puppeteer");
const path = require("path");
const compileDataAndHbs = require("./compileDataAndHbs");

const generatePdf = async (data) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const content = await compileDataAndHbs("template", data);
    await page.setContent(content);
    await page.emulateMediaType("screen");
    const pdfBuffer = await page.pdf({
      path: path.join(
        process.cwd(),
        "src",
        "ReportPdf",
        "PdfFiles",
        `${data.patient_report_id}.pdf`
      ),
      format: "A4",
      printBackground: true,
    });
    // console.log("PDF Buffer Size:", pdfBuffer.length);
    // console.log("PDF generation done");
    await browser.close();
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

module.exports = generatePdf;
