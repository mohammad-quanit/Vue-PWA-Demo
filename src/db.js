import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyAJZxyywFE_GgUtqLsPiz0VrZzSkm3DlDs",
  authDomain: "practicedb-18881.firebaseapp.com",
  databaseURL: "https://practicedb-18881.firebaseio.com",
  projectId: "practicedb-18881",
  storageBucket: "practicedb-18881.appspot.com",
  messagingSenderId: "305462263677",
  appId: "1:305462263677:web:a1c129e70c6bff5da89614"
});

// Initialize Firebase
export const db = firebase.firestore();
