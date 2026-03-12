import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2bqnLmfiJ3wNmbn28OoIsjd_10IIHjVY",
  authDomain: "wayne-khamala.firebaseapp.com",
  projectId: "wayne-khamala",
  storageBucket: "wayne-khamala.firebasestorage.app",
  messagingSenderId: "707670142373",
  appId: "1:707670142373:web:46983ecc4f8ed6ed008c4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
