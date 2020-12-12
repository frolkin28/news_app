const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);

const registerRequest = new Request(
    '/auth/register/',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'test',
            first_name: 'first',
            last_name: 'last'
        })
    }
);

const loginRequest = new Request(
    '/auth/login/',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'test',
        })
    }
);

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


const logoutRequest = new Request(
    '/auth/logout/',
    {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    }
);

function register() {
    fetch(registerRequest)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
}


function login() {
    fetch(loginRequest)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
}

function logout() {
    fetch(logoutRequest)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
}