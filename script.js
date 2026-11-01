document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Efeito Tilt (inclinação 3D sutil) nos cards
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((x - centerX) / centerX) * 5; 
      const tiltY = ((y - centerY) / centerY) * -5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      card.style.transition = 'transform 0.5s ease'; 
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; 
    });
  });

  // 2. Scroll Suave Apenas para links internos da página atual
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // Ignora links vazios ou que apenas referenciam o topo isolado
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});

// 3. Função Global para Copiar Prompts (Usada no prompts.html)
function copyPrompt(elementId, btnElement) {
  const promptText = document.getElementById(elementId).innerText;
  
  navigator.clipboard.writeText(promptText).then(() => {
    const originalHTML = btnElement.innerHTML;
    
    // Feedback visual de sucesso
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
    btnElement.style.color = '#10b981'; 
    btnElement.style.borderColor = '#10b981';
    
    // Retorna ao estado original após 2 segundos
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.style.color = '';
      btnElement.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Falha ao copiar: ', err);
  });
}
