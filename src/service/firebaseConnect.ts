
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuhKRrBc7GyQs-7HzU4DwxG4UKukd7ncI",
  authDomain: "webcars-c2ebd.firebaseapp.com",
  projectId: "webcars-c2ebd",
  storageBucket: "webcars-c2ebd.appspot.com",
  messagingSenderId: "661996403971",
  appId: "1:661996403971:web:82196469172278c2e67d36"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage}