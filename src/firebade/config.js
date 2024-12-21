import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDa9RzBKHSJL-jO6dwMO_SS2nKvTe4dHgU",
    authDomain: "olx-web-app-3ad49.firebaseapp.com",
    projectId: "olx-web-app-3ad49",
    storageBucket: "olx-web-app-3ad49.firebasestorage.app",
    messagingSenderId: "117301283231",
    appId: "1:117301283231:web:5a4f8359fb5791c2fd95aa",
    measurementId: "G-PV98L139TK"
}

const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp