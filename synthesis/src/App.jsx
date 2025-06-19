import { useState, useEffect } from 'react'
import SpeakButton from './components/description-mode/SpeakButton'
import SpeechRecognition from 'react-speech-recognition'
import './App.css'
import { returnMostSimilarScent } from './api';

function App() {
  const [transcript, setTranscript] = useState('')
  const [match, setMatch] = useState(null);

  // called once recording finishes
  async function handleFinalTranscript(finalText) {
    setTranscript(finalText);
    console.log("begin handleTranscript");
    const match = await returnMostSimilarScent(finalText);
    console.log("match", match);
    setMatch(match);
  }

  // live update for UI only
  function handleLiveTranscript(live) {
    setTranscript(live);
  }

    return (
    <div className="app-container">
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
  )
}

export default App
