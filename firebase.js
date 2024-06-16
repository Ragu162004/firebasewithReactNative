import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsdM_DQreAkrlFSJKC-seH-ug9c1BY6S0",
    authDomain: "login-a27b2.firebaseapp.com",
    projectId: "login-a27b2",
    storageBucket: "login-a27b2.appspot.com",
    messagingSenderId: "766627127585",
    appId: "1:766627127585:web:05234cfb70fe049a9fde60",
    measurementId: "G-8D3KYEVNSN"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const connectToDatabase = () => {
    try {
        const db = getFirestore(app);
        return db;
    }catch(err) {
        console.error("Failed to connect to FireStore:", err);
    }
}

export { auth, connectToDatabase };

