document.addEventListener('DOMContentLoaded', () => {

  // 1. Aplica rotações aleatórias leves às badges de Skills (estilo desalinhado de HQ)
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach(badge => {
    const randomDeg = (Math.random() * 6 - 3).toFixed(1); // entre -3deg e 3deg
    badge.style.transform = `rotate(${randomDeg}deg)`;
  });

  // 2. Efeito interativo 3D Pop nos cards de projetos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const tiltDeg = Math.random() > 0.5 ? 2 : -2;
      card.style.transform = `translate(-6px, -6px) rotate(${tiltDeg}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translate(0, 0) rotate(0deg)';
    });
  });

  // 3. Scroll Suave para os links da navegação
  const navLinks = document.querySelectorAll('header nav ul li a, a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});
