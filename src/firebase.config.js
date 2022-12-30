import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUvqb0W_cov9e2BBMR9KkKhErjA7kdJvM",
  authDomain: "daisyblogs-81eee.firebaseapp.com",
  projectId: "daisyblogs-81eee",
  storageBucket: "daisyblogs-81eee.appspot.com",
  messagingSenderId: "573451254792",
  appId: "1:573451254792:web:c8f202890a35a5f0d965bd"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDSVpLRIEEdycE0ycmn7AokP7pk34bAfMI",
//   authDomain: "daisyblog-4dbfe.firebaseapp.com",
//   projectId: "daisyblog-4dbfe",
//   storageBucket: "daisyblog-4dbfe.appspot.com",
//   messagingSenderId: "551034271331",
//   appId: "1:551034271331:web:d132fa092663d22ba62a56"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };