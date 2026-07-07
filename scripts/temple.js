const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

const currentYear = document.getElementById("currentyear");
const full = document.getElementById("full");
const clock = document.getElementById("clock");

function updateDateTime(){
    const lastModified = new Date(document.lastModified);
    full.innerHTML = `Last Modified: <span>${lastModified.toLocaleDateString()}</span>`;
}

function updateYear(){
    currentYear.textContent = new Date().getFullYear();
}

function updateClock(){
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

updateDateTime();
updateYear();
updateClock();

setInterval(updateClock, 1000);