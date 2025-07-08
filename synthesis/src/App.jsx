import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import ThreeDGraph from './pages/3DGraph'
import GenerateScents from './pages/generateScents'
import ConnectDiffuser from './pages/connectDiffuser'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/graph" element={<ThreeDGraph />} />
      <Route path="/generate" element={<GenerateScents />} />
      <Route path="/sensor" element={<GenerateScents sensorMode={true} />} />
      <Route path="/diffuser" element={<ConnectDiffuser />} />
      <Route path="*" element={
        <div className="landing-container">
          <div className="content">
            <h1 className="main-title">Page Not Found</h1>
            <p style={{color:'white'}}>The page you're looking for doesn't exist.</p>
            <button onClick={() => window.location.href='/'} className="launch-button">
              Go Home
            </button>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App
