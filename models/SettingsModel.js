const mongoose = require('mongoose');

// Define the schema for the settings model
const settingsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String, default: null }, // Path to the uploaded profile picture
});

// Create a model from the schema
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
