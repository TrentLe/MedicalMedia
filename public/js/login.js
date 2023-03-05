const login = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

function toggle(event){
    event.preventDefault()
    const login = document.querySelector('.login-form')
    const signup = document.querySelector('.signup-form')

    if (login.classList.contains('hidden')){
        login.classList.remove('hidden')
        signup.classList.add('hidden')
    } else {
        login.classList.add('hidden')
        signup.classList.remove('hidden')
    }
}

document
    .querySelector('.login-form')
    .addEventListener('submit', login);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signup);

