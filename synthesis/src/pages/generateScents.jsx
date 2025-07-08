import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpeakButton from '../components/description-mode/SpeakButton'
import { returnMostSimilarScent } from '../api'
import './generateScents.css'

function GenerateScents() {
  const [transcript, setTranscript] = useState('')
  const [match, setMatch] = useState(null)
  const navigate = useNavigate()

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
      <nav className="top-nav">
        <button onClick={() => navigate('/')} className="nav-button">
          Home
        </button>
        <button onClick={() => navigate('/graph')} className="nav-button">
          Explore graph
        </button>
        <button onClick={() => navigate('/sensor')} className="nav-button">
          Connect to sensor
        </button>
        <button onClick={() => navigate('/diffuser')} className="nav-button">
          Connect to diffuser
        </button>
      </nav>

      <div className="content">
        <header>
          <h1>Describe a scent!</h1>
        </header>

        <main>
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
        </main>
      </div>
    </div>
  )
}

export default GenerateScents
