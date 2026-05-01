import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIkzpgOz8uDRSmv8Flo76ekwqzG4t_2EQ",
  authDomain: "portprev-d81ba.firebaseapp.com",
  projectId: "portprev-d81ba",
  storageBucket: "portprev-d81ba.firebasestorage.app",
  messagingSenderId: "593362605191",
  appId: "1:593362605191:web:7d013144e93e51c24fd422",
  measurementId: "G-47WS7923C2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const emailInput = document.getElementById("user");
const passwordInput = document.getElementById("pass");
const createAccountBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");
const status = document.getElementById("status");

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.warn("Firebase persistence error:", error.message);
});

function saveUserLocally(user) {
  if (!user) return;
  localStorage.setItem("userLogged", JSON.stringify({ email: user.email }));
}

function clearLocalUser() {
  localStorage.removeItem("userLogged");
}

function handleSignIn() {
  if (!emailInput || !passwordInput) return;

  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      saveUserLocally(user);
      if (msg) msg.innerText = "Login realizado!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      if (msg) msg.innerText = "Erro: " + error.message;
    });
}

function handleSignUp() {
  if (!emailInput || !passwordInput) return;

  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      saveUserLocally(user);
      if (msg) msg.innerText = "Conta criada!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      if (msg) msg.innerText = "Erro: " + error.message;
    });
}

if (loginBtn) {
  loginBtn.addEventListener("click", handleSignIn);
}

if (createAccountBtn) {
  createAccountBtn.addEventListener("click", handleSignUp);
}

if (status) {
  status.innerText = "Carregando...";
}

onAuthStateChanged(auth, (user) => {
  if (status) {
    status.innerText = user ? "Logado como: " + user.email : "Você não está logado";
  }

  if (user) {
    saveUserLocally(user);
    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("index.html")) {
      window.location.href = "home.html";
    }
  } else {
    clearLocalUser();
    if (window.location.pathname.includes("home.html")) {
      window.location.href = "index.html";
    }
  }
});

window.fazerLogout = function () {
  signOut(auth)
    .then(() => {
      clearLocalUser();
      alert("Saiu da conta");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
};
