import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAZ0IHyvyJfv7mxqklEFBP3T3FWKrraURo",
  authDomain: "home-4246b.firebaseapp.com",
  databaseURL: "https://home-4246b-default-rtdb.firebaseio.com",
  projectId: "home-4246b",
  storageBucket: "home-4246b.appspot.com",
  messagingSenderId: "714812053106",
  appId: "1:714812053106:web:416efdc2996ee25632d4eb",
  measurementId: "G-ESG5CDH247"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);