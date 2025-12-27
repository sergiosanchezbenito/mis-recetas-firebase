import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const form = document.querySelector("form");

if (!form) {
  // No estamos en agregar.html
  console.warn("Formulario no encontrado");
} else {

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const pasos = document.getElementById("pasos").value;

    try {
      await addDoc(collection(db, "recetas"), {
        nombre,
        ingredientes,
        pasos,
        usuario: auth.currentUser.email,
        creada: new Date()
      });

      alert("Receta guardada");
      form.reset();

    } catch (error) {
      console.error("Error al guardar la receta:", error);
      alert("Error al guardar la receta");
    }
  });
}
