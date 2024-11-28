const dbClient = require("../../../../database/database");

const updateIsVerified = async (id, isVerified) => {
  const updateQuery = `
 UPDATE Pharmacy_Admins
    SET isVerified = $1
    WHERE id = $2
       

  `;

  try {
    const result = await dbClient.query(updateQuery, [isVerified, id]);
    if (result.rowCount > 0) {
      console.log("Pharmacy Admin's isVerified status updated successfully");
    } else {
      console.log("No Pharmacy Admin found with the given ID");
    }
    return result;
  } catch (error) {
    console.error("Error updating isVerified status:", error);
  }
};

module.exports = updateIsVerified;
