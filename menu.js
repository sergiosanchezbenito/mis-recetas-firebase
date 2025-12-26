import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");
const agregarLink = document.querySelector('a[href="agregar.html"]');
const loading = document.getElementById("loading-auth");

const ADMIN_EMAIL = "sergiosanchezbenito@gmail.com";

onAuthStateChanged(auth, (user) => {
  if (loading) loading.style.display = "none";

  if (user) {
    logoutBtn.style.display = "inline";

    if (user.email === ADMIN_EMAIL) {
      agregarLink.style.display = "inline";
    } else {
      agregarLink.style.display = "none";
    }
  } else {
    logoutBtn.style.display = "none";
    agregarLink.style.display = "none";
  }
});

logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
