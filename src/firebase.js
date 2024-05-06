// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDMAIcJTAGnweLV7HfVwIXyj5u9abefWDk",
  authDomain: "courses-webapp-8805d.firebaseapp.com",
  projectId: "courses-webapp-8805d",
  storageBucket: "courses-webapp-8805d.appspot.com",
  messagingSenderId: "553054439896",
  appId: "1:553054439896:web:d97657b154a4c5d8bf4aad",
  measurementId: "G-8LKL4W0HV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth, doc, setDoc };

//fqYIpatHuHwURzfNQIXf