async function getUsers() {
    try {
        const response = await fetch('/view/login/users.json');
        if (!response.ok) {
            throw new Error('Erro ao buscar o arquivo de usuários');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.log('Erro ao ler o arquivo de usuários: ', err);
        return null;
    }
}


function verifyUsers(event){
    event.preventDefault();
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    getUsers().then(jsonData => {
        const foundUser = jsonData.find(u => u.name === user && u.password === password);
        if (foundUser) {
            window.location.href = "/view/dashboard/dashboard.html";
        } else {
            const fail_login = document.querySelector('.error');
            fail_login.textContent = 'Usuário ou senha inválidos';
        }
    }).catch(err => {
        console.log('Erro ao verificar usuários: ', err);
    });
}



const btn = document.getElementById('btn');
btn.addEventListener('click', verifyUsers);