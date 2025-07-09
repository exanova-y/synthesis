import { useState } from 'react'
import SpeakButton from './SpeakButton'
import { returnMostSimilarScent } from '../api'
import './VoiceToScent.css'

function VoiceToScent() {
  const [transcript, setTranscript] = useState('')
  const [match, setMatch] = useState(null)

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
    <div className="describe-scent">
      <header>
        <h2>Describe a Scent</h2>
        <p>Use your voice to describe a scent and find matching fragrances</p>
      </header>

      <main>
        <SpeakButton onLive={handleLiveTranscript} onFinal={handleFinalTranscript} />
        
        {transcript && (
          <div className="transcript-display">
            <h3>Live Transcript:</h3>
            <p>{transcript}</p>
          </div>
        )}
        
        {match && (
          <div className="match-result">
            <h3>✨ Matched Scent</h3>
            <div className="match-card">
              <h4>{match.name}</h4>
              <p><strong>Description:</strong> {match.description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default VoiceToScent
