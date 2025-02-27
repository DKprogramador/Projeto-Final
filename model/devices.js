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


const localStorageKey = 'vehicle-list';

function validation() {
    let vehicle = document.querySelector('.vehicle').value;
    let quantity = document.querySelector('.quantity').value;

    // Validation
    if (!vehicle || !quantity) {
        alert('Please enter a vehicle and quantity');
        return;
    }

    // Increment to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Check if the vehicle already exists in the list
    let exists = values.some(item => item.name.toLowerCase() === vehicle.toLowerCase());

    if (exists) {
        alert(`The vehicle "${vehicle}" is already in the list.`);
        return; // Do not add the item if it already exists
    }

    // If it does not exist, add it to the list
    values.push({
        name: vehicle,
        quantity: quantity
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showList();
}

function showList() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.querySelector('.device-list');
    list.innerHTML = ''; // Clear the list before updating

    values.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} `;
        list.appendChild(listItem);

        //Make the delete button
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

function deleteItem(index){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    showList()
}

showList(); // Call this initially to display existing items in the list

const btn = document.querySelector('.btn');
btn.addEventListener('click', validation);
