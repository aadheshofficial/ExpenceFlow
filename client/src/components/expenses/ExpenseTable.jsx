import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';

const ExpenseTable = ({ filter }) => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  let filteredExpenses = expenses;
  if (filter !== 'All') {
    filteredExpenses = expenses.filter(e => e.type === filter.toLowerCase());
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteExpense(id);
    }
  };

  if (filteredExpenses.length === 0) {
    return <div className="text-center py-5 text-muted">No transactions found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-end">Amount</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map(expense => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td><span className="badge bg-secondary">{expense.category}</span></td>
              <td>
                <span className={`badge ${expense.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
                  {expense.type.charAt(0).toUpperCase() + expense.type.slice(1)}
                </span>
              </td>
              <td className={`text-end fw-bold ${expense.type === 'income' ? 'text-success' : 'text-danger'}`}>
                {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
              </td>
              <td className="text-center">
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(expense._id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
