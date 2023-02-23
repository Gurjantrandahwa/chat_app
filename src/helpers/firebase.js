import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";
import "firebase/compat/storage";


const config = {
    apiKey: "AIzaSyDcvWezYRQQUwhkxmCU_akNcu0GkwACmk4",
    authDomain: "chat-app-6b27c.firebaseapp.com",
    databaseURL: "https://chat-app-6b27c-default-rtdb.firebaseio.com",
    projectId: "chat-app-6b27c",
    storageBucket: "chat-app-6b27c.appspot.com",
    messagingSenderId: "820814625222",
    appId: "1:820814625222:web:328ebd7960b2abd3509ac7"
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage=app.storage();
