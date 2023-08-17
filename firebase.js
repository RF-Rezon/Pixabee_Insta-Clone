// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjdp04a87tfBl_jDjTzihDw4MRLadDJnY",
  authDomain: "insta-2-o.firebaseapp.com",
  projectId: "insta-2-o",
  storageBucket: "insta-2-o.appspot.com",
  messagingSenderId: "901206079628",
  appId: "1:901206079628:web:5312fa7def420e906e63a9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

