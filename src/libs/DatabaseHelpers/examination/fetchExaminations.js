const dbClient = require("../../../../database/database");

async function fetchExaminations() {
  const fetchQuery = `
SELECT 
    e.*,  -- Select all columns from Examinations
    rt.id AS report_type_id,
    rt.name AS report_type_name
FROM 
    Examinations e
JOIN 
    Report_Types rt 
    ON e.report_type_id = rt.id
ORDER BY 
    e.id ASC;  -- Sort by the Examinations id in ascending order

`;
  try {
    const result = await dbClient.query(fetchQuery);
    return result;
  } catch (error) {
    console.error("Error fetching examinations:", error);
    throw error;
  }
}

module.exports = fetchExaminations;
