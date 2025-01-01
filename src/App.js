import React, { useEffect, useContext } from 'react'
import './App.css'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from './store/Context'

function App() {
  const { user } = useContext(AuthContext)
  useEffect(() => {
    console.log(user)
  })
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
