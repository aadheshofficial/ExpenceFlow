import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { loginWithGoogle, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSuccess = async (credentialResponse) => {
    const res = await loginWithGoogle(credentialResponse.credential);
    if (!res.success) {
      alert(res.message);
    }
  };

  const handleError = () => {
    alert('Google Login Failed');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5 border-0 rounded-4 text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 fw-bold text-primary">ExpenseFlow</h2>
        <p className="text-muted mb-4">Sign in to manage your monthly expenses and track budgets efficiently.</p>
        
        <div className="d-flex justify-content-center flex-column gap-3">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            shape="rectangular"
            theme="outline"
            size="large"
          />
          <div className="position-relative mt-3 mb-3">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">OR</span>
          </div>
          <button 
            className="btn btn-outline-primary"
            onClick={() => handleSuccess({ credential: 'test_token' })}
          >
            <i className="bi bi-person-fill me-2"></i> Use Test Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
