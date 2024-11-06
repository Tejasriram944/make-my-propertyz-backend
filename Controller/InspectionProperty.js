const InspectionProperty = require("../models/InspectionProperty");

// Create a new property
exports.createInspectionProperty = async (req, res) => {
  try {
    const {
        name,
        propertyName,
        completeAddress,
        country,
        state,
        city,
        mobileNumber,
        emailId,
        iAm,
        selectBookingDate,
        selectTime,
        postedBy
    } = req.body;

    const property = new InspectionProperty({
        name,
        propertyName,
        completeAddress,
        country,
        state,
        city,
        mobileNumber,
        emailId,
        iAm,
        selectBookingDate,
        selectTime,
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

// Get all Inspection properties
exports.getInspectionProperties = async (req, res) => {
  try {
    const properties = await Property.find()
    .populate('postedBy', '_id username email');
    return res.status(200).json({
      "err": false,
      "msg": "All Success!",
      properties:properties.reverse()
    });
  } catch (error) {
    res.status(500).json({ message: error.message, "err": true });
  }
};