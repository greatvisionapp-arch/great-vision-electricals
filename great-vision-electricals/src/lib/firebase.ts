// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "greatvisionelectricals.firebaseapp.com",
  projectId: "greatvisionelectricals",
  storageBucket: "greatvisionelectricals.firebasestorage.app",
  messagingSenderId: "343731372884",
  appId: "1:343731372884:web:a67508e9520c4d1fa0fec1",
  measurementId: "G-LYHD3CPG0J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
