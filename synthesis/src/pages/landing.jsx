import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './landing.css';

const Landing = () => {
  const location = useLocation();
  
  return (
    <div className="landing-container" style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), radial-gradient(at 50% 100%, rgba(128, 0, 128, 0.2), transparent), radial-gradient(at 50% 0%, rgba(0, 0, 255, 0.2), transparent)',
      backgroundSize: '100% 300px, 200px 200px, 200px 200px',
      backgroundPosition: '0% 0%, 50% 100%, 50% 0%',
      backgroundRepeat: 'repeat, no-repeat, no-repeat'
    }}>
      <div className="noise-overlay"></div>
      
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
        
        <button className="launch-button">
          EXPLORE
        </button>
      </div>
    </div>
  );
};

export default Landing;