// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYS71yQbzEBRwaJQqxZNx2FJaB-JaOLZ8",
  authDomain: "fir-nwitter.firebaseapp.com",
  projectId: "fir-nwitter",
  storageBucket: "fir-nwitter.appspot.com",
  messagingSenderId: "418947398363",
  appId: "1:418947398363:web:1616571c8027219dadaafe",
  measurementId: "G-E8KWWVG5ZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
