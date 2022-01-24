import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDuvqCygOexti7wX0hHyZcNpHM4JUbpoik",
    authDomain: "naya-dev-cc1ac.firebaseapp.com",
    projectId: "naya-dev-cc1ac",
    storageBucket: "naya-dev-cc1ac.appspot.com",
    messagingSenderId: "133693938817",
    appId: "1:133693938817:web:89b4cc9ed09bed1fa50180"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export default app;