import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './landing.css';

function ConnectDiffuser() {
  const location = useLocation();
  
  return (
    <div className="landing-container">
      {/* reuse styles for background */}
      <Navigation currentPath={location.pathname} />

      <div className="content">
        <h1 className="main-title">Connect to Diffuser</h1>
        <p style={{color:'white', maxWidth:'500px'}}>This page will guide you to pair the web application with your physical scent diffuser. To implement.</p>
      </div>
    </div>
  );
}

export default ConnectDiffuser;