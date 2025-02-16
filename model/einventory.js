// Loading Header
fetch('/view/dashboard/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-container').innerHTML = data;
    
                const menuToggle = document.getElementById('mobile-menu');
                const navList = document.querySelector('.nav-list');
    
                if (menuToggle && navList) {
                    menuToggle.addEventListener('click', () => {
                        navList.classList.toggle('active');
                    });
                }
            })
            .catch(error => console.error("Erro ao carregar o header:", error));


const localStorageKey = 'equipament-list';

function validation() {
    let equipament = document.querySelector('.equipament').value;
    let quantity = document.querySelector('.quantity').value;

    // Validation
    if (!equipament || !quantity) {
        alert('Please enter a equipament and quantity');
        return;
    }

    // Increment to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Check if the equipament already exists in the list
    let exists = values.some(item => item.name.toLowerCase() === equipament.toLowerCase());

    if (exists) {
        alert(`The equipament "${equipament}" is already in the list.`);
        return; // Do not add the item if it already exists
    }

    // If it does not exist, add it to the list
    values.push({
        name: equipament,
        quantity: quantity
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showList();
}

function showList() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.querySelector('.equipament-list');
    list.innerHTML = ''; // Clear the list before updating

    values.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity}`;
        list.appendChild(listItem);
    });
}

showList(); // Call this initially to display existing items in the list

const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);