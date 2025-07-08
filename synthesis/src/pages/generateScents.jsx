import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SpeakButton from '../components/description-mode/SpeakButton'
import Navigation from '../components/Navigation'
import { returnMostSimilarScent } from '../api'
import './generateScents.css'

function GenerateScents({ sensorMode = false }) {
  const [transcript, setTranscript] = useState('')
  const [match, setMatch] = useState(null)
  const location = useLocation() // page, not geographic location.

  async function handleFinalTranscript(finalText) {
    setTranscript(finalText)
    console.log("begin handleTranscript")
    const match = await returnMostSimilarScent(finalText)
    console.log("match", match)
    setMatch(match)
  }

  function handleLiveTranscript(live) {
    setTranscript(live)
  }

  return (
    <div className="generate-container">
      {/* Navigation buttons in top right */}
      <Navigation currentPath={location.pathname} />

      <div className="content">
        <header>
          <h1>{sensorMode ? "Connect to Sensor" : "Describe a scent!"}</h1>
        </header>

        <main>
          {sensorMode ? (
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
          ) : (
            <>
              <SpeakButton onLive={handleLiveTranscript} onFinal={handleFinalTranscript} />
              {transcript && (
                <p>Live Transcript: {transcript}</p>
              )}
              {match && (
                <div className="match">
                  <p>Matched smell: {match.name}</p>
                  <p>Description: {match.description}</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default GenerateScents
