import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

// INSIRA SUAS CHAVES AQUI
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "portfolio-maicon-admin.firebaseapp.com",
  projectId: "portfolio-maicon-admin",
  storageBucket: "portfolio-maicon-admin.appspot.com",
  messagingSenderId: "917407154594",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const uploadPromptForm = document.getElementById('uploadPromptForm');

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'block';
    renderChart();
  } else {
    loginScreen.style.display = 'block';
    adminDashboard.style.display = 'none';
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert("Erro ao logar: " + error.message));
});

logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

window.switchTab = function(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
};

function renderChart() {
  const ctx = document.getElementById('visitsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Acessos ao Portfólio (Mock)',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: {
        x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });
}

if (uploadPromptForm) {
  uploadPromptForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('promptTitle').value;
    const text = document.getElementById('promptText').value;
    const imageFile = document.getElementById('promptImageFile').files[0];

    if (!imageFile) return alert("Selecione uma imagem.");

    const submitBtn = uploadPromptForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fazendo Upload...';
    submitBtn.disabled = true;

    try {
      const fileName = `prompts/${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "ai_prompts"), {
        title: title,
        promptText: text,
        imageUrl: downloadURL,
        createdAt: new Date()
      });

      alert("Prompt salvo com sucesso!");
      uploadPromptForm.reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar: " + error.message);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
