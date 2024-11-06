const BuyProperty = require("../models/BuyProperty");

// Create a new property
exports.createBuyProperty = async (req, res) => {
  try {
    const {
        lookingFor,
        wantTo,
        propertyType,
        bedrooms,
        city,
        budget,
        name,
        mobileNumber,
        emailId,
        iAm,
        postedBy
    } = req.body;

    const property = new BuyProperty({
        lookingFor,
        wantTo,
        propertyType,
        bedrooms,
        city,
        budget,
        name,
        mobileNumber,
        emailId,
        iAm,
        postedBy
    });

    await property.save();
    return res
      .status(200)
      .json({
        "err": false, 
        "msg": "Thanks!, we will get back to you in 2 to 3 business days",
        property });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ "err": true, msg: error.message });
  }
};
