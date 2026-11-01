// 5. Função de Login Atualizada com Feedback
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Entrando...';
  submitBtn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Se der certo, o onAuthStateChanged vai esconder a tela de login automaticamente
  } catch (error) {
    console.error("Erro detalhado do Firebase:", error.code, error.message);
    alert("Erro ao logar: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});
