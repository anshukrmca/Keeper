// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-ec6e5.firebaseapp.com",
  projectId: "mernauth-ec6e5",
  storageBucket: "mernauth-ec6e5.appspot.com",
  messagingSenderId: "201400302902",
  appId: "1:201400302902:web:ed757bcf84bdc81f198797",
  measurementId: "G-SJCCTGXV3B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
