const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const propertySchema = new mongoose.Schema({
    lookingto:{
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Store the image path or URL
        // required: true,
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
    verifiedByMMP:{
        type: Boolean,
        default: false,
        required: true
    },
    isRejected:{
        type: Boolean,
        default: false,
        required: true
    },
    coverPic:{
        type: String,
        required: true,
    },
    exteriorPic:{
        type: String,
        required: true,
    },
    interiorPic:{
        type: String,
        required: true,
    },
    floorPlanPic:{
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Property', propertySchema);
