import { useState } from 'react'
import './App.css'
import Box from './components/box' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Currency Exchange</h1>
      <Box />
      <div className="card">
      </div>
    </>
  )
}

export default App
