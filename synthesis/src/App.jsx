import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SpeakButton from './components/description-mode/SpeakButton'
import SpeechRecognition from 'react-speech-recognition'
import './App.css'
import { returnMostSimilarScent } from './api'
import Landing from './pages/landing'
import ThreeDGraph from './pages/3DGraph'

// Synthesize page component
function SynthesizePage() {
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
    <div className="app-container">
      <header>
        <h1>Describe a scent!</h1>
      </header>

      <main>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/graph')}>Explore graph</button>
        <button onClick={() => navigate('/synthesize')}>Synthesize</button>
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
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/graph" element={<ThreeDGraph />} />
      <Route path="/synthesize" element={<SynthesizePage />} />
    </Routes>
  )
}

export default App
