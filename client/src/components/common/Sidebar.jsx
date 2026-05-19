import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-white border-end d-flex flex-column" style={{ width: '250px', minHeight: '100%' }}>
      <div className="list-group list-group-flush pt-3">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `list-group-item list-group-item-action border-0 py-3 px-4 ${isActive ? 'active fw-bold' : 'text-dark'}`
          }
        >
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </NavLink>
        <NavLink 
          to="/expenses" 
          className={({ isActive }) => 
            `list-group-item list-group-item-action border-0 py-3 px-4 ${isActive ? 'active fw-bold' : 'text-dark'}`
          }
        >
          <i className="bi bi-wallet2 me-2"></i> Expenses
        </NavLink>
        <NavLink 
          to="/budgets" 
          className={({ isActive }) => 
            `list-group-item list-group-item-action border-0 py-3 px-4 ${isActive ? 'active fw-bold' : 'text-dark'}`
          }
        >
          <i className="bi bi-piggy-bank me-2"></i> Budgets
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
