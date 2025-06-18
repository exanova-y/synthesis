import { useState } from 'react'
import SpeakButton from './components/description-mode/SpeakButton'
import './App.css'
import { returnMostSimilarScent } from './api';

function App() {
  const [transcript, setTranscript] = useState('')
  const [match, setMatch] = useState(null);

  async function handleTranscript(transcript) {
    console.log("begin handleTranscript");``
    const match = await returnMostSimilarScent(transcript);
    setMatch(match);
    return match;
  }

    return (
    <div className="app-container">
      <header>
        <h1>Test Speak Button</h1>
      </header>

      <main>
        <SpeakButton onTranscript={handleTranscript} />
        {transcript && (
          <div className="transcript">
            <p>Live Transcript: {transcript}</p>
          </div>
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
