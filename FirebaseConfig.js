// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMTTesduVPDfm9GdHL7Xoa_GI3ZMJfRpk",
  authDomain: "meetwhere-30911.firebaseapp.com",
  projectId: "meetwhere-30911",
  storageBucket: "meetwhere-30911.appspot.com",
  messagingSenderId: "733228351508",
  appId: "1:733228351508:web:13608dd83ffeec87a4a701",
  measurementId: "G-1KQ111L747",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
