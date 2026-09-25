// ============================================
// MONOUSCAR — Location de voiture à Marrakech
// ============================================

// ---------------------------------------------------------------
// 1) CONTACT NUMBER
// Replace this with the real WhatsApp / phone number before going
// live. Use the international format, digits only, no "+" and no
// spaces (country code + number). Example for Morocco: "2126########"
// ---------------------------------------------------------------
const CONTACT = {
  phoneIntl: "212600000000",          // TODO: remplacer par le vrai numéro
  phoneDisplay: "+212 6 00 00 00 00", // TODO: version affichée à l'écran
  defaultMessage: "Bonjour MONOUSCAR, je souhaite réserver une voiture à Marrakech."
};

// ---------------------------------------------------------------
// 2) FLEET DATA
// Each car has a photo from Wikimedia Commons (free licence).
// "photo"  = exact file name on commons.wikimedia.org
// To use YOUR OWN photo instead, put the image in assets/cars/ and set
// e.g.  localPhoto: "assets/cars/clio-2022.jpg"  (it takes priority).
// ---------------------------------------------------------------
const FLEET = [
  {
    brand: "Hyundai",
    model: "Accent",
    year: 2026,
    gearbox: "Automatique",
    fuel: "Essence",
    price: 35,
    qty: 2,
    photo: "Hyundai Accent Design 2024 (53443284447).jpg"
  },
  {
    brand: "Peugeot",
    model: "208",
    year: 2023,
    gearbox: "Manuel",
    fuel: "Diesel",
    price: 30,
    qty: 1,
    photo: "2021 Peugeot 208 1.2 PureTech 100 Allure (Front).jpg"
  },
  {
    brand: "Peugeot",
    model: "208",
    year: 2026,
    gearbox: "Manuel",
    fuel: "Diesel",
    price: 30,
    qty: 1,
    photo: "2024 Peugeot 208 GT PureTech - 1200cc 1.2 (100PS) Petrol - Agueda Yellow - 06-2024, Front.jpg"
  },
  {
    brand: "Dacia",
    model: "Logan",
    year: 2025,
    gearbox: "Manuel",
    fuel: "Diesel",
    price: 30,
    qty: 1,
    photo: "Dacia Logan 2023 Front (cropped).jpg"
  },
  {
    brand: "Renault",
    model: "Clio 5",
    year: 2025,
    gearbox: "Automatique",
    fuel: "Essence",
    price: 35,
    qty: 1,
    photo: "Renault Clio V TCe 90 (2025) (54717049164).jpg"
  },
  {
    brand: "Renault",
    model: "Clio 5",
    year: 2022,
    gearbox: "Manuel",
    fuel: "Diesel",
    price: 30,
    qty: 3,
    photo: "2019 Renault Clio Iconic TCE 1.0 Front.jpg"
  },
  {
    brand: "Volkswagen",
    model: "Golf 8",
    year: 2023,
    gearbox: "Automatique",
    fuel: "Diesel",
    price: 80,
    qty: 1,
    photo: "2020 Volkswagen Golf Style 1.5 Front.jpg"
  }
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || CONTACT.defaultMessage);
  return `https://wa.me/${CONTACT.phoneIntl}?text=${text}`;
}

function commonsFile(name) {
  return encodeURIComponent(name.replace(/ /g, "_"));
}

function carPhotoUrl(car) {
  if (car.localPhoto) return car.localPhoto;
  if (!car.photo) return "";
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${commonsFile(car.photo)}?width=800`;
}

function carPhotoPage(car) {
  return car.photo ? `https://commons.wikimedia.org/wiki/File:${commonsFile(car.photo)}` : "";
}

function carLabel(car) {
  return `${car.brand} ${car.model} (${car.year})`;
}

// ---------------------------------------------------------------
// Render fleet cards
// ---------------------------------------------------------------
function renderFleet() {
  const grid = document.getElementById("fleetGrid");
  if (!grid) return;

  const cardsHtml = FLEET.map((car) => {
    const qtyBadge = car.qty > 1
      ? `<span class="car-card-qty">${car.qty} disponibles</span>`
      : "";

    const photoUrl = carPhotoUrl(car);
    const photoCredit = (!car.localPhoto && car.photo)
      ? `<a class="car-photo-credit" href="${carPhotoPage(car)}" target="_blank" rel="noopener" title="Crédit photo et licence">Photo : Wikimedia Commons</a>`
      : "";

    const message = `Bonjour MONOUSCAR, je souhaite réserver la ${carLabel(car)} — ${car.gearbox}, ${car.fuel}. Est-elle disponible ?`;

    return `
      <article class="car-card reveal">
        <div class="car-card-visual">
          <svg class="car-fallback" aria-hidden="true"><use href="#icon-car"></use></svg>
          ${photoUrl ? `<img src="${photoUrl}" alt="${car.brand} ${car.model} ${car.year}" loading="lazy" onerror="this.remove()">` : ""}
          ${qtyBadge}
          ${photoCredit}
        </div>
        <h3>${car.brand} ${car.model}</h3>
        <p class="car-year">
          <svg width="13" height="13" style="vertical-align:-2px;margin-right:4px;color:#b8891f"><use href="#icon-calendar"></use></svg>
          ${car.year}
        </p>
        <div class="car-specs">
          <span><svg width="14" height="14"><use href="#icon-gearbox"></use></svg>${car.gearbox}</span>
          <span><svg width="14" height="14"><use href="#icon-fuel"></use></svg>${car.fuel}</span>
        </div>
        <div class="car-card-footer">
          <p class="car-price">${car.price}€<span>/ jour</span></p>
          <a class="car-cta" href="${buildWhatsAppLink(message)}" target="_blank" rel="noopener">Réserver</a>
        </div>
      </article>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
}

// ---------------------------------------------------------------
// Wire up all WhatsApp links + phone displays
// ---------------------------------------------------------------
function wireContactLinks() {
  document.querySelectorAll(".js-whatsapp-link").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink());
  });
  document.querySelectorAll(".js-phone-display").forEach((el) => {
    el.textContent = CONTACT.phoneDisplay;
  });
}

// ---------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------
function wireNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen
      ? '<svg width="24" height="24"><use href="#icon-close"></use></svg>'
      : '<svg width="24" height="24"><use href="#icon-menu"></use></svg>';
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<svg width="24" height="24"><use href="#icon-menu"></use></svg>';
    });
  });
}

// ---------------------------------------------------------------
// Booking form -> WhatsApp
// ---------------------------------------------------------------
function wireBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const car = form.car.value;
    const dates = form.dates.value.trim();
    const message = form.message.value.trim();

    let text = `Bonjour MONOUSCAR, je m'appelle ${name || "—"}.`;
    text += car ? ` Je suis intéressé(e) par : ${car}.` : " Je souhaite réserver une voiture.";
    if (dates) text += ` Dates souhaitées : ${dates}.`;
    if (message) text += ` Message : ${message}`;

    window.open(buildWhatsAppLink(text), "_blank", "noopener");
  });
}

// ---------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------
function wireScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .car-card, .price-card, .step-card");
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------
function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderFleet();
  wireContactLinks();
  wireNavToggle();
  wireBookingForm();
  wireScrollReveal();
  setFooterYear();
});
