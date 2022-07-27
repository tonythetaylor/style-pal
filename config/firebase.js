// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage"

import Constants from 'expo-constants';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw3_Mkm32eSmyjiHqVOK6SbsPIier4Td4",
  authDomain: "clthg-collection.firebaseapp.com",
  projectId: "clthg-collection",
  storageBucket: "clthg-collection.appspot.com",
  messagingSenderId: "1042198594018",
  appId: "1:1042198594018:web:8d3d200b0974b146c379bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize database
// const db = getDatabase(app);

const db = getFirestore(app);
const storage = getStorage(app)
const time = serverTimestamp()

export {app, db, storage, time}