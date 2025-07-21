
setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}, 3000);

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const lines = document.querySelectorAll('.line');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    lines[0].classList.toggle('line-cross');
    lines[1].classList.toggle('line-fade-out');
    lines[2].classList.toggle('line-cross');
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const userType = document.getElementById('userType').value;
    const contacts = document.getElementById('contacts').value.trim();
    const error = document.getElementById('errorMessage');

    if (!name || !userType || !contacts) {
        error.textContent = "All fields are required!";
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userType, contacts })
    })
    .then(res => res.json())
    .then(data => {
        error.style.color = "green";
        error.textContent = data.message;
    })
    .catch(err => {
        error.style.color = "red";
        error.textContent = "Registration failed";
    });
});
