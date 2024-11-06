const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const buyProperty = new mongoose.Schema({
    lookingFor: { type: String, required: true, },
    wantTo: { type: String, required: true, },
    propertyType: { type: String, required: true, },
    bedrooms: { type: String, required: true, },
    city: { type: String, required: true, },
    budget: { type: String, required: true, },
    name: { type: String, required: true, },
    mobileNumber: { type: String, required: true, },
    emailId: { type: String, required: true, },
    iAm: { type: String, required: true, },
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
},{ timestamps: true }, { collection: 'BuyProperty' });  // Explicitly set the collection name

const BuyProperty = mongoose.model('BuyProperty', buyProperty);

module.exports = BuyProperty;