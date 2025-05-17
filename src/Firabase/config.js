// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCed6NGCYAYxhCUH49r6WCxuX5QDMHkoFw",
  authDomain: "calendarjsapp-be39e.firebaseapp.com",
  projectId: "calendarjsapp-be39e",
  storageBucket: "calendarjsapp-be39e.firebasestorage.app",
  messagingSenderId: "188375496779",
  appId: "1:188375496779:web:53eeee3e7ad79d060975ce",
  measurementId: "G-9NP657C3CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };