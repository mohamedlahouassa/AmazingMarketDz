import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyBYCt6fGKXu11xYq7kQqmKzhXkqgAeTlDs",
  authDomain: "amazing-market-3656a.firebaseapp.com",
  projectId: "amazing-market-3656a",
  storageBucket: "amazing-market-3656a.appspot.com",
  messagingSenderId: "1021108871441",
  appId: "1:1021108871441:web:03e9acb61efb580e852cb0",
  measurementId: "G-2XKHNFY93Y"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  var  provider = new firebase.auth.GoogleAuthProvider();
  var provider2 = new firebase.auth.FacebookAuthProvider();
   

  export { db, auth,provider,provider2,firebase };