import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

if (!firebase.apps.length)
    firebase.initializeApp(config);
else
    firebase.app();

const db = firebase.firestore();

export default { firebase, db };