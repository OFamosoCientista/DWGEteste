import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         GoogleAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIkzpgOz8uDRSmv8Flo76ekwqzG4t_2EQ",
  authDomain: "portprev-d81ba.firebaseapp.com",
  projectId: "portprev-d81ba",
  storageBucket: "portprev-d81ba.firebasestorage.app",
  messagingSenderId: "593362605191",
  appId: "1:593362605191:web:7d013144e93e51c24fd422",
  measurementId: "G-47WS7923C2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.fazerLogout = function () {
  signOut(auth)
    .then(() => {
      alert("Saiu da conta");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
    });
};