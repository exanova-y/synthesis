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
        <p><strong>Describe a Scent</strong></p>
      </header>

      <main>
        <SpeakButton onLive={handleLiveTranscript} onFinal={handleFinalTranscript} />
        
        {transcript && (
          <div className="transcript-display">
            <p>{transcript}</p>
          </div>
        )}
        
        {match && (
          <div className="match-result">
            <div className="match-card">
              <p>{match.description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default VoiceToScent
