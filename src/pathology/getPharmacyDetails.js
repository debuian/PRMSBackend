const fetchAllPharmacy = require("../libs/DatabaseHelpers/pharmacy/fetchAllPharmacy");

const getPharmacyDetails = async (req, res) => {
  let response = {
    message: "Internal server error",
    success: false,
    data: null,
  };

  try {
    const datas = await fetchAllPharmacy();
    const sanitizedData = datas.map((data) => {
      const { password, ...userData } = data;
      return userData;
    });

    if (sanitizedData.length > 0) {
      response.message = "Fetch pharmacy data success";
      response.success = true;
      response.data = sanitizedData;
    } else {
      response.message = "No pharmacy data found";
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(response);
  }
};

module.exports = getPharmacyDetails;
