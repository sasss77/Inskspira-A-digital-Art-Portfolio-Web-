import { useState } from 'react'
import './App.css'
import HomePage from './HomePage/HomePage'
import './index.css';
import LoginRes from './LoginRegister/LoginRes'
import { Routes, Route } from 'react-router-dom';
import Gallery from './Gallery';
import Shop from './Shop';
import Contact from './Contact';







function App() {
  const [count, setCount] = useState(0)

  
  return (

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/loginRegister" element={<LoginRes />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
  )
}






export default App;
