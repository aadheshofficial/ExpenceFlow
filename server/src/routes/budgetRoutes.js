const express = require('express');
const router = express.Router();
const { getBudget, setBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, setBudget);

router.route('/:month')
  .get(protect, getBudget);

module.exports = router;
