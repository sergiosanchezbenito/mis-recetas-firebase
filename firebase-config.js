import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyAoM07NuY5DrqRlnaul_5EmuyyYPPiB008",
  authDomain: "recetas-web-sergio.firebaseapp.com",
  projectId: "recetas-web-sergio",
  storageBucket: "recetas-web-sergio.firebasestorage.app",
  messagingSenderId: "834712729388",
  appId: "1:834712729388:web:2847380401bbc4e6189e89",
  measurementId: "G-4Z187CMTSR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);