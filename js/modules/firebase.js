//Här valde jag att lägga all min Firebase för få en snyggare uppläggning inne i script.js.

// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL8utZBBlMUt20czvbrG-T9KTWkvfX0nU",
  authDomain: "de-ve-de-f35fc.firebaseapp.com",
  projectId: "de-ve-de-f35fc",
  storageBucket: "de-ve-de-f35fc.appspot.com",
  messagingSenderId: "889379587632",
  appId: "1:889379587632:web:4098cef7c9f3cb1097cff5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, query, where, doc };
