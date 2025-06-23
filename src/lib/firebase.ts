// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABBfhzLxHURICvbVfShQEvvt1DJVq_Tns",
  authDomain: "porfolio-31a14.firebaseapp.com",
  projectId: "porfolio-31a14",
  storageBucket: "porfolio-31a14.firebasestorage.app",
  messagingSenderId: "600384549728",
  appId: "1:600384549728:web:f7e2e0d147b9c635436405",
  measurementId: "G-2LX66K5LMF"
};

// Evita inicializar duas vezes em hot-reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
