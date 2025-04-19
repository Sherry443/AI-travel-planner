// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrWuLt7aDEy5idfX-RsVV213ogqBYHd6Q",
  authDomain: "trip-planner-c94da.firebaseapp.com",
  projectId: "trip-planner-c94da",
  storageBucket: "trip-planner-c94da.firebasestorage.app",
  messagingSenderId: "917636208444",
  appId: "1:917636208444:web:318501a5d8ee94e85fb039",
  measurementId: "G-H63D1B4DXJ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);