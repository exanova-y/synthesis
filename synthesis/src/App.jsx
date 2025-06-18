import { useState } from 'react'
import DictateButton from 'react-dictate-button'
import './App.css'

// Mock API functions - replace with actual API calls
const matchScent = async (description) => {
  console.log('Matching scent for description:', description)
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        idx: 'scent-001',
        name: 'Ocean Breeze',
        description: 'A fresh scent with notes of sea salt and citrus'
      })
    }, 1000)
  })
}

const diffuseScent = async (scentId) => {
  console.log('Diffusing scent:', scentId)
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState('')
  
  const handleTranscript = async (text) => {
    if (!text) return
    
    setTranscript(text)
    setIsLoading(true)
    try {
      const match = await matchScent(text)
      setResult(match)
    } catch (error) {
      console.error('Matching failed:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDiffuse = async () => {
    if (!result) return
    await diffuseScent(result.idx)
  }
  
  return (
    <div className="app-container">
      <header>
        <h1>Scent: Description mode</h1>
      </header>
      
      <main>        
        <div className="dictate-container">
          <DictateButton
            onDictate={handleTranscript}
            lang="en-US"
            format={true}
            continuous={false}
            className="dictate-button"
          >
            Describe a scent
          </DictateButton>
          
          {transcript && !isLoading && !result && (
            <div className="transcript">
              <p>Live Transcript: {transcript}</p>
            </div>
          )}
        </div>
        
        {isLoading && <div className="loading">Search results will show here.</div>}
        
        {result && (
          <div className="result-container">
            <h2>Matched Scent: {result.name}</h2>
            <p>{result.description}</p>
            <button onClick={handleDiffuse} className="diffuse-button">
              Diffuse this scent
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
