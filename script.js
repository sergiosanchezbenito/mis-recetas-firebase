// script.js
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById("form-receta");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const ingredientes = document.getElementById("ingredientes").value.trim();
  const pasos = document.getElementById("pasos").value.trim();

  if (!nombre || !ingredientes || !pasos) {
    alert("Rellena todos los campos");
    return;
  }

  try {
    await addDoc(collection(db, "recetas"), {
      nombre,
      ingredientes,
      pasos,
      creada: new Date()
    });

    alert("Receta guardada correctamente");
    form.reset();

  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error al guardar la receta");
  }
});
