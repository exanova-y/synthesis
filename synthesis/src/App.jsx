import { useState } from 'react'
import SpeakButton from './components/description-mode/SpeakButton'
import './App.css'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // const handleTranscript = async (text) => {
  //   if (!text) return
    
  //   setIsLoading(true)
  //   try {
  //     const match = await matchScent(text)
  //     setResult(match)
  //   } catch (error) {
  //     console.error('Matching failed:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  
  // const handleDiffuse = async () => {
  //   if (!result) return
  //   await diffuseScent(result.idx)
  // }
  
  return (
    <div className="app-container">
      <header>
        <h1>Scent synthesis</h1>
      </header>
      
      <main>        
        <button>Speak</button>
        
      </main>
    </div>
  )
}

export default App
