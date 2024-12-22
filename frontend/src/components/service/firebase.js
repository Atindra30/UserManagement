// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR1v3BHPyE13Aa6oucdwB6g5gsdd_s1do",
  authDomain: "login-auth-c8f40.firebaseapp.com",
  projectId: "login-auth-c8f40",
  storageBucket: "login-auth-c8f40.firebasestorage.app",
  messagingSenderId: "659379452273",
  appId: "1:659379452273:web:787453920a22cf49135ed0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth();
// export const db=getFirestore(app);
export default app;