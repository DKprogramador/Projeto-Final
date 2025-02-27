// Loading Header
fetch('/view/dashboard/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Aguarda o carregamento do header e adiciona o evento ao menu-toggle
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
        alert('Please enter an equipment and quantity');
        return;
    }

    // Increment to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Check if the equipment already exists in the list
    let exists = values.some(item => item.name.toLowerCase() === equipament.toLowerCase());

    if (exists) {
        alert(`The equipment "${equipament}" is already in the list.`);
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

    values.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} `;

        // Make the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.backgroundColor = 'black';
        deleteBtn.style.border = 'none';

        deleteBtn.addEventListener('click', () => deleteItem(index));

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function deleteItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showList();
}

showList(); // Call this initially to display existing items in the list

const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);
