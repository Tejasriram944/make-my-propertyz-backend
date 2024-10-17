const Property = require('../models/Propertiesmodel');

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { propertyType, budgetRange, price, area, plotArea, constructionStatus, furnishing, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) return res.status(400).send("Image is required!");

        const property = new Property({
            propertyType,
            image,
            budgetRange,
            price,
            area,
            plotArea,
            constructionStatus,
            furnishing,
            description
        });

        await property.save();
        res.status(201).json({ message: 'Property created successfully', property });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single property
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    try {
        const { propertyType, budgetRange, price, area, plotArea, constructionStatus, furnishing, description } = req.body;
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
            description
        };

        const property = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });

        res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
