import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

// SUAS CHAVES REAIS
const firebaseConfig = {
  apiKey: "AIzaSyD_kNnxzQAJbW-oYQjJq5H3aR3ixonby1Q",
  authDomain: "portfolio-maicon-admin.firebaseapp.com",
  projectId: "portfolio-maicon-admin",
  storageBucket: "portfolio-maicon-admin.firebasestorage.app",
  messagingSenderId: "917407154594",
  appId: "1:917407154594:web:4e7276e0a163eafcd0f2fb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ... (resto do seu código admin.js continua igual)
