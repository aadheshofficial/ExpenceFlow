import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';

const BudgetForm = ({ onClose }) => {
  const { budget, updateBudget } = useContext(ExpenseContext);
  const [limit, setLimit] = useState(budget?.limit || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (budget) {
      setLimit(budget.limit);
    }
  }, [budget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (limit === '') {
      setError('Please enter a valid amount');
      return;
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const res = await updateBudget({ month: currentMonth, limit: Number(limit) });
    
    if (res.success) {
      if (onClose) onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Monthly Spending Limit (₹)</label>
        <input 
          type="number" 
          className="form-control form-control-lg" 
          value={limit} 
          onChange={(e) => setLimit(e.target.value)} 
          min="0" 
          step="0.01" 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-2">Update Budget</button>
    </form>
  );
};

export default BudgetForm;
