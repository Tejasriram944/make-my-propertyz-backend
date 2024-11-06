const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const propertySchema = new mongoose.Schema({
    name:{
        type: String,
    },
    emailId:{
        type: String,
    },
    mobileNumber:{
        type: String,
    },
    propertyFor:{
        type: String,
    },
    propertyType: {
        type: String,
    },
    state: {
        type: String,
    },
    projectSocietyName: {
        type: String,
    },
    address: {
        type: String,
    },
    saleType: {
        type: String,
    },
    ownerShip: {
        type: String,
    },
    numberofFloors: {
        type: String,
    },
    availability: {
        type: String,
    },
    propertyonFloor: {
        type: String,
    },
    // possessionBy: {
    //     type: String,
    // },
    builtupArea:{
        type: String,
    },
    carpetArea:{
        type: String,
    },
    superArea:{
        type: String,
    },
    plotLandArea:{
        type: String,
    },
    expectedPrice:{
        type: String,
    },
    bookingAmount:{
        type: String,
    },
    maintenanceCharges:{
        type: String,
    },

    noofBedrooms:{
        type: String,
    },
    noofBathrooms:{
        type: String,
    },
    noofBalconies:{
        type: String,
    },
    carpetAreaVal:{
        type: String,
    },
    imageUrl: {
        type: [String],
      },
    videoUrl: [String],
    carpetAreaVal:{
        type: String,
    },
    propertyDescriptions:{
        type: String,
    },
    builtupVal:{
        type: String,
    },
    iAm: { type: String, required: true, },
    isDraft: { type: Boolean, default: true }, // isDraft is true means not approved
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
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('PropertyDetails', propertySchema);
