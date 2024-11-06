const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const inspectionProperty = new mongoose.Schema({
    name: { type: String, required: true, },
    propertyName: { type: String, required: true, },
    completeAddress: { type: String, required: true, },
    country: { type: String, required: true, },
    state: { type: String, required: true, },
    city: { type: String, required: true, },
    mobileNumber: { type: String, required: true, },
    emailId: { type: String, required: true, },
    iAm: { type: String, required: true, },
    selectBookingDate: { type: String, required: true, },
    selectTime: { type: String, required: true, },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
},{ timestamps: true }, { collection: 'InspectionProperty' });  // Explicitly set the collection name

const InspectionProperty = mongoose.model('InspectionProperty', inspectionProperty);

module.exports = InspectionProperty;