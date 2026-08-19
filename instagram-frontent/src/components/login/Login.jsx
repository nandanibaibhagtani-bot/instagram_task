import React, { useState } from 'react';
import './Login.css';

export default function Login({ setActiveView }) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://instagram-task.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({ emailOrPhone: '', password: '' });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Record Not Found!');
    }
  };

  return (
    <div>
      <div className="login-right-card">
        {/* Instagram Official Wordmark Logo */}
        <div className="login-logo-box">
          <img 
            src="data:image/jpeg;base64,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"
            className="login-logo-img"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text" 
            name="emailOrPhone" 
            placeholder="Mobile number, username or email" 
            value={formData.emailOrPhone} 
            onChange={handleChange} 
            className="login-input" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="login-input" 
            required 
          />
          
          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="login-divider">OR</div>
        <button className="fb-login">Log in with Facebook</button>
        <a href="#" className="forgot-pass">Forgot password?</a>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="switch-box">
        Don't have an account? <span onClick={() => setActiveView('signup')}>Sign up</span>
      </div>
    </div>
  );
}