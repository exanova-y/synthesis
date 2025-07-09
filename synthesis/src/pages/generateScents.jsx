import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import CraftingTable from '../components/CraftingTable'
import VoiceToScent from '../components/VoiceToScent'
import './generateScents.css'

function GenerateScents({ sensorMode = false }) {
  const [activeMode, setActiveMode] = useState('craft') // 'craft', 'voice', 'sensor'
  const location = useLocation()

  return (
    <div className="generate-container">
      {/* Navigation buttons in top right */}
      <Navigation currentPath={location.pathname} />

      <div className="content">
        <header>
          <div className="mode-selector">
            <button 
              onClick={() => setActiveMode('craft')}
              className={`mode-btn ${activeMode === 'craft' ? 'active' : ''}`}
            >
              Craft Scents
            </button>


            <button 
              onClick={() => setActiveMode('voice')}
              className={`mode-btn ${activeMode === 'voice' ? 'active' : ''}`}
            >
              Voice to Scent
            </button>


            {/* {sensorMode && (
              <button 
                onClick={() => setActiveMode('sensor')}
                className={`mode-btn ${activeMode === 'sensor' ? 'active' : ''}`}
              >
                Connect Sensor
              </button>
            )} */}
          </div>
        </header>

        <main>
          {activeMode === 'craft' && <CraftingTable />}
          
          {activeMode === 'voice' && <VoiceToScent />}
          
          {/* {activeMode === 'sensor' && sensorMode && (
            <div className="sensor-placeholder">
              <p style={{color:'white', maxWidth:'500px', marginBottom: '2rem'}}>
                This page will allow you to connect to your scent sensor device.
                Integration coming soon.
              </p>
              <div className="sensor-status">
                <div className="status-indicator offline"></div>
                <span>Sensor Status: Offline</span>
              </div>
            </div>
          )} */}
        </main>
      </div>
    </div>
  )
}

export default GenerateScents
