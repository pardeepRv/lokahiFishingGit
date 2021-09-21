import firebase from "firebase/app";
import "firebase/firestore";


export const  firebaseConfig = {
  apiKey: "AIzaSyBt7L13O23OeNsiLUkwH3G9GSicKIBqTgY",
  authDomain: "lokahirn.firebaseapp.com",
  projectId: "lokahirn",
  storageBucket: "lokahirn.appspot.com",
  messagingSenderId: "400685716409",
  appId: "1:400685716409:web:09b9f21a390345fa715c68",
  measurementId: "G-LXFWSSY657",
  databaseURL: "lokahirn.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

export default firebase;