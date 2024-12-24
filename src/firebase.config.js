// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRgp3Gh53qIJj-o5R4Pp9Y9YIU8riwCcY",
  authDomain: "pageadminetest-35c22.firebaseapp.com",
  projectId: "pageadminetest-35c22",
  storageBucket: "pageadminetest-35c22.appspot.com",
  messagingSenderId: "1006130742200",
  appId: "1:1006130742200:web:74aa55e2b976df5335054d",
  measurementId: "G-4SD0X5V4T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);