const express = require('express');
const router = express.Router();
const planController = require('../Controller/UploadImg');

// CRUD Routes
router.post('/uploadimg', planController.createBuyProperty); // Create

module.exports = router;
