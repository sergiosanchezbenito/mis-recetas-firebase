import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

window.guardarReceta = function () {
  const nombre = document.getElementById("nombre").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const pasos = document.getElementById("pasos").value;

  alert("Receta guardada (aún no en base de datos)");
};
