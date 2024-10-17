const express = require('express');
const router = express.Router();
const planController = require('../Controller/Planscont');

// CRUD Routes
router.post('/', planController.createPlan); // Create
router.get('/', planController.getAllPlans); // Read (All)
router.get('/:id', planController.getPlanById); // Read (By ID)
router.put('/:id', planController.updatePlan); // Update
router.delete('/:id', planController.deletePlan); // Delete

module.exports = router;
