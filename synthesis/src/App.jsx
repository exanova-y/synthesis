import { useState, useEffect } from 'react'
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
      <Route path="/sensor" element={<div style={{color: 'white', padding: '2rem'}}>Connect to Sensor - Coming Soon</div>} />
      <Route path="/diffuser" element={<ConnectDiffuser />} />
    </Routes>
  )
}

export default App
