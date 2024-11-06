const PropertyDetails = require("../models/PropertyDetails");

// Create a new property
exports.createPropertyDetails = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      emailId,
      propertyFor,
      propertyType,
      state,
      projectSocietyName,
      address,
      saleType,
      ownerShip,
      numberofFloors,
      availability,
      propertyonFloor,
      builtupArea,
      carpetArea,
      superArea,
      plotLandArea,
      expectedPrice,
      bookingAmount,
      maintenanceCharges,
      noofBedrooms,
      noofBathrooms,
      noofBalconies,
      propertyDescriptions,
      postedBy,
      imgurl,
      videourl,
      carpetAreaVal,
      plotLandAreaVal,
      builtupVal,
      iAm,
      verifiedByMMP,
    } = req.body;

    const property = new PropertyDetails({
      name,
      mobileNumber,
      emailId,
      propertyFor,
      propertyType,
      state,
      projectSocietyName,
      address,
      saleType,
      ownerShip,
      numberofFloors,
      availability,
      propertyonFloor,
      builtupArea,
      carpetArea,
      superArea,
      plotLandArea,
      expectedPrice,
      bookingAmount,
      maintenanceCharges,
      noofBedrooms,
      noofBathrooms,
      noofBalconies,
      propertyDescriptions,
      postedBy,
      imageUrl:imgurl,
      videourl,
      carpetAreaVal,
      plotLandAreaVal,
      builtupVal,
      iAm,
      "isDraft":true,
      "verifiedByMMP": verifiedByMMP === true ? verifiedByMMP : false,
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
exports.getPropertyDetails = async (req, res) => {
  try {
    const properties = await PropertyDetails.find()
    .populate('postedBy', '_id username email role');
    return res.status(200).json({
      "err": false,
      "msg": "All Success!",
      properties:properties.reverse()
    });
  } catch (error) {
    res.status(500).json({ message: error.message, "err": true });
  }
};

// Get all Inspection properties
exports.getDraftPropertyDetails = async (req, res) => {
  try {
    const properties = await PropertyDetails.find({isDraft:false})
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

// Get all Inspection properties
exports.getPropertyById = async (req, res) => {
  try {
    const properties = await PropertyDetails.find({postedBy:req.body.id})
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

// rejected check a property
exports.isRejectedProperty = async (req, res) => {
  try {
    const property = await PropertyDetails.updateOne(
      { _id: req.body.id },
      { $set: {isDraft: req.body.status } }
  );
  // findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({err:true, msg: "Property not found" });

    return res.status(200).json({ err:false, msg: `Property ${req.body.status ? 'rejected':'approve'}!` });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// verify check a property
exports.isVerifyProperty = async (req, res) => {
  try {
    const property = await PropertyDetails.updateOne(
      { _id: req.body.id },
      { $set: {verifiedByMMP: true } }
  );
  // findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({err:true, msg: "Property not found" });

    return res.status(200).json({ err:false, msg: `Property is Verifed!` });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};