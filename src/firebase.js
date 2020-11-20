// import firebase from "firebase";
// top import, import whole library and issues a warning.

import firebase from "firebase/app"; // first step
import "firebase/firestore";
import "firebase/auth";

// second step copy from firebase config
const firebaseConfig = {
	apiKey: "AIzaSyA5FjeKHNMVtll8yQ9o8PIaEi6SbKtv35c",
	authDomain: "clone-54c59.firebaseapp.com",
	databaseURL: "https://clone-54c59.firebaseio.com",
	projectId: "clone-54c59",
	storageBucket: "clone-54c59.appspot.com",
	messagingSenderId: "210751621544",
	appId: "1:210751621544:web:fdf6eb53e28e450e40759d",
	measurementId: "G-TBMTLLNPB9",
};

// initialize the app
// and pass the config above

const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize the database
const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
