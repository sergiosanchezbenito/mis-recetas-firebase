import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const ADMIN_EMAIL = "sergiosanchezbenito@gmail.com";
const form = document.getElementById("form-receta");

/* 🔒 PROTECCIÓN */
onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "login.html";
  }
});

/* 💾 GUARDAR RECETA */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "recetas"), {
      nombre: document.getElementById("nombre").value,
      ingredientes: document.getElementById("ingredientes").value,
      pasos: document.getElementById("pasos").value,
      creada: new Date()
    });

    alert("Receta guardada");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Error al guardar");
  }
});
