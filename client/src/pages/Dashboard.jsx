import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { expenses, budget, loading } = useContext(ExpenseContext);

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  if (loading) return <div className="text-center mt-5">Loading dashboard data...</div>;

  return (
    <div>
      <h2 className="mb-4">Welcome back, {user?.name.split(' ')[0]}!</h2>
      
      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 opacity-75">Total Balance</h6>
              <h2 className="card-title mb-0 fw-bold">₹{balance.toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 border-start border-success border-4">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Income</h6>
              <h3 className="card-title mb-0 text-success fw-bold">₹{totalIncome.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 border-start border-danger border-4">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Expense</h6>
              <h3 className="card-title mb-0 text-danger fw-bold">₹{totalExpense.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Recent Transactions</h5>
              {expenses.length === 0 ? (
                <p className="text-muted text-center py-4">No transactions found. Add some to get started!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.slice(0, 5).map(expense => (
                        <tr key={expense._id}>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td>{expense.description}</td>
                          <td><span className="badge bg-secondary">{expense.category}</span></td>
                          <td className={`text-end fw-bold ${expense.type === 'income' ? 'text-success' : 'text-danger'}`}>
                            {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Monthly Budget</h5>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Spent</span>
                <span className="fw-bold">₹{totalExpense.toFixed(2)} / ₹{budget?.limit || 0}</span>
              </div>
              <div className="progress mb-3" style={{ height: '10px' }}>
                <div 
                  className={`progress-bar ${totalExpense > (budget?.limit || 0) ? 'bg-danger' : 'bg-primary'}`} 
                  role="progressbar" 
                  style={{ width: `${Math.min(((totalExpense / (budget?.limit || 1)) * 100), 100)}%` }}
                ></div>
              </div>
              {totalExpense > (budget?.limit || 0) && budget?.limit > 0 && (
                <div className="alert alert-danger py-2 mt-3" role="alert">
                  <small><i className="bi bi-exclamation-triangle-fill me-2"></i> You have exceeded your monthly budget!</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
