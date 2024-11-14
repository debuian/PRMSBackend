const dbClient = require("../../../database/database");

const reportExaminationSchema = async () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS report_examinations (
        id SERIAL PRIMARY KEY,
        examination_id INT NOT NULL,
        patient_report_id  INT NOT NULL,
        FOREIGN KEY (examination_id) REFERENCES Examinations(id) ON DELETE CASCADE,
        FOREIGN KEY (patient_report_id ) REFERENCES Patient_Report_Details(id) ON DELETE CASCADE
    );
    `;
  try {
    const result = await dbClient.query(createTablesQuery);
    console.log(
      "report_examinations Tables created successfully or already exist"
    );
  } catch (e) {
    console.error("Error creating tables:", e);
  }
};
module.exports = reportExaminationSchema;
