import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

document.getElementById("btn-login").addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => window.location.href = "index.html")
    .catch(err => errorMessage.textContent = err.message);
});

document.getElementById("btn-register").addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => window.location.href = "index.html")
    .catch(err => errorMessage.textContent = err.message);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});
