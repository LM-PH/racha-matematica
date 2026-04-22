import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "racha-matematica",
  appId: "1:626526830274:web:e07e2e0f1d5648d1d8055b",
  storageBucket: "racha-matematica.firebasestorage.app",
  apiKey: "AIzaSyAJikh3T609MnvP9u1dp9XTra0QLJ-e_OE",
  authDomain: "racha-matematica.firebaseapp.com",
  messagingSenderId: "626526830274",
  measurementId: "G-FPDT4M81JS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
