import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAaTTJutZtbmlQS7O1XvJoauefLUAb2xG0",
  authDomain: "bitflip-potholedetector.firebaseapp.com",
  databaseURL: "https://bitflip-potholedetector.firebaseio.com",
  projectId: "bitflip-potholedetector",
  storageBucket: "bitflip-potholedetector.appspot.com",
  messagingSenderId: "1044942737663",
  appId: "1:1044942737663:web:29bad1229f91a4cb83bcca"
};

let firebaseapp = firebase.initializeApp(firebaseConfig);

export default firebaseapp;
