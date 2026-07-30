const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

const select = document.querySelector("#product");

if (select) {
    products.forEach(product => {
        const option = document.createElement("option");

        option.textContent = product.name;
        option.value = product.id;

        select.appendChild(option);
    });
}


// Review Counter
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", () => {

        let reviewCount =
            Number(localStorage.getItem("reviewCount")) || 0;

        reviewCount++;

        localStorage.setItem("reviewCount", reviewCount);
    });
}


// Display Review Count
const countDisplay = document.querySelector("#reviewCount");

if (countDisplay) {
    countDisplay.textContent =
        localStorage.getItem("reviewCount") || 0;
}


// Footer Year
const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Last Modified
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent =
        `Last Modification: ${document.lastModified}`;
}