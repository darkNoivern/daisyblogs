import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSVpLRIEEdycE0ycmn7AokP7pk34bAfMI",
  authDomain: "daisyblog-4dbfe.firebaseapp.com",
  projectId: "daisyblog-4dbfe",
  storageBucket: "daisyblog-4dbfe.appspot.com",
  messagingSenderId: "551034271331",
  appId: "1:551034271331:web:a375138236ea4b46a62a56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };