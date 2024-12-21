import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../olx-logo.png'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import './Signup.css'
import { FirebaseContext } from '../../store/FirebaseContext'
export default function Signup() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const [phone, setPhone] = useState('')

  const handelSubmit = (e) => {
    e.preventDefault()
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: userName,
        }).then(() => {
          // Profile updated successfully
          console.log('User registered successfully!')
        })
      })
      .catch((error) => {
        console.error(error.message)
      })
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
