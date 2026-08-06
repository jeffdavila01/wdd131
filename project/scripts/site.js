
/* =========================
   MOTOGEAR PARTS JAVASCRIPT
========================= */


/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
/* Current Year */
if (currentYear) { currentYear.textContent = `${new Date().getFullYear()}`; }
/* Last Modified Date and Time */
if (lastModified) {
    const modifiedDate = new Date(document.lastModified); lastModified.textContent = `Last Modified: ${modifiedDate.toLocaleString("en-US",
        {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }
    )}`;
}


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector("#menu-toggle");
const mainMenu = document.querySelector("#main-menu");

function toggleMenu() {

    if (!menuToggle || !mainMenu) {
        return;
    }

    const menuIsOpen = mainMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        `${menuIsOpen}`
    );

    menuToggle.setAttribute(
        "aria-label",
        `${menuIsOpen
            ? "Close navigation menu"
            : "Open navigation menu"}`
    );
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}


/* =========================
   MOTO TIPS
========================= */

const motorcycleTips = [
    {
        number: "TIP 01",
        title: "Check Your Tires",
        description:
            "Check tire pressure and inspect the tread before riding."
    },
    {
        number: "TIP 02",
        title: "Inspect Your Brakes",
        description:
            "Make sure the front and rear brakes respond properly before riding."
    },
    {
        number: "TIP 03",
        title: "Maintain Your Chain",
        description:
            "Keep the chain clean, lubricated, and adjusted according to manufacturer specifications."
    },
    {
        number: "TIP 04",
        title: "Check Your Lights",
        description:
            "Make sure headlights, brake lights, and turn signals are working correctly."
    },
    {
        number: "TIP 05",
        title: "Check Your Mirrors",
        description:
            "Adjust your mirrors so you have a clear view of surrounding traffic."
    }
];

const tipNumber = document.querySelector("#tip-number");
const tipTitle = document.querySelector("#tip-title");
const tipDescription = document.querySelector("#tip-description");
const nextTip = document.querySelector("#next-tip");

let currentTip = 0;

function displayTip(index) {

    if (!tipNumber || !tipTitle || !tipDescription) {
        return;
    }

    const tip = motorcycleTips[index];

    tipNumber.textContent = `${tip.number}`;
    tipTitle.textContent = `${tip.title}`;
    tipDescription.textContent = `${tip.description}`;
}

function showNextTip() {

    currentTip =
        (currentTip + 1) % motorcycleTips.length;

    displayTip(currentTip);
}

if (nextTip) {
    nextTip.addEventListener("click", showNextTip);
}


/* =========================
   MAINTENANCE CHECKLIST
========================= */

const checklistItems =
    document.querySelectorAll(".maintenance-check");

const checklistStatus =
    document.querySelector("#checklist-status");

const checklistMessage =
    document.querySelector("#checklist-message");

const progressFill =
    document.querySelector("#progress-fill");

const saveChecklistButton =
    document.querySelector("#save-checklist");

const clearChecklistButton =
    document.querySelector("#clear-checklist");

const checklistStorageKey =
    "motogear-maintenance-checklist";


function updateChecklist() {

    if (
        !checklistStatus ||
        !checklistMessage ||
        !progressFill
    ) {
        return;
    }

    const totalTasks = checklistItems.length;

    const completedTasks =
        Array.from(checklistItems)
            .filter((item) => item.checked)
            .length;

    const percentage =
        totalTasks > 0
            ? (completedTasks / totalTasks) * 100
            : 0;

    checklistStatus.textContent =
        `${completedTasks} of ${totalTasks} tasks completed.`;

    progressFill.style.width =
        `${percentage}%`;

    if (
        completedTasks === totalTasks &&
        totalTasks > 0
    ) {

        checklistMessage.textContent =
            "Excellent! Your maintenance checklist is complete.";

    } else if (completedTasks > 0) {

        checklistMessage.textContent =
            `You have completed ${completedTasks} task${completedTasks === 1 ? "" : "s"}. Keep checking the remaining items.`;

    } else {

        checklistMessage.textContent =
            "Start your inspection before riding.";
    }
}


function saveChecklist() {

    const checklistState =
        Array.from(checklistItems).map((item) => ({
            name: item.value,
            checked: item.checked
        }));

    localStorage.setItem(
        checklistStorageKey,
        JSON.stringify(checklistState)
    );

    if (checklistMessage) {
        checklistMessage.textContent =
            "Your checklist has been saved in this browser.";
    }
}


function loadChecklist() {

    const savedChecklist =
        localStorage.getItem(checklistStorageKey);

    if (!savedChecklist) {
        updateChecklist();
        return;
    }

    try {

        const checklistState =
            JSON.parse(savedChecklist);

        checklistState.forEach((savedItem) => {

            const matchingItem =
                Array.from(checklistItems)
                    .find(
                        (item) =>
                            item.value === savedItem.name
                    );

            if (matchingItem) {
                matchingItem.checked =
                    savedItem.checked;
            }
        });

    } catch (error) {

        console.error(
            "Could not load checklist:",
            error
        );

        localStorage.removeItem(
            checklistStorageKey
        );
    }

    updateChecklist();
}


function clearChecklist() {

    localStorage.removeItem(
        checklistStorageKey
    );

    checklistItems.forEach((item) => {
        item.checked = false;
    });

    updateChecklist();

    if (checklistMessage) {
        checklistMessage.textContent =
            "Your saved checklist has been cleared.";
    }
}


checklistItems.forEach((item) => {

    item.addEventListener(
        "change",
        updateChecklist
    );

});


if (saveChecklistButton) {
    saveChecklistButton.addEventListener(
        "click",
        saveChecklist
    );
}


if (clearChecklistButton) {
    clearChecklistButton.addEventListener(
        "click",
        clearChecklist
    );
}


if (checklistItems.length > 0) {
    loadChecklist();
}

