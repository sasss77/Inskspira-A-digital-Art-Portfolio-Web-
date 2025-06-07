import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './HomePage/HomePage'
import LoginRes from './Login and register/LoginRes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage /> */}
      <LoginRes />
    </>
  )
}

export default App
