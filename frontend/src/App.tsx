import { useState } from 'react'
import {Button}  from './components/ui/button'
import Hero from './Hero'
import Chat from './Chat'
import Menu from './Menu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Menu/>
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
            <Hero />
          </div>
        } />
        <Route path="/chat" element={
          <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
            <Chat />
          </div>
        } />
      </Routes>
    </Router>
    
      </>
  )
}

export default App
