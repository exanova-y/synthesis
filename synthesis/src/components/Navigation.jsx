import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ currentPath }) => {
  const navigate = useNavigate();
  
  const routes = [
    { path: '/graph', label: 'Explore graph' },
    { path: '/generate', label: 'Generate scents' },
    { path: '/sensor', label: 'Connect to sensor' },
    { path: '/diffuser', label: 'Connect to diffuser' }
  ];
  
  // Add home button if not on home page
  if (currentPath !== '/') {
    routes.unshift({ path: '/', label: 'Home' });
  }
  
  return (
    <nav className="top-nav">
      {routes.map(route => (
        <button 
          key={route.path}
          onClick={() => navigate(route.path)} 
          className="nav-button"
          disabled={currentPath === route.path}
        >
          {route.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
