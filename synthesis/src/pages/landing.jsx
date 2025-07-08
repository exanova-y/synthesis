import React from 'react';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-container" style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), radial-gradient(at 50% 100%, rgba(128, 0, 128, 0.2), transparent), radial-gradient(at 50% 0%, rgba(0, 0, 255, 0.2), transparent)',
      backgroundSize: '100% 300px, 200px 200px, 200px 200px',
      backgroundPosition: '0% 0%, 50% 100%, 50% 0%',
      backgroundRepeat: 'repeat, no-repeat, no-repeat'
    }}>
      <div className="noise-overlay"></div>
      <div className="content">
        <header className="hero-section">
          <h1 className="title">Synthesis</h1>
          <p className="subtitle">Generate new scents with words!</p>
        </header>
        
        <div className="stats-card">
          <div className="stat">
            <span className="stat-number">8 100</span>
            <span className="stat-label">Ingredients</span>
          </div>
          <div className="stat">
            <span className="stat-number">8 392</span>
            <span className="stat-label">Connections</span>
          </div>
        </div>
        
        <button className="launch-button">
          EXPLORE
        </button>
        
        <footer className="quote-section">
          <blockquote>
            "The most beautiful thing we can experience is the mysterious. 
            It is the source of all true art and science."
          </blockquote>
          <cite>- Albert Einstein</cite>
        </footer>
      </div>
    </div>
  );
};

export default Landing;