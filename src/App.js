// App.js
import React, { useEffect, useContext } from 'react'
import './App.css'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context'
import { getAuth, onAuthStateChanged } from 'firebase/auth' // Add this import

function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext) // Fixed typo in firebase

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [setUser]) // Added dependency array

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