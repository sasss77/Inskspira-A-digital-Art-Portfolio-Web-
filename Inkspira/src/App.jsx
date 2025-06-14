import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './HomePage/HomePage'
import LoginRes from './Login and register/LoginRes'
import { Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes> 
      <Route path="/" element={<HomePage />} /> 
      <Route path="/LoginRegister" element={<LoginRes />} /> 
      
    </Routes> 

      {/* <LoginRes /> */}
    </>
  )
}

export default App;
