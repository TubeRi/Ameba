import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }
    // In a real app you'd authenticate here. For now just navigate home.
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1 className="login-greeting">Welcome to AMEBA</h1>
      </div>
      
      <div className="login-right">
        <div className="login-box">
          {/* Log In section at the top */}
          <h2 className="login-title">Log In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  padding: 0
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" className="login-btn primary">Log In</button>
          </form>

          {/* Spacer to push Register to bottom */}
          <div style={{ flex: 1 }} />

          {/* Register section at the bottom */}
          <div className="login-divider">— or —</div>
          <h2 className="login-title">Register</h2>
          <button className="login-btn google">Continue with Google</button>
          <button className="login-btn facebook">Continue with Facebook</button>
          <button className="login-btn X">Continue with X</button>
          <button className="login-btn Discord">Continue with Discord</button>
        </div>
      </div>
    </div>
  );
}
