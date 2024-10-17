const express = require('express');
const multer = require('multer');
const router = express.Router();
const propertyController = require('../Controller/Propertiecontroller');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// CRUD Routes
router.post('/', upload.single('image'), propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', upload.single('image'), propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
