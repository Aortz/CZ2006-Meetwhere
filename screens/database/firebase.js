// Import the functions you need from the SDKs you need
// database/firebaseDb.js
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMTTesduVPDfm9GdHL7Xoa_GI3ZMJfRpk",
  authDomain: "meetwhere-30911.firebaseapp.com",
  projectId: "meetwhere-30911",
  storageBucket: "meetwhere-30911.appspot.com",
  messagingSenderId: "733228351508",
  appId: "1:733228351508:web:13608dd83ffeec87a4a701",
  measurementId: "G-1KQ111L747"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
