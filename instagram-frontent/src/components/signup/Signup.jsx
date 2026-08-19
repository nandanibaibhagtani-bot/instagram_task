import React, { useState } from 'react';
import './Signup.css';

export default function Signup({ setActiveView }) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    fullName: '',
    username: '',
    password: '',
    birthday: ''
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
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({ emailOrPhone: '', fullName: '', username: '', password: '', birthday: '' });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Backend server se connection nahi ho saka!');
    }
  };

  return (
    <div>
      <div className="signup-right-card">
        <div className="meta-logo">Meta</div>
        <h2 className="signup-title">Get started on Instagram with a Meta Account</h2>
        <p className="signup-subtitle">A Meta Account lets you access multiple Meta technologies like Instagram easily and securely.</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <input 
            type="text" 
            name="emailOrPhone" 
            placeholder="Mobile number or email" 
            value={formData.emailOrPhone} 
            onChange={handleChange} 
            className="signup-input" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="signup-input" 
            required 
          />
          <input 
            type="text" 
            name="birthday" 
            placeholder="Birthday (e.g., January 1, 2000)" 
            value={formData.birthday} 
            onChange={handleChange} 
            className="signup-input" 
            required 
          />
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full name" 
            value={formData.fullName} 
            onChange={handleChange} 
            className="signup-input" 
            required 
          />
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleChange} 
            className="signup-input" 
            required 
          />
          
          <button type="submit" className="signup-button">Submit</button>
        </form>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="switch-box">
        Have an account? <span onClick={() => setActiveView('login')}>Log in</span>
      </div>
    </div>
  );
}