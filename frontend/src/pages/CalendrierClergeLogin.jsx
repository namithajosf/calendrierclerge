// src/pages/CalendrierClergeLogin.jsx
import React, { useState } from 'react';
import './CalendrierClergeLogin.css';

const CalendrierClergeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Login attempted with:', { email, password });
    setIsLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-bg-shapes">
        <div className="shape shape1" />
        <div className="shape shape2" />
        <div className="shape shape3" />
        <div className="shape shape4" />
        <div className="shape shape5" />
        <div className="shape shape6" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <div className="logo-circle">
              <svg className="logo-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
            </div>
            <h1 className="login-title">CALENDRIERCLERGÉ</h1>
          </div>

          <div className="login-subtitle">Let's get you signed in</div>

          <div className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <div className="login-loading">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="spinner-fg" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="login-links">
              <a href="#">Forgot your password?</a>
              <p>
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendrierClergeLogin;
