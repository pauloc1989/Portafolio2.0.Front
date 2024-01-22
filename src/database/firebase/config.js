import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
    apiKey: process.env.REACT_APP_APIKEY, //"AIzaSyAJtSxzI7vKGsAwgsRv0_NjmpK-YWFC8DI",
    authDomain: process.env.REACT_APP_AUTHDOMAIN, //"portafolio-277601.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECTID, //"portafolio-277601",
    storageBucket: process.env.REACT_APP_STORAGEBUCKET, //"portafolio-277601.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID, //"674252396129",
    appId: process.env.REACT_APP_APPID //"1:674252396129:web:197a6f0043e51b211bfc20"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default { firebase, db };