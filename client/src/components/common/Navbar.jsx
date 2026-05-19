import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 fw-bold">ExpenseFlow</span>
        
        <div className="d-flex align-items-center">
          {user && (
            <div className="dropdown">
              <button 
                className="btn btn-primary dropdown-toggle d-flex align-items-center border-0 shadow-none" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="rounded-circle me-2" width="32" height="32" />
                ) : (
                  <div className="bg-light text-primary rounded-circle me-2 d-flex justify-content-center align-items-center fw-bold" style={{ width: '32px', height: '32px' }}>
                    {user.name?.charAt(0)}
                  </div>
                )}
                <span className="d-none d-md-inline">{user.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                <li><span className="dropdown-item-text text-muted">{user.email}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger fw-bold" onClick={logout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
