// Loading Header
fetch('/view/dashboard/header.html')
    .then(response => response.text()) // Fetch the header HTML file
    .then(data => {
        document.getElementById('header-container').innerHTML = data; // Insert the header into the page

        // Wait for the header to load and then add event listener to the menu toggle button
        const menuToggle = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');

        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                navList.classList.toggle('active'); // Show or hide the navigation menu
            });
        }
    })
    .catch(error => console.error("Error loading the header:", error)); // Handle loading errors

// Define the key for storing vehicles in localStorage
const localStorageKey = 'vehicle-list';

function validation() {
    let vehicle = document.querySelector('.vehicle').value; // Get the vehicle name input
    let quantity = document.querySelector('.quantity').value; // Get the quantity input

    // Validation: Check if both fields are filled
    if (!vehicle || !quantity) {
        alert('Please enter a vehicle and quantity');
        return;
    }

    // Retrieve existing vehicles from localStorage (or initialize an empty array)
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Check if the vehicle already exists in the list (case insensitive)
    let exists = values.some(item => item.name.toLowerCase() === vehicle.toLowerCase());

    if (exists) {
        alert(`The vehicle "${vehicle}" is already in the list.`);
        return; // Stop execution if the vehicle already exists
    }

    // If the vehicle does not exist, add it to the list
    values.push({
        name: vehicle,
        quantity: quantity
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values)); // Save updated list to localStorage
    showList(); // Refresh the displayed list
}

function showList() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Retrieve vehicle list
    let list = document.querySelector('.vehicle-list');
    list.innerHTML = ''; // Clear the list before updating

    values.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} `;

        // Create the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.backgroundColor = 'black';
        deleteBtn.style.border = 'none';

        deleteBtn.addEventListener('click', () => deleteItem(index)); // Attach event to remove item

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function deleteItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Retrieve vehicle list

    values.splice(index, 1); // Remove the selected item from the array
    localStorage.setItem(localStorageKey, JSON.stringify(values)); // Save updated list to localStorage

    showList(); // Refresh the displayed list
}

showList(); // Call this initially to display existing items in the list

// Attach event listener to the button to trigger validation when clicked
const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);
