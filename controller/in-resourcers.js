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