// --- Lógica do Catálogo de Prompts Dinâmico ---

// 1. Array inicial caso não tenha nada salvo (Seu setup de iluminação e vintage)
const defaultPrompts = [
  {
    id: 'p1',
    title: 'Retrato Vintage 1980s',
    image: 'https://via.placeholder.com/400x300/2a1b3d/ff007f?text=Vintage+1980s',
    text: 'A cinematic 1980s style portrait photography of a young man, neon pink and cyan lighting, retro aesthetic, highly detailed, shot on 35mm film, vintage film grain.'
  }
];

// 2. Carrega os prompts salvos ou usa o padrão
let savedPrompts = JSON.parse(localStorage.getItem('aiPrompts')) || defaultPrompts;

// 3. Renderiza o catálogo na página prompts.html
const catalogGrid = document.getElementById('catalogGrid');
if (catalogGrid) {
  savedPrompts.forEach(prompt => {
    const card = document.createElement('div');
    card.className = 'project-card glass';
    card.setAttribute('data-tilt', 'true');
    
    // Layout focado em catálogo: Imagem em destaque, título e botão embutido
    card.innerHTML = `
      <img src="${prompt.image}" alt="${prompt.title}" class="prompt-img" style="margin-bottom: 10px;">
      <h3 style="text-align: center; font-size: 1rem;">${prompt.title}</h3>
      <p id="${prompt.id}" style="display: none;">${prompt.text}</p> <!-- Texto oculto para cópia limpa -->
      <button class="skill-tag copy-btn" onclick="copyPrompt('${prompt.id}', this)" style="width: 100%; margin-top: auto; padding: 12px;">
        <i class="fa-solid fa-copy"></i> Copiar Prompt
      </button>
    `;
    catalogGrid.appendChild(card);
  });
}

// 4. Salva novos prompts através da página config.html
const promptForm = document.getElementById('promptForm');
if (promptForm) {
  promptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPrompt = {
      id: 'p' + Date.now(), // Gera um ID único
      title: document.getElementById('promptTitle').value,
      image: document.getElementById('promptImage').value,
      text: document.getElementById('promptText').value
    };
    
    savedPrompts.push(newPrompt);
    localStorage.setItem('aiPrompts', JSON.stringify(savedPrompts));
    
    alert('Prompt adicionado com sucesso!');
    promptForm.reset();
  });
}

// 5. Função de Copiar atualizada
window.copyPrompt = function(elementId, btnElement) {
  const promptText = document.getElementById(elementId).innerText;
  
  navigator.clipboard.writeText(promptText).then(() => {
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
    btnElement.style.color = '#10b981'; 
    btnElement.style.borderColor = '#10b981';
    
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.style.color = '';
      btnElement.style.borderColor = '';
    }, 2000);
  });
};

// Função para copiar o texto do prompt de IA
function copyPrompt(elementId, btnElement) {
  // Pega o texto do elemento
  const promptText = document.getElementById(elementId).innerText;
  
  // Usa a API da área de transferência
  navigator.clipboard.writeText(promptText).then(() => {
    // Feedback visual
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
    btnElement.style.color = '#10b981'; // Muda para verde
    btnElement.style.borderColor = '#10b981';
    
    // Retorna ao normal após 2 segundos
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.style.color = '';
      btnElement.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Falha ao copiar: ', err);
  });
}

// --- 9. Lógica de Upload de Imagem e Gravação do Prompt ---

const uploadPromptForm = document.getElementById('uploadPromptForm');

if (uploadPromptForm) {
  uploadPromptForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('promptTitle').value;
    const text = document.getElementById('promptText').value;
    const imageFile = document.getElementById('promptImageFile').files[0];

    if (!imageFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    // Altera o texto do botão para dar feedback visual de carregamento
    const submitBtn = uploadPromptForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fazendo Upload...';
    submitBtn.disabled = true;

    try {
      // 1. Define o caminho no Storage (pasta 'prompts' + timestamp para evitar nome duplicado)
      const fileName = `prompts/${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);

      // 2. Faz o upload da imagem física para o Firebase Storage
      const snapshot = await uploadBytes(storageRef, imageFile);
      
      // 3. Obtém a URL pública de download da imagem que acabou de subir
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 4. Grava o documento no Firestore Database na coleção 'ai_prompts'
      await addDoc(collection(db, "ai_prompts"), {
        title: title,
        promptText: text,
        imageUrl: downloadURL,
        createdAt: new Date() // Grava a data para ordenar depois
      });

      alert("Prompt e Imagem salvos com sucesso no Catálogo!");
      uploadPromptForm.reset(); // Limpa o formulário

    } catch (error) {
      console.error("Erro no upload: ", error);
      alert("Erro ao salvar: " + error.message);
    } finally {
      // Retorna o botão ao estado normal
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
