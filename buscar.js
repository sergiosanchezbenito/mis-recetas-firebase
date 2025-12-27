import { db } from "./firebase-config.js";
import { auth } from "./firebase-config.js";
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
let usuarioActual = null;

// Saber si estás logueado
onAuthStateChanged(auth, (user) => {
    usuarioActual = user;
    cargarRecetas();
});

function mostrarRecetas(recetasAMostrar) {
    lista.innerHTML = "";

    recetasAMostrar.forEach((receta) => {
        const div = document.createElement("div");
        div.style.marginBottom = "20px"; // Separación entre recetas
        div.innerHTML = `
            <h3>${receta.nombre}</h3>
            <p><strong>Ingredientes:</strong></p>
            <p>${receta.ingredientes}</p>
            <p><strong>Pasos:</strong></p>
            <p>${receta.pasos}</p>
        `;

        // Contenedor de botones
        const botonesDiv = document.createElement("div");
        botonesDiv.className = "botones"; // usar la clase CSS
        // Botón Eliminar
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.addEventListener("click", async () => {
            if (confirm("¿Seguro que quieres eliminar esta receta?")) {
                await deleteDoc(doc(db, "recetas", receta.id));
                cargarRecetas();
            }
        });
        botonesDiv.appendChild(btn);

        // Botón Editar
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => {
            // código del modal (igual que antes)
        });
        botonesDiv.appendChild(editarBtn);

        div.appendChild(botonesDiv);


        // Botón Editar
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => {
            // Abrir modal
            const modal = document.getElementById("modal-editar");
            modal.style.display = "flex";

            // Llenar campos con valores actuales
            document.getElementById("modal-nombre").value = receta.nombre;
            document.getElementById("modal-ingredientes").value = receta.ingredientes;
            document.getElementById("modal-pasos").value = receta.pasos;

            // Guardar cambios
            const guardarBtn = document.getElementById("guardar-cambios");
            guardarBtn.onclick = async () => {
                const nuevoNombre = document.getElementById("modal-nombre").value;
                const nuevosIngredientes = document.getElementById("modal-ingredientes").value;
                const nuevosPasos = document.getElementById("modal-pasos").value;

                if (nuevoNombre && nuevosIngredientes && nuevosPasos) {
                    await updateDoc(doc(db, "recetas", receta.id), {
                        nombre: nuevoNombre,
                        ingredientes: nuevosIngredientes,
                        pasos: nuevosPasos
                    });
                    alert("Receta actualizada");
                    modal.style.display = "none";
                    cargarRecetas();
                }
            };

            // Cerrar modal
            document.getElementById("cerrar-modal").onclick = () => {
                modal.style.display = "none";
            };
        });
        div.appendChild(editarBtn);
        div.appendChild(botonesDiv);
    }

        lista.appendChild(div);
});
}

async function cargarRecetas() {
    const querySnapshot = await getDocs(collection(db, "recetas"));
    recetas = querySnapshot.docs.map((docSnap) => {
        return { id: docSnap.id, ...docSnap.data() };
    });
    mostrarRecetas(recetas);
}

// Filtrado con buscador por nombre o ingredientes
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const filtradas = recetas.filter((receta) =>
        receta.nombre.toLowerCase().includes(texto) ||
        receta.ingredientes.toLowerCase().includes(texto)
    );
    mostrarRecetas(filtradas);
});
