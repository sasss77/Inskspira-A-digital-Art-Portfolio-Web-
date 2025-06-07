import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginRes from './Login and register/LoginRes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  
  </StrictMode>,
)
