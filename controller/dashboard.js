document.addEventListener('DOMContentLoaded', () => {
    // Simulated data for security, resources, and recent activities
    const securityData = "Security Level: High"; // Security level
    const resourcesData = "Available resources: 85%"; // Available resources
    const activitiesData = "Recent activities: 12"; // Recent activities

    // Updates the content of the corresponding elements
    document.getElementById('security-data').textContent = securityData;
    document.getElementById('resources-data').textContent = resourcesData;
    document.getElementById('activities-data').textContent = activitiesData;
});

// Selects the mobile menu button and navigation list
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

// Toggles the "active" class on the navigation list when the menu button is clicked
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    // Selects all elements with the "card" class
    const cards = document.querySelectorAll(".card");

    // Adds a click event listener to each card
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Toggles the "flipped" class to create a flip animation effect
            card.classList.toggle("flipped");
        });
    });
});
