import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";
import "firebase/compat/storage";
// import { getToken } from "firebase/compat/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDcvWezYRQQUwhkxmCU_akNcu0GkwACmk4",
    authDomain: "chat-app-6b27c.firebaseapp.com",
    databaseURL: "https://chat-app-6b27c-default-rtdb.firebaseio.com",
    projectId: "chat-app-6b27c",
    storageBucket: "chat-app-6b27c.appspot.com",
    messagingSenderId: "820814625222",
    appId: "1:820814625222:web:328ebd7960b2abd3509ac7",
    measurementId: "G-M2DVSPZZFG"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
// this will all happen after the blaze plan of firebase
// export const messaging = firebase.messaging.isSupported() ? app.messaging() : null;
//
// if (messaging) {
//
//     messaging.usePublicVapidKey=('public key')
//
//     messaging.onMessage(data => {
//         console.log(data)
//     })
// }