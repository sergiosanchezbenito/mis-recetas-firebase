import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const ADMIN_EMAIL = "sergiosanchezbenito@gmail.com";
const linkAgregar = document.querySelector('a[href="agregar.html"]');

onAuthStateChanged(auth, (user) => {
  if (user && user.email === ADMIN_EMAIL) {
    linkAgregar.style.display = "inline";
  } else {
    linkAgregar.style.display = "none";
  }
});
