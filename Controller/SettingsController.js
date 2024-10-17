const Settings = require('../models/SettingsModel');
const fs = require('fs');
const path = require('path');

// POST: Create new settings (initial profile creation)
exports.createSettings = async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, email } = req.body;
  
      // Check if phone number or email already exists
      const existingUser = await Settings.findOne({ 
        $or: [{ phoneNumber }, { email }] 
      });
  
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Phone number or email already exists',
        });
      }
  
      // Handle file upload (if present)
      let profilePicture = req.file ? req.file.path : null;
  
      // Create new user settings
      const newSettings = new Settings({
        firstName,
        lastName,
        phoneNumber,
        email,
        profilePicture,
      });
  
      // Save the new settings to the database
      const savedSettings = await newSettings.save();
  
      return res.status(201).json({
        status: 'success',
        message: 'Profile created successfully',
        data: savedSettings,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Server error' });
    }
  };
  
  

// PUT: Update existing settings (update profile)
exports.updateSettings = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, phoneNumber, email } = req.body;
  
      // Check if phone number or email is already used by another user
      const existingUser = await Settings.findOne({ 
        _id: { $ne: id },  // Exclude the current user's ID
        $or: [{ phoneNumber }, { email }] 
      });
  
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Phone number or email already exists',
        });
      }
  
      // Handle file upload (if present)
      let profilePicture = req.file ? req.file.path : undefined;
  
      // Find the user settings by ID and update them
      const updatedSettings = await Settings.findByIdAndUpdate(
        id,
        { firstName, lastName, phoneNumber, email, profilePicture },
        { new: true } // Return the updated document
      );
  
      if (!updatedSettings) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: updatedSettings,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Server error' });
    }
  };

  
