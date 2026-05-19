const Budget = require('../models/Budget');

// @desc    Get user budget for a specific month
// @route   GET /api/budgets/:month
// @access  Private
const getBudget = async (req, res) => {
  try {
    const { month } = req.params; // Format: YYYY-MM
    let budget = await Budget.findOne({ user: req.user._id, month });

    if (!budget) {
      // Create a default budget if not found
      budget = new Budget({
        user: req.user._id,
        month,
        limit: 0,
        categoryLimits: []
      });
      await budget.save();
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Set or update budget
// @route   POST /api/budgets
// @access  Private
const setBudget = async (req, res) => {
  try {
    const { month, limit, categoryLimits } = req.body;

    let budget = await Budget.findOne({ user: req.user._id, month });

    if (budget) {
      // Update
      budget.limit = limit !== undefined ? limit : budget.limit;
      if (categoryLimits) {
        budget.categoryLimits = categoryLimits;
      }
      const updatedBudget = await budget.save();
      res.json(updatedBudget);
    } else {
      // Create
      const newBudget = new Budget({
        user: req.user._id,
        month,
        limit: limit || 0,
        categoryLimits: categoryLimits || []
      });
      const createdBudget = await newBudget.save();
      res.status(201).json(createdBudget);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getBudget,
  setBudget
};
