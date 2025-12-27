import { db, auth } from "./firebase-config.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const lista = document.getElementById("lista-recetas");
const buscador = document.getElementById("buscador");

let recetas = [];
let esAdmin = false;

// comprobar sesión
onAuthStateChanged(auth, (user) => {
  esAdmin = !!user && user.email === "sergiosanchezbenito@gmail.com";
  cargarRecetas();
});

// pintar recetas
function mostrarRecetas(datos) {
  lista.innerHTML = "";

  datos.forEach((receta) => {
    const card = document.createElement("div");
    card.className = "receta-card";

    card.innerHTML = `
      <h3>${receta.nombre}</h3>
      <p><strong>Ingredientes:</strong></p>
      <p>${receta.ingredientes}</p>
      <p><strong>Pasos:</strong></p>
      <p>${receta.pasos}</p>
    `;

    if (esAdmin) {
      const botones = document.createElement("div");
      botones.className = "botones";

      // eliminar
      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.onclick = async () => {
        if (confirm("¿Eliminar esta receta?")) {
          await deleteDoc(doc(db, "recetas", receta.id));
          cargarRecetas();
        }
      };

      // editar
      const editarBtn = document.createElement("button");
      editarBtn.textContent = "Editar";
      editarBtn.onclick = async () => {
        const nombre = prompt("Nombre:", receta.nombre);
        const ingredientes = prompt("Ingredientes:", receta.ingredientes);
        const pasos = prompt("Pasos:", receta.pasos);

        if (nombre && ingredientes && pasos) {
          await updateDoc(doc(db, "recetas", receta.id), {
            nombre,
            ingredientes,
            pasos
          });
          cargarRecetas();
        }
      };

      botones.appendChild(editarBtn);
      botones.appendChild(eliminarBtn);
      card.appendChild(botones);
    }

    lista.appendChild(card);
  });
}

// cargar desde firestore
async function cargarRecetas() {
  const snapshot = await getDocs(collection(db, "recetas"));
  recetas = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  mostrarRecetas(recetas);
}

// buscar
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();

  const filtradas = recetas.filter((r) =>
    r.nombre.toLowerCase().includes(texto) ||
    r.ingredientes.toLowerCase().includes(texto)
  );

  mostrarRecetas(filtradas);
});
