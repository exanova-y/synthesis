import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './landing.css';

const Landing = () => {
  const location = useLocation();
  
  return (
    <div className="landing-container">
      {/* Navigation buttons in top right */}
      <Navigation currentPath={location.pathname} />
      
      {/* Main content */}
      <div className="content">
        <header className="hero-section">
          <h1 className="main-title title">Synthesis</h1>
          <p className="subtitle">Generate new scents with words!</p>
        </header>
        
        <div className="stats-card">
          <div className="stat">
            <span className="stat-number">2,847</span>
            <span className="stat-label">Ingredients</span>
          </div>
          <div className="stat">
            <span className="stat-number">8,392</span>
            <span className="stat-label">Connections</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;