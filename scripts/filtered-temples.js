const temples = [
    {
        templeName: "Salt Lake Temple",
        location: "50 W North Temple St Salt Lake City",
        dedicated: "1893, April, 6-24",
        area: 382207,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
    },
    {
      templeName: "Lima Peru Temple",
      location: "Av. Javier Prado Este 6420 Urb. Santa Patricia La Molina Lima 12 Peru",
      dedicated: "1986, January, 10-12",
      area: 9600,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-9681-thumb.jpg",
    },
    {
      templeName: "Manila Philippines Temple",
      location: "Quezon city, 1110 Metro Manila",
      dedicated: "1984, September, 25-27",
      area: 26683,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg",
    },
    {
        templeName: "Los Angeles California Temple",
        location: "10777 Santa Monica Blvd Los Angeles, California United States",
        dedicated: "1956, March, 11-14",
        area: 190614,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/los-angeles-california-temple/los-angeles-california-temple-38945-main.jpg",
    },
    {
        templeName: "Urdaneta Philippines Temple",
        location: "175 N 300 E Logan, Utah  84321-4720 United States",
        dedicated: "2024, April, 28",
        area: 32604,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg",
    },
    {
        templeName: "ST. George Utah Temple",
        location: "250 E 400 S St. George, Utah United States",
        dedicated: "1877, April, 6-8",
        area: 74792,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg",
    },
    {
        templeName: "Taipei Taiwan Temple",
        location: "256 Ai Kuo East Road Taipei Taiwan",
        dedicated: "1984, November, 17-18",
        area: 9945,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/taipei-taiwan-temple/taipei-taiwan-temple-8302-thumb.jpg",
    },
    {
        templeName: "Tokyo Japan Temple",
        location: "5-8-10 Minami Azabu Minato-ku Tokyo  106-0047 Japan",
        dedicated: "2022, July, 3",
        area: 53997,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
    },
    {
        templeName: "Logan Utah Temple",
        location: "175 N 300 E Logan, Utah United States",
        dedicated: "1884, May, 17-19",
        area: 28075,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg",
    },
    {
        templeName: "Manti Utah Temple",
        location: "200 E 510 N Manti, Utah United States",
        dedicated: "1888, May, 21-23",
        area: 74792,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-46809-thumb.jpg",
    },
];

const container = document.getElementById('temples-container');
const pageTitle = document.getElementById('page-title');
 
function getDedicatedYear(dedicatedString) {
    return parseInt(dedicatedString.split(',')[0].trim(), 10);
}
 
function renderTemples(templeList) {
    if (!container) return;
    container.innerHTML = '';
 
    templeList.forEach(temple => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = 'lazy';
 
        const figcaption = document.createElement('figcaption');
 
        const name = document.createElement('h3');
        name.textContent = temple.templeName;
 
        const location = document.createElement('p');
        location.textContent = `Location: ${temple.location}`;
 
        const dedicated = document.createElement('p');
        dedicated.textContent = `Dedicated: ${temple.dedicated}`;
 
        const area = document.createElement('p');
        area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
 
        figcaption.append(name, location, dedicated, area);
        figure.append(img, figcaption);
        container.appendChild(figure);
    });
}
 
const filters = {
    home: () => temples,
    old: () => temples.filter(t => getDedicatedYear(t.dedicated) < 1900),
    new: () => temples.filter(t => getDedicatedYear(t.dedicated) > 2000),
    large: () => temples.filter(t => t.area > 90000),
    small: () => temples.filter(t => t.area < 10000)
};
 
const filterLabels = {
    home: 'Home',
    old: 'Old Temples',
    new: 'New Temples',
    large: 'Large Temples',
    small: 'Small Temples'
};
 
function applyFilter(filterName) {
    const filterFn = filters[filterName] || filters.home;
    renderTemples(filterFn());
    if (pageTitle) {
        pageTitle.textContent = filterLabels[filterName] || 'Home';
    }
}
 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
 
if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
}
const navLinks = document.querySelectorAll('nav a[data-filter]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        applyFilter(link.dataset.filter);
        if (menu) menu.classList.remove('open');
    });
});
 
const currentYear = document.getElementById("currentyear");
const full = document.getElementById("full");
const clock = document.getElementById("clock");
 
function updateDateTime() {
    const lastModified = new Date(document.lastModified);
    full.innerHTML = `Last Modified: <span>${lastModified.toLocaleDateString()}</span>`;
}
 
function updateYear() {
    currentYear.textContent = new Date().getFullYear();
}
 
function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
applyFilter('home');
updateDateTime();
updateYear();
updateClock();
 
setInterval(updateClock, 1000);
