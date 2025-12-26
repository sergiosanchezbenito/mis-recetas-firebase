import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");
const agregarLink = document.querySelector('a[href="agregar.html"]');
const loadingText = document.getElementById("loading-auth");

const ADMIN_EMAIL = "sergiosanchezbenito@gmail.com";

onAuthStateChanged(auth, (user) => {
  // ocultamos el texto "Cargando..."
  if (loadingText) loadingText.style.display = "none";

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

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}
