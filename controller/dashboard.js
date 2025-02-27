document.addEventListener('DOMContentLoaded', () => {
    // Simulação de dados
    const securityData = "Nível de segurança: Alto";
    const resourcesData = "Recursos disponíveis: 85%";
    const activitiesData = "Atividades recentes: 12";

    // Atualiza o conteúdo dos elementos
    document.getElementById('security-data').textContent = securityData;
    document.getElementById('resources-data').textContent = resourcesData;
    document.getElementById('activities-data').textContent = activitiesData;
});

const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
});