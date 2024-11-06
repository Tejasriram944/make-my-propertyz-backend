const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, },
  otp: { type: String, },
  role: {
    type: Number,
    default: 0,
  },
}, { collection: 'users' });  // Explicitly set the collection name

const User = mongoose.model('User', userSchema);

module.exports = User;
