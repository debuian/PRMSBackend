const fetchExaminations = require("../libs/DatabaseHelpers/examination/fetchExaminations");

const getExaminations = async (req, res) => {
  try {
    const result = await fetchExaminations();
    res.status(200).json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getExaminations;
