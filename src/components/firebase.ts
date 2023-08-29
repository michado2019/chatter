// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqFf-AFAi06VASmyZjfzxJrRimlDbJnH0",
  authDomain: "michado-chatter.firebaseapp.com",
  projectId: "michado-chatter",
  storageBucket: "michado-chatter.appspot.com",
  messagingSenderId: "532342470755",
  appId: "1:532342470755:web:ba37cbbf0c7b1c7603a056",
  measurementId: "G-2X927WNFF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export {
    signInWithPopup,
    getAuth, 
    provider,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
};
