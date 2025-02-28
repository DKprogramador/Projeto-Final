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

// Define the key for storing devices in localStorage
const localStorageKey = 'devices-list';

function validation() {
    let device = document.querySelector('.device').value; // Get the device name input
    let quantity = document.querySelector('.quantity').value; // Get the quantity input

    // Validation: Check if both fields are filled
    if (!device || !quantity) {
        alert('Please enter a device and quantity');
        return;
    }

    // Retrieve existing devices from localStorage (or initialize an empty array)
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Check if the device already exists in the list (case insensitive)
    let exists = values.some(item => item.name.toLowerCase() === device.toLowerCase());

    if (exists) {
        alert(`The device "${device}" is already in the list.`);
        return; // Stop execution if the device already exists
    }

    // If the device does not exist, add it to the list
    values.push({
        name: device,
        quantity: quantity
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values)); // Save updated list to localStorage
    showList(); // Refresh the displayed list
}

function showList() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Retrieve devices list
    let list = document.querySelector('.device-list');
    list.innerHTML = ''; // Clear the list before updating

    values.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} `;
        list.appendChild(listItem);

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
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Retrieve devices list

    values.splice(index, 1); // Remove the selected item from the array
    localStorage.setItem(localStorageKey, JSON.stringify(values)); // Save updated list to localStorage

    showList(); // Refresh the displayed list
}

showList(); // Call this initially to display existing items in the list

// Attach event listener to the button to trigger validation when clicked
const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);
