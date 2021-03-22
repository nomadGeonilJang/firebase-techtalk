import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
class Firebase{
  private firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  firebase = firebase
  auth:firebase.auth.Auth
  firestore:firebase.firestore.Firestore

  constructor(){
    this.firebase.initializeApp( this.firebaseConfig );
    this.auth = this.firebase.auth();
    this.firestore = this.firebase.firestore();
  }

  
}

const myFirebase = new Firebase();
export default myFirebase;