const updateIsVerified = require("../libs/DatabaseHelpers/pharmacy/updateIsVerified");

const updatePharmacyIsVerified = async (req, res) => {
  let response = {
    message: "Internal server error",
    success: false,
    data: null,
  };
  const { id, isverified } = req.body;
  console.log({ id, isverified });

  try {
    const result = await updateIsVerified(id, isverified);
    if (result.rowCount > 0) {
      response.message =
        "Pharmacy Admin's isVerified status updated successfully";
      response.success = true;
      response.data = result.rows;
    } else {
      response.message = "No Pharmacy Admin found with the given ID";
    }
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(response);
  }
};

module.exports = updatePharmacyIsVerified;
