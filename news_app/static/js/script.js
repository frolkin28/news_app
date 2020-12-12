const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logout');
const testButton = document.getElementById('test');
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
testButton.addEventListener('click', test);

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


function test() {
    const uuid = 'a233dc01-7631-4f6e-83ee-467ac13f6013';
    const news_uuid = 'c4439cb1-ea93-40bf-b213-e09b9aa76d8f'

    fetch(
        `/api/news/`,
        {
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uuid": "5bb6896d-fba2-4997-95ad-590bd40b0537",
                "title": "title 1",
                "content": "some updated content",
                "photo": null,
                "tags": []
            })
        }
    )
        .then(res => res.json())
        .then(res => console.log(res))
}