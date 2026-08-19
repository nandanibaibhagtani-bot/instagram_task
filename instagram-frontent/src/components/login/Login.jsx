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
      setError('Backend server se connection nahi ho saka!');
    }
  };

  return (
    <div>
      <div className="login-right-card">
        {/* Instagram Official Wordmark Logo */}
        <div className="login-logo-box">
          <img 
            src="data:image/jpeg;base64,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" 
            alt="Instagram" 
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