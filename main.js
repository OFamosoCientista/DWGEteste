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

function validateCredentials() {
  if (!emailInput || !passwordInput || !msg) return false;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    msg.innerText = "Preencha email e senha.";
    return false;
  }

  if (password.length < 6) {
    msg.innerText = "A senha deve ter pelo menos 6 caracteres.";
    return false;
  }

  return true;
}

function getErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Este email já está em uso.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    default:
      return error.message || "Erro desconhecido.";
  }
}

function handleSignIn() {
  if (!validateCredentials()) return;

  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      saveUserLocally(user);
      msg.innerText = "Login realizado!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Login error:", error.code, error.message);
      msg.innerText = "Erro: " + getErrorMessage(error);
    });
}

function handleSignUp() {
  if (!validateCredentials()) return;

  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      saveUserLocally(user);
      msg.innerText = "Conta criada!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Cadastro error:", error.code, error.message);
      msg.innerText = "Erro: " + getErrorMessage(error);
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
  const currentPage = window.location.pathname.split("/").pop();
  const protectedPages = ["home.html", "login.html"];

  if (status) {
    status.innerText = user ? "Logado como: " + user.email : "Você não está logado";
  }

  if (user) {
    saveUserLocally(user);
    if (currentPage === "index.html") {
      window.location.href = "home.html";
    }
  } else {
    clearLocalUser();
    if (protectedPages.includes(currentPage)) {
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
