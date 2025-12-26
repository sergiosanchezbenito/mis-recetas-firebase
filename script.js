import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "recetas"), {
    nombre: nombre.value,
    ingredientes: ingredientes.value,
    pasos: pasos.value,
    usuario: auth.currentUser.email,
    creada: new Date()
  });

  alert("Receta guardada");
  form.reset();
});
