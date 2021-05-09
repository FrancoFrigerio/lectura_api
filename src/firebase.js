import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
      apiKey: "AIzaSyBSzOed08QfKS-iDC7RVB51IdQmm8LkBNA",
      authDomain: "proyecto1-99d0d.firebaseapp.com",
      databaseURL: "https://proyecto1-99d0d-default-rtdb.firebaseio.com",
      projectId: "proyecto1-99d0d",
      storageBucket: "proyecto1-99d0d.appspot.com",
      messagingSenderId: "276722915811",
      appId: "1:276722915811:web:1964f3afabdcc94952a8d6"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()



  export {auth,db,firebase,storage}