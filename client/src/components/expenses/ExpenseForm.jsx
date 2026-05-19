import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';

const ExpenseForm = ({ onClose }) => {
  const { addExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }
    const res = await addExpense(formData);
    if (res.success) {
      onClose(); // Close modal on success
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Amount (₹)</label>
        <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} min="0" step="0.01" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
          {formData.type === 'expense' ? (
            <>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </>
          ) : (
            <>
              <option value="Salary">Salary</option>
              <option value="Investment">Investment</option>
              <option value="Others">Others</option>
            </>
          )}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save Transaction</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
