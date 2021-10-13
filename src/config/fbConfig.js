import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8w2fTxopx4tkmFCRFTt6_iWumH0mKRns",
    authDomain: "carify-c094d.firebaseapp.com",
    projectId: "carify-c094d",
    storageBucket: "carify-c094d.appspot.com",
    messagingSenderId: "706963543358",
    appId: "1:706963543358:web:a67d0ed2afcba6a2ab886f",
    measurementId: "G-DMR712HJ5H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();
// firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export { storage, firebase }