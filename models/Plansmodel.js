const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    benefit1: {
        type: String,
        required: true,
    },
    benefit2: {
        type: String,
        required: true,
    },
    benefit3: {
        type: String,
        required: true,
    },
    benefit4: {
        type: String,
        required: true,
    },
    benefit5: {
        type: String,
        required: true,
    },
    benefit6: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Plan', planSchema);
