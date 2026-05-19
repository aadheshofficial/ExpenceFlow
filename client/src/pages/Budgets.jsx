import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import BudgetForm from '../components/budgets/BudgetForm';

const Budgets = () => {
  const { expenses, budget } = useContext(ExpenseContext);

  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const budgetLimit = budget?.limit || 0;
  const percentage = budgetLimit > 0 ? Math.min((totalExpense / budgetLimit) * 100, 100) : 0;
  const isOverBudget = totalExpense > budgetLimit;

  return (
    <div>
      <h2 className="mb-4">Budget Management</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Set Monthly Budget</h5>
              <p className="text-muted mb-4">Control your spending by setting a maximum amount you wish to spend this month.</p>
              <BudgetForm />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Budget Overview</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Current Spending</span>
                <span className={`fw-bold ${isOverBudget && budgetLimit > 0 ? 'text-danger' : ''}`}>
                  ₹{totalExpense.toFixed(2)} / ₹{budgetLimit.toFixed(2)}
                </span>
              </div>
              
              <div className="progress mb-4" style={{ height: '20px' }}>
                <div 
                  className={`progress-bar ${isOverBudget && budgetLimit > 0 ? 'bg-danger' : 'bg-primary'}`} 
                  role="progressbar" 
                  style={{ width: `${percentage}%` }}
                >
                  {percentage.toFixed(0)}%
                </div>
              </div>

              {isOverBudget && budgetLimit > 0 && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> 
                  You have exceeded your monthly budget by ₹{(totalExpense - budgetLimit).toFixed(2)}!
                </div>
              )}
              
              {!isOverBudget && budgetLimit > 0 && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i> 
                  You are within your budget. Keep it up!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
