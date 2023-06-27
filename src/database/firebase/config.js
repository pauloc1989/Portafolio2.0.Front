import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAJtSxzI7vKGsAwgsRv0_NjmpK-YWFC8DI",
    authDomain: "portafolio-277601.firebaseapp.com",
    projectId: "portafolio-277601",
    storageBucket: "portafolio-277601.appspot.com",
    messagingSenderId: "674252396129",
    appId: "1:674252396129:web:197a6f0043e51b211bfc20"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default { firebase, db };