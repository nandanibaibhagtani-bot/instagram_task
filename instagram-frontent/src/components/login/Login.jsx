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
      const response = await fetch('https://insta-assignment-six.vercel.app/auth/login', {
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
        <div className="login-logo-box">
          <img 
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcCBAUDAf/EAEkQAAEDAgIEBQ4LCAMBAAAAAAEAAgMEBQYRBxIhMRNBUWGBFCI2VXFzdJGSk6GywdEWIzJCUlNjcrHS8BUXNVRigrPhRWTCJv/EABsBAQACAwEBAAAAAAAAAAAAAAADBAIFBgEH/8QAOBEAAgECAgMNCAMBAQEAAAAAAAECAwQFERIhMQYTFEFRUmFxgZGxwdEVIjIzNKHh8CNC8SRyU//aAAwDAQACEQMRAD8AvFAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf/9k="
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