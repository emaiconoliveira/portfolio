import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// SUAS CHAVES REAIS DO FIREBASE
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

// Função de Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'A entrar...';
  submitBtn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erro detalhado do Firebase:", error.code, error.message);
    alert("Erro ao logar: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
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

// Função auxiliar para converter o arquivo de imagem em Base64 de forma otimizada
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

if (uploadPromptForm) {
  uploadPromptForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('promptTitle').value;
    const text = document.getElementById('promptText').value;
    const imageFile = document.getElementById('promptImageFile').files[0];

    if (!imageFile) return alert("Selecione uma imagem.");

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Erro: Você precisa estar logado!");
      return;
    }

    const submitBtn = uploadPromptForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> A processar imagem...';
    submitBtn.disabled = true;

    try {
      // Converte a imagem para Base64 diretamente no browser (Sem usar o Storage/CORS)
      const base64Image = await convertFileToBase64(imageFile);

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> A salvar no Firestore...';

      // Salva direto no Firestore
      await addDoc(collection(db, "ai_prompts"), {
        title: title,
        promptText: text,
        imageUrl: base64Image,
        createdAt: new Date()
      });

      alert("Prompt e imagem salvos com sucesso no Catálogo!");
      uploadPromptForm.reset();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar: " + error.message);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
