import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Context from './store/Context'
import firebaseApp from './firebade/config' // This path needs to match your actual directory name
import { FirebaseContext } from './store/Context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase: firebaseApp }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
)
