// Adiciona um log simples ao carregar
console.log("Portfólio carregado com sucesso!");

// Opcional: Efeito simples de foco ao passar o mouse nos projetos
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.02)';
        card.style.transition = '0.3s';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});
