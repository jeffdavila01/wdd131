const temples = [
    {
        templeName: "Bacolod Philippines Temple",
        location: "Bacolod Airport Access Road, Philippines",
        dedicated: "2026, May, 31",
        area: 27895,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bacolod-philippines-temple/bacolod-philippines-temple-70237-main.jpg",
    },
    {
      templeName: "Cebu Philippines Temple",
      location: "Gorodo Avenue Barangay Lahug Cebu City",
      dedicated: "2010, June, 13",
      area: 29556,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/133-Cebu-City-Philippines-Temple.jpg",
    },
    {
      templeName: "Manila Philippines Temple",
      location: "Quezon city, 1110 Metro Manila",
      dedicated: "1984, September, 25-27",
      area: 26683,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg",
    },
    {
        templeName: "Davao Philippines Temple",
        location: "Davao City, 8000 Davao Del Sur",
        dedicated: "2026, May, 3",
        area: 18450,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/davao-philippines-temple/davao-philippines-temple-69513-main.jpg",
    },
    {
        templeName: "Urdaneta Philippines Temple",
        location: "MacArthur Highway Barangay Nancayasan Urdaneta City, 2428 Pangasinan",
        dedicated: "2024, April, 28",
        area: 32604,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg",
    },
    {
        templeName: "Salt Lake Temple",
        location: "50 W North Temple St Salt Lake City",
        dedicated: "1893, February, 14",
        area: 382207,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
    },
    {
        templeName: "Nauvoo Illinois Temple",
        location: "50 N Wells St Nauvoo, Illinois  62354 United States",
        dedicated: "2002, June, 27-30",
        area: 54000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg",
    },
    {
        templeName: "Tokyo Japan Temple",
        location: "5-8-10 Minami Azabu Minato-ku Tokyo  106-0047 Japan",
        dedicated: "2022, July, 3",
        area: 53997,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
    },
    {
        templeName: "Seoul Korea Temple",
        location: "Sinchon-ro 7 GIL 21 Seodaemun-gu Seoul, Seoul-teukbyeolsi  03783 South Korea",
        dedicated: "1985, December, 154-15",
        area: 28075,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/seoul-korea-temple/seoul-korea-temple-22305-main.jpg",
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
