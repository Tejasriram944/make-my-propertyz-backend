const Plan = require('../models/Plansmodel');

// Create a new plan
exports.createPlan = async (req, res) => {
    try {
        const { price, duration, benefit1, benefit2, benefit3, benefit4, benefit5, benefit6 } = req.body;

        const plan = new Plan({
            price,
            duration,
            benefit1,
            benefit2,
            benefit3,
            benefit4,
            benefit5,
            benefit6
        });

        await plan.save();
        res.status(201).json({ message: 'Plan created successfully', plan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all plans
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single plan
exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a plan
exports.updatePlan = async (req, res) => {
    try {
        const { price, duration, benefit1, benefit2, benefit3, benefit4, benefit5, benefit6 } = req.body;

        const updatedData = {
            price,
            duration,
            benefit1,
            benefit2,
            benefit3,
            benefit4,
            benefit5,
            benefit6
        };

        const plan = await Plan.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        res.status(200).json({ message: 'Plan updated successfully', plan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
