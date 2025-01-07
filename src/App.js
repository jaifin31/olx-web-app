// App.js
import React, { useEffect, useContext } from 'react'
import './App.css'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from './store/Context'
import { getAuth, onAuthStateChanged } from 'firebase/auth' // Add this import
import Post from './store/PostContext'
function App() {
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [setUser]) // Added dependency array

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/viewpost" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  )
}

export default App
