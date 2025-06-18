import { useState } from 'react'
import SpeakButton from './components/description-mode/SpeakButton'
import './App.css'

function App() {
  const [transcript, setTranscript] = useState('')

  async function handleTranscript(transcript) {
  return (
    <div className="app-container">
      <header>
        <h1>Test Speak Button</h1>
      </header>

      <main>
        <SpeakButton onTranscript={setTranscript} />

        {transcript && (
          <div className="transcript">
            <p>Live Transcript: {transcript}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
