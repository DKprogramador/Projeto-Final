// Function to fetch user data from the JSON file
async function getUsers() {
    try {
        const response = await fetch('/view/login/users.json'); // Fetch user data
        if (!response.ok) {
            throw new Error('Error fetching the user file'); // Handle fetch errors
        }
        const jsonData = await response.json(); // Parse JSON response
        return jsonData; // Return parsed data
    } catch (err) {
        console.log('Error reading the user file: ', err); // Log errors
        return null; // Return null in case of an error
    }
}

// Function to verify user credentials
function verifyUsers(event) {
    event.preventDefault(); // Prevent default form submission

    // Get user input values
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    // Call getUsers() to retrieve user data
    getUsers().then(jsonData => {
        // Find a matching user in the JSON data
        const foundUser = jsonData.find(u => u.name === user && u.password === password);

        if (foundUser) {
            // Redirect to the dashboard if login is successful
            window.location.href = "/view/dashboard/dashboard.html";
        } else {
            // Show an error message if login fails
            const fail_login = document.querySelector('.error');
            fail_login.textContent = 'Invalid username or password';
        }
    }).catch(err => {
        console.log('Error verifying users: ', err); // Log any errors
    });
}

// Add event listener to the login button
const btn = document.getElementById('btn');
btn.addEventListener('click', verifyUsers);
