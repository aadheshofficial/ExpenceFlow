import React, { useState } from 'react';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';

const Expenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transactions</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-2"></i> Add Transaction
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <ul className="nav nav-pills mb-4">
            <li className="nav-item">
              <button className={`nav-link ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${filter === 'Expense' ? 'active' : ''}`} onClick={() => setFilter('Expense')}>Expenses</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${filter === 'Income' ? 'active' : ''}`} onClick={() => setFilter('Income')}>Income</button>
            </li>
          </ul>
          
          <ExpenseTable filter={filter} />
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Transaction</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <ExpenseForm onClose={() => setShowModal(false)} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;
