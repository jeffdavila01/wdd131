/* ============================================================
   Meryenda sa Hapon — scripts/main.js

   Requirement checklist covered in this single file:
   ✔ More than one function
   ✔ DOM interaction — select, modify, listen for & react to events
   ✔ Conditional branching (if/else, ternary)
   ✔ Objects, arrays, and array methods (.map, .filter, .forEach, .find)
   ✔ Template literals ONLY for building output strings (no + concatenation)
   ✔ localStorage (favorite snack + visit note + message log)
   ============================================================ */

// ---------- Data: array of objects, used by the merienda guide page ----------
const merienda = [
  {
    id: "turon",
    name: "Turon",
    type: "fried",
    origin: "Nationwide",
    prep: "20 min",
    img: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=480&q=60",
    alt: "Turon, fried banana spring rolls, stacked on a plate",
    blurb: "Saba banana and jackfruit rolled in spring roll wrapper, fried until the sugar caramelizes into a shell."
  },
  {
    id: "banana-cue",
    name: "Banana Cue",
    type: "fried",
    origin: "Nationwide",
    prep: "15 min",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=480&q=60",
    alt: "Skewered caramelized bananas, a street food known as banana cue",
    blurb: "Saba bananas deep-fried in brown sugar until glazed, served on a bamboo skewer while still hot."
  },
  {
    id: "biko",
    name: "Biko",
    type: "kakanin",
    origin: "Nationwide",
    prep: "45 min",
    img: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=480&q=60",
    alt: "Biko, a sticky rice cake topped with latik curds",
    blurb: "Glutinous rice cooked in coconut milk and brown sugar, topped with toasted latik curds."
  },
  {
    id: "puto",
    name: "Puto",
    type: "kakanin",
    origin: "Bulacan",
    prep: "30 min",
    img: "https://images.unsplash.com/photo-1633383403791-79d3a7f5b825?w=480&q=60",
    alt: "Puto, small steamed rice cakes, arranged on a plate",
    blurb: "Steamed rice cakes, light and slightly sweet, usually served alongside dinuguan or cheese on top."
  },
  {
    id: "taho",
    name: "Taho",
    type: "cold",
    origin: "Nationwide",
    prep: "10 min",
    img: "https://images.unsplash.com/photo-1626200758693-fc9c5b4b0e3b?w=480&q=60",
    alt: "Bowl of taho, a warm silken tofu dessert with syrup and pearls",
    blurb: "Warm silken tofu with arnibal syrup and sago pearls, traditionally sold door-to-door in the morning."
  },
  {
    id: "halo-halo",
    name: "Halo-Halo",
    type: "cold",
    origin: "Nationwide",
    prep: "10 min",
    img: "https://images.unsplash.com/photo-1541599468348-e96984315921?w=480&q=60",
    alt: "A tall glass of halo-halo with shaved ice and colorful toppings",
    blurb: "Shaved ice, evaporated milk, and sweet toppings layered together — the name means \"mix-mix.\""
  }
];

// ---------- Helper: build one card's markup (template literals only) ----------
function buildSnackCard(snack, favoriteId) {
  const isFavorite = snack.id === favoriteId; // conditional check
  const buttonLabel = isFavorite ? "Saved as favorite ✓" : "Save as favorite";

  return `
    <article class="card" data-type="${snack.type}">
      <img src="${snack.img}" loading="lazy" width="480" height="360" alt="${snack.alt}">
      <h3>${snack.name}</h3>
      <p class="meta">${snack.type} &middot; ${snack.origin} &middot; ${snack.prep} prep</p>
      <p>${snack.blurb}</p>
      <button type="button" class="fav-btn" data-id="${snack.id}" data-active="${isFavorite}">
        ${buttonLabel}
      </button>
    </article>
  `;
}

// ---------- Render the full grid, optionally filtered ----------
function renderSnackGrid(filter) {
  const grid = document.getElementById("snack-grid");
  if (!grid) return; // this function only runs on snacks.html

  const favoriteId = localStorage.getItem("favoriteMerienda");

  // .filter() — conditional branching baked into the array method
  const visibleSnacks = filter === "all"
    ? merienda
    : merienda.filter((snack) => snack.type === filter);

  // .map() + template literals to build the whole grid's HTML at once
  const cardsHtml = visibleSnacks.map((snack) => buildSnackCard(snack, favoriteId)).join("");
  grid.innerHTML = cardsHtml;

  updateFavoriteBanner(favoriteId);
  attachFavoriteButtonListeners();
}

// ---------- Show a banner naming the saved favorite, using .find() ----------
function updateFavoriteBanner(favoriteId) {
  const banner = document.getElementById("favorite-banner");
  if (!banner) return;

  if (!favoriteId) {
    banner.classList.remove("visible");
    banner.textContent = "";
    return;
  }

  const favoriteSnack = merienda.find((snack) => snack.id === favoriteId);
  if (favoriteSnack) {
    banner.textContent = `Your saved favorite is ${favoriteSnack.name}. We'll remember that next time you visit.`;
    banner.classList.add("visible");
  }
}

// ---------- Event listener: clicking a "Save as favorite" button ----------
function attachFavoriteButtonListeners() {
  const buttons = document.querySelectorAll(".fav-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const chosenId = event.currentTarget.dataset.id;
      localStorage.setItem("favoriteMerienda", chosenId);

      // re-render so every card's button state and the banner stay in sync
      const activeFilterBtn = document.querySelector(".filter-bar button[aria-pressed='true']");
      const currentFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : "all";
      renderSnackGrid(currentFilter);
    });
  });
}

// ---------- Event listeners: filter bar buttons ----------
function attachFilterListeners() {
  const filterButtons = document.querySelectorAll(".filter-bar button");
  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const chosenFilter = event.currentTarget.dataset.filter;

      // update pressed state on every button (DOM modification)
      filterButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", btn === event.currentTarget ? "true" : "false");
      });

      renderSnackGrid(chosenFilter);
    });
  });
}

// ---------- Contact form validation + submission handling ----------
function attachContactFormListener() {
  const form = document.getElementById("contact-form");
  if (!form) return; // only runs on contact.html

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const topic = form.topic.value;
    const message = form.message.value.trim();
    const statusBox = document.getElementById("form-status");

    // conditional branching for simple custom validation
    if (name.length < 2 || !email.includes("@") || topic === "" || message.length < 10) {
      statusBox.textContent = "Please fill in every field before sending — messages need at least 10 characters.";
      statusBox.className = "visible error";
      return;
    }

    // Build a small object for this submission and store a log array in localStorage
    const submission = {
      name,
      topic,
      submittedAt: new Date().toLocaleString()
    };

    const existingLogRaw = localStorage.getItem("recipeLog");
    const existingLog = existingLogRaw ? JSON.parse(existingLogRaw) : [];
    existingLog.push(submission);
    localStorage.setItem("recipeLog", JSON.stringify(existingLog));

    const totalMessages = existingLog.length;

    statusBox.textContent = `Salamat, ${name} — your message about "${topic}" has been logged. That's message #${totalMessages} from this browser.`;
    statusBox.className = "visible success";
    form.reset();
  });
}

// ---------- Footer visit note, shown on every page ----------
function showVisitNote() {
  const note = document.getElementById("visit-note");
  if (!note) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date().toLocaleString();
  localStorage.setItem("lastVisit", now);

  note.textContent = lastVisit
    ? `Welcome back — you last stopped by on ${lastVisit}.`
    : `Welcome to Meryenda sa Hapon — we'll remember your next visit.`;
}

// ---------- Init: runs once the DOM is ready ----------
document.addEventListener("DOMContentLoaded", () => {
  renderSnackGrid("all");
  attachFilterListeners();
  attachContactFormListener();
  showVisitNote();
});