import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC-mMVLb6eHPJO6i02xLN1lW9YTLiJU5Hw",
    authDomain: "bank-app-b2b37.firebaseapp.com",
    databaseURL: "https://bank-app-b2b37.firebaseio.com",
    projectId: "bank-app-b2b37",
    storageBucket: "bank-app-b2b37.appspot.com",
    messagingSenderId: "912145192176",
    appId: "1:912145192176:web:bc8c3db2a92d7aa5fb1e35"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

