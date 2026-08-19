import React, { useState } from 'react';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('landing');

  return (
    <div className="app-container">
      <div className="split-screen">
        <div className="left-panel">
          <div className="left-content">
            <h1 className="left-heading">See everyday moments from your <span>close friends</span>.</h1>
            <div className="mockup-box">
              <div className="mockup-card">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWeCQ2KsQZeAFkbK-SQMx-R0Epjaw4L0tl8dZzWjpCIF-Bt1wCmwG745nn&s=10" 
                  alt="Story" 
                  className="mockup-img"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          {activeView === 'landing' && <Landing setActiveView={setActiveView} />}
          {activeView === 'login' && <Login setActiveView={setActiveView} />}
          {activeView === 'signup' && <Signup setActiveView={setActiveView} />}
        </div>
      </div>
    </div>
  );
}