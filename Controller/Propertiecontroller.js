const Property = require("../models/Propertiesmodel");
// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const {
      propertyType,
      budgetRange,
      price,
      area,
      plotArea,
      constructionStatus,
      furnishing,
      description,
      lookingto,
      verifiedByMMP,
      floorPlanPic,
      interiorPic,
      exteriorPic,
      coverPic,
      postedBy
    } = req.body;
    // const image = req.file ? req.file.filename : null;

    // if (!image) return res.status(400).send("Image is required!");

    const property = new Property({
      propertyType,
      image:coverPic,
      budgetRange,
      price:parseInt(price),
      area,
      plotArea,
      constructionStatus,
      furnishing,
      description,
      lookingto,
      verifiedByMMP,
      floorPlanPic,
      interiorPic,
      exteriorPic,
      coverPic,
      postedBy
    });

    await property.save();
    return res
      .status(200)
      .json({
        "err": false, 
        "msg": "Property created successfully!",
        property });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ "err": true, msg: error.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
    .populate('postedBy', '_id username email');
    // const properties = await Property.find().sort({ created: -1 });
    res.status(200).json({
      "err": false,
      "msg": "All Success!",
      properties:properties.reverse()
    });
  } catch (error) {
    res.status(500).json({ message: error.message, "err": true });
  }
};

// Get a single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const {
      propertyType,
      budgetRange,
      price,
      area,
      plotArea,
      constructionStatus,
      furnishing,
      description,
    } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const updatedData = {
      propertyType,
      image,
      budgetRange,
      price,
      area,
      plotArea,
      constructionStatus,
      furnishing,
      description,
    };

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// rejected check a property
exports.isRejectedProperty = async (req, res) => {
  try {
    const property = await Property.updateOne(
      { _id: req.body.id },
      { $set: {isRejected: req.body.status } }
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
    const property = await Property.updateOne(
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


// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
