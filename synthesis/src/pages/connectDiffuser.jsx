import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

function ConnectDiffuser() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      {/* reuse landing styles for background */}
      <nav className="top-nav">
        <button onClick={() => navigate('/')} className="nav-button">Home</button>
        <button onClick={() => navigate('/graph')} className="nav-button">Explore graph</button>
        <button onClick={() => navigate('/generate')} className="nav-button">Generate scents</button>
        <button onClick={() => navigate('/sensor')} className="nav-button">Connect to sensor</button>
      </nav>

      <div className="content">
        <h1 className="main-title">Connect to Diffuser</h1>
        <p style={{color:'white', maxWidth:'500px'}}>This page will guide you to pair the web application with your physical scent diffuser. Integration coming soon.</p>
      </div>
    </div>
  );
}

export default ConnectDiffuser;