document.addEventListener('DOMContentLoaded', () => {
  // Efeito Tilt (inclinação 3D sutil) ao passar o mouse nos cards de projeto
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((x - centerX) / centerX) * 5; // Máximo de 5 graus de inclinação
      const tiltY = ((y - centerY) / centerY) * -5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      card.style.transition = 'transform 0.5s ease'; // Suaviza o retorno
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; // Remove transição durante o movimento para fluidez
    });
  });

  // Scroll suave para a navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
