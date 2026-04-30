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

const email = document.getElementById('user')
const password = document.getElementById('pass')

const createAccountBtn = document.getElementById('registerBtn')
const loginBtn = document.getElementById('loginBtn')
const logoutBtn = document.getElementById('logout-button')

createAccountBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    console.log('Create Account Button Clicked')
    console.log(`Email: ${email.value}`)
    console.log(`Password: ${password.value}`)

    sessionStorage.setItem(ususu, email.value);
})

loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });

    console.log('Login Clicked')
    console.log(`Email: ${email.value}`)
    console.log(`Password: ${password.value}`)

    sessionStorage.setItem(ususu, email.value);
})

//daqui pra baixo é putaria

// 🔹 MONITORA LOGIN (ESSA É A PARTE MAIS IMPORTANTE)
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("status");

  if (user) {
    console.log("Logado:", user.email);

    if (status) {
      status.innerText = "Logado como: " + user.email;
    }

  } else {
    console.log("Não logado");

    if (status) {
      status.innerText = "Você não está logado";
    }

    // 🔒 BLOQUEIA PÁGINAS PROTEGIDAS
    if (window.location.pathname.includes("home.html")) {
      window.location.href = "login.html";
    }
  }
});

// 🔹 LOGOUT
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

const senha = document.getElementById("pass");
const msg = document.getElementById("msg");

// 🔹 LOGIN
document.getElementById("loginBtn").addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, senha.value)
    .then(() => {
      msg.innerText = "Login realizado!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      msg.innerText = "Erro: " + error.message;
    });
});

// 🔹 CADASTRO
document.getElementById("registerBtn").addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, senha.value)
    .then(() => {
      msg.innerText = "Conta criada!";
    })
    .catch((error) => {
      msg.innerText = "Erro: " + error.message;
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("userLogged"));

    const loginBtn = document.querySelector("loginBtn");

    if (user) {
        loginBtn.textContent = "Logout";

        loginBtn.addEventListener("click", () => {
            localStorage.removeItem("userLogged");
            signOut(auth);
            window.location.reload();
        });
    } else {
        loginBtn.textContent = "Login";
        loginBtn.href = "login.html";
    }
});