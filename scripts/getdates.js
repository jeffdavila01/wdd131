
 
const full = document.querySelector("#full");
const worldfull = document.querySelector("#world-full");
const year = document.querySelector("#year");
const month = document.querySelector("#month");
const day = document.querySelector("#day");
const short = document.querySelector("#short")
const medium = document.querySelector("#medium")
const currentYear = document.querySelector("#currentyear");
currentyear.textContent = new Date ().getFullYear();

function updateDateTime(){
    const lastModified = new Date(document.lastModified);

full.innerHTML = `Last Modification: <span
class="highlight">${new Intl.DateTimeFormat(
    "en-US",
{
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false
}
).format(lastModified)}
</span>`;
 
}

updateDateTime();