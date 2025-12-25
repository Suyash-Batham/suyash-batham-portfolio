import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAdL7YdQ7V7vezSDW962P4c4w4ZYT4_Tl0",
  authDomain: "suyash-batham-portfolio-4c5b6.firebaseapp.com",
  databaseURL: "https://suyash-batham-portfolio-4c5b6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suyash-batham-portfolio-4c5b6",
  storageBucket: "suyash-batham-portfolio-4c5b6.firebasestorage.app",
  messagingSenderId: "294845472628",
  appId: "1:294845472628:web:df9afe81b35180ad679621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
