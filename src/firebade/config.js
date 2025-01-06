import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDa9RzBKHSJL-jO6dwMO_SS2nKvTe4dHgU",
    authDomain: "olx-web-app-3ad49.firebaseapp.com",
    projectId: "olx-web-app-3ad49",
    storageBucket: "olx-web-app-3ad49.firebasestorage.app",
    messagingSenderId: "117301283231",
    appId: "1:117301283231:web:5a4f8359fb5791c2fd95aa",
    measurementId: "G-PV98L139TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services
export { auth, db, storage };
export default app;