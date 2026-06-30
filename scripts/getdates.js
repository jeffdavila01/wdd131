
 
const full = document.querySelector("#full");
const worldfull =
document.querySelector("#world-full");
const year = document.querySelector("#year");
const month = document.querySelector("#month");
const day = document.querySelector("#day");
const short = document.querySelector("#short")
const medium = document.querySelector("#medium")

function updateDateTime(){
    full.textContent = "Last Modified:" + document.lastModified;
const today = new Date();

full.innerHTML = `Last Modification: <span
class="highlight">${new Intl.DateTimeFormat(
    "en-US",
{
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false
}
).format(today)}
</span>`;
 
}

setInterval(updateDateTime, 1000);