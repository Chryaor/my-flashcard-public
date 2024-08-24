// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8-pJYwic8_xdeBhnVipSETc-d75YOx7g",
  authDomain: "my-flashcard-11f7a.firebaseapp.com",
  projectId: "my-flashcard-11f7a",
  storageBucket: "my-flashcard-11f7a.appspot.com",
  messagingSenderId: "819412359690",
  appId: "1:819412359690:web:b5b28dea5053a7b1995df3",
  measurementId: "G-6KTE64WMF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}