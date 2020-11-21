// Connecting Firebase Cloud Store Databse To Our React App
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBJuAtPHW_gRexQaqckwBWZ9TK8ngCyXfo",
    authDomain: "mysocialapp-1d7b3.firebaseapp.com",
    databaseURL: "https://mysocialapp-1d7b3.firebaseio.com",
    projectId: "mysocialapp-1d7b3",
    storageBucket: "mysocialapp-1d7b3.appspot.com",
    messagingSenderId: "65028009816",
    appId: "1:65028009816:web:1b6957a40b44cfa2603f2d",
    measurementId: "G-18VZEP3Y7Y"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db,auth,storage};