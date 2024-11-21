const path = require("path");
const fs = require("fs").promises;
const hbs = require("handlebars");

const compileDataAndHbs = async (templateName, data) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "ReportPdf",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

module.exports = compileDataAndHbs;
