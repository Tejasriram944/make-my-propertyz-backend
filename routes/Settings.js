const express = require('express');
const multer = require('multer');
const path = require('path');
const settingsController = require('../Controller/SettingsController');

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in 'uploads/profilePictures' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the file name
  }
});

const upload = multer({ 
  storage, 
  limits: { fileSize: 1 * 1024 * 1024 }, // Max file size 1MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
    }
  }
});

const router = express.Router();

// POST: Create settings (initial profile creation)
router.post('/', upload.single('profilePicture'), settingsController.createSettings);

// PUT: Update settings (update profile)
router.put('/:id', upload.single('profilePicture'), settingsController.updateSettings);


module.exports = router;
