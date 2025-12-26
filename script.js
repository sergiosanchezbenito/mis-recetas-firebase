import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const form = document.querySelector("form");

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
      nombre: nombre,
      ingredientes: ingredientes,
      pasos: pasos,
      usuario: auth.currentUser.email,
      creada: new Date()
    });

    alert("Receta guardada correctamente");
    form.reset();

  } catch (error) {
    alert("Error al guardar la receta");
    console.error(error);
  }
});
