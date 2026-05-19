const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String, // Format: YYYY-MM
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  categoryLimits: [{
    category: {
      type: String,
      enum: ['Food', 'Shopping', 'Bills', 'Travel', 'Entertainment', 'Others']
    },
    limit: {
      type: Number
    }
  }]
}, { timestamps: true });

// Ensure one budget per user per month
budgetSchema.index({ user: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
