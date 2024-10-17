const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Store the image path or URL
        required: true,
    },
    budgetRange: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    plotArea: {
        type: String,
        required: true,
    },
    constructionStatus: {
        type: String,
        required: true,
    },
    furnishing: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Property', propertySchema);
