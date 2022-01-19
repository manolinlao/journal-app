import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_INg3RnRz4b7qrfMFzl6aIzs6TtSa24U",
  authDomain: "journal-app-1d299.firebaseapp.com",
  projectId: "journal-app-1d299",
  storageBucket: "journal-app-1d299.appspot.com",
  messagingSenderId: "210697321492",
  appId: "1:210697321492:web:94cf8f4627fff5fa51fb01"
};


console.log("en firebaseConfig");
const app = initializeApp(firebaseConfig);

const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();

export{
  db,
  googleAuthProvider
}
