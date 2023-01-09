// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3ODicv2WGYwegzhrbfXvS7JqBcCKDIRE",
  authDomain: "instagram-react-clone-339f6.firebaseapp.com",
  projectId: "instagram-react-clone-339f6",
  storageBucket: "instagram-react-clone-339f6.appspot.com",
  messagingSenderId: "173417286750",
  appId: "1:173417286750:web:147f7ef6114f81589538cf",
  measurementId: "G-NFTBMBMMTM",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
// const storage = firebase.storage();
export const storage = firebase.storage;

export const auth = firebase.auth();
export { db, firebase };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC3ODicv2WGYwegzhrbfXvS7JqBcCKDIRE",
//   authDomain: "instagram-react-clone-339f6.firebaseapp.com",
//   projectId: "instagram-react-clone-339f6",
//   storageBucket: "instagram-react-clone-339f6.appspot.com",
//   messagingSenderId: "173417286750",
//   appId: "1:173417286750:web:147f7ef6114f81589538cf",
//   measurementId: "G-NFTBMBMMTM"
// };
