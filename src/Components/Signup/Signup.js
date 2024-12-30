import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Changed from useHistory to useNavigate
import Logo from '../../olx-logo.png'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import './Signup.css'

export default function Signup() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate() // Changed from useHistory

  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const db = getFirestore()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(userCredential.user, {
        displayName: userName,
      })

      await addDoc(collection(db, 'users'), {
        id: userCredential.user.uid,
        username: userName,
        phone: phone,
      })

      navigate('/login') // Changed from history.push to navigate
    } catch (error) {
      console.error('Error during signup:', error.message)
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img alt="olx" width="200px" height="200px" src={Logo} />
        <form onSubmit={handelSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
