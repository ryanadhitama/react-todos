import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB-_SOuFcoa1fh19GWUr_n9zCFRJeM5B8g",
    authDomain: "react-todos-7cce3.firebaseapp.com",
    databaseURL: "https://react-todos-7cce3.firebaseio.com",
    projectId: "react-todos-7cce3",
    storageBucket: "react-todos-7cce3.appspot.com",
    messagingSenderId: "73627850932",
    appId: "1:73627850932:web:573758e4d7e79f085c9fe1",
    measurementId: "G-FT53KPTH52"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;