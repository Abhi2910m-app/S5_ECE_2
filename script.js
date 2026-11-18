/**
 * North India: Desert to Snow — Voyage Adventures
 * Vanilla JavaScript Implementation
 * Features:
 *  - Destination Slider with Ken Burns effect, rotating thumbnails, progress bar timer, swipe & keyboard controls
 *  - Dynamic Day-by-Day Accordion Rendering from structured data
 *  - "Open all days" / "Close all days" bulk toggle
 *  - Safe fallback gradients and accessibility enhancements
 */

// =============================================================================
// 1. DESTINATION SLIDES DATA (Top of file for easy editing)
// =============================================================================
const slides = [
  {
    name: "Ahmedabad",
    tag: "Gujarat · Day 2",
    desc: "Shafts of quiet golden light piercing five subterranean tiers of carved stone, where ancient stillness lingers in cool depths and the river ripples under an amber dusk.",
    bgImage: "images/hero-ahmedabad.jpg",
    thumbImage: "images/adalaj-stepwell.jpg",
    fallbackGradient: "linear-gradient(135deg, #1b263b, #0d1b2a)"
  },
  {
    name: "Jaisalmer",
    tag: "Rajasthan · Days 3–4",
    desc: "Endless golden dunes undulating beneath a fiery sunset, where a living fortress glows like molten bronze against the sky before yielding to a starlit desert wilderness.",
    bgImage: "images/hero-jaisalmer.jpg",
    thumbImage: "images/jaisalmer-fort.jpg",
    fallbackGradient: "linear-gradient(135deg, #463f3a, #1a1a1a)"
  },
  {
    name: "Delhi",
    tag: "Delhi · Days 5 and 10",
    desc: "Colossal red sandstone ramparts and soaring marble domes framed by ancient neem trees, where centuries of royal memory awaken beneath warm lantern-lit night skies.",
    bgImage: "images/hero-delhi.jpg",
    thumbImage: "images/delhi.jpg",
    fallbackGradient: "linear-gradient(135deg, #582f0e, #1a0f05)"
  },
  {
    name: "Manali",
    tag: "Himachal · Day 6",
    desc: "Towering cedar pines shrouded in ethereal mountain mist, whispering winds through tiered wooden pagodas, and jagged ridgelines dusted with crisp alpine snow.",
    bgImage: "images/hero-manali.jpg",
    thumbImage: "images/manali-hadimba-temple.jpg",
    fallbackGradient: "linear-gradient(135deg, #1d2d44, #0b131f)"
  },
  {
    name: "Kasol & Grahan",
    tag: "Himachal · Days 7–9",
    desc: "Colossal snow-capped peaks scraping dramatic clouds above emerald valleys, roaring turquoise glacial waters, and secluded timber cabins resting in mountain solitude.",
    bgImage: "images/hero-kasol-grahan.jpg",
    thumbImage: "images/kasol-grahan.jpg",
    fallbackGradient: "linear-gradient(135deg, #283618, #0e1608)"
  },
  {
    name: "Agra",
    tag: "Uttar Pradesh · Day 11",
    desc: "Pristine white marble aglow in the soft warmth of golden hour, reflecting pastel apricot skies across quiet river horizons like an immortal poem carved in stone.",
    bgImage: "images/hero-agra.jpg",
    thumbImage: "images/agra-taj-mahal.jpg",
    fallbackGradient: "linear-gradient(135deg, #3d5a80, #182738)"
  }
];

// =============================================================================
// 2. DAY BY DAY ITINERARY DATA
// =============================================================================
const daysData = [
  {
    dayLabel: "Day 1",
    title: "Kozhikode to Ahmedabad",
    tag: "On the rails",
    meta: "Train: TVCN–SGNR Express 16312, Kozhikode 00:15 (Day 1) to Ahmedabad Jn 06:40 (Day 2), night on board",
    bullets: [
      "Report at Kozhikode in good time; tickets are booked and confirmed for the whole group.",
      "A full day on board up the Konkan coast; keep belongings secure."
    ],
    tip: "Pack for the berth, not the suitcase: keep a small bag with toiletries, a blanket or shawl, snacks and regular medication; the rest goes under the berth.",
    meals: { breakfast: false, lunch: false, dinner: false }
  },
  {
    dayLabel: "Day 2",
    title: "Ahmedabad",
    tag: "Gujarat",
    meta: "Train: SBIB–JSM Express 20492, Sabarmati 22:05 to Jaisalmer 11:50 (Day 3), night on board",
    bullets: [
      "Arrive at Ahmedabad Jn at 06:40 and check in to the hotel to freshen up.",
      "Morning: industrial visit.",
      "Sabarmati Ashram, the Gandhis’ home from 1917 to 1930.",
      "Adalaj Stepwell, five storeys cut into the earth in 1499 by Queen Rudabai, 18 km from the city.",
      "Sabarmati Riverfront promenades and gardens, then board the train at 22:05."
    ],
    tip: "Today is a full day between two trains; keep what you need for the day and the next night in one small bag.",
    meals: { breakfast: true, lunch: false, dinner: true }
  },
  {
    dayLabel: "Day 3",
    title: "Jaisalmer, into the dunes",
    tag: "Rajasthan",
    meta: "Stay 1: luxury desert camp on the dunes, arrive by 12:00",
    bullets: [
      "Transfer to the camp, check in and enjoy the pool party.",
      "Camel safari across the golden dunes.",
      "Jeep safari at sunset and sunset over the Thar at Sam Sand Dunes.",
      "Evening: Rajasthani folk music and dance, campfire, gala dinner and an Arabian night."
    ],
    tip: "A cap or scarf, sunglasses and closed shoes help; the desert cools fast, so keep a layer for the campfire.",
    meals: { breakfast: false, lunch: true, dinner: true }
  },
  {
    dayLabel: "Day 4",
    title: "Jaisalmer, the Golden City",
    tag: "Rajasthan",
    meta: "Train: Runicha Express 14088, Jaisalmer 19:00 to Delhi Cantt 09:34 (Day 5), night on board",
    bullets: [
      "Check out of the camp after breakfast.",
      "Kuldhara, the abandoned village on the edge of the desert.",
      "Jaisalmer Fort, a living fort, then Gadisar Lake, a 14th-century reservoir.",
      "Free time in the Golden City, then the 19:00 train."
    ],
    tip: "Homes, shops and temples are still in use inside the fort; keep to the lanes and keep the group together.",
    meals: { breakfast: true, lunch: false, dinner: true }
  },
  {
    dayLabel: "Day 5",
    title: "Delhi, then the road north",
    tag: "Delhi",
    meta: "Road: Delhi to Manali by bus, about 500 km, about 12 hours, overnight",
    bullets: [
      "Arrive at Delhi Cantt at 09:34; freshen up at the hotel, then check out.",
      "Red Fort, India Gate and Jama Masjid.",
      "Evening bus to Manali, with dinner at Murthal, famous for its highway dhabas."
    ],
    tip: "The longest day of the trip; nap when you can and keep water and snacks within reach.",
    meals: { breakfast: false, lunch: true, dinner: true }
  },
  {
    dayLabel: "Day 6",
    title: "Manali",
    tag: "Himachal",
    meta: "Stay 2: hotel in Manali; Kullu to Manali 40 km, 1.5 hrs",
    bullets: [
      "Arrive in Kullu by morning and have breakfast.",
      "Optional paragliding and river rafting at your own expense, weather permitting.",
      "Drive to Manali and check in to the hotel.",
      "After lunch: Hadimba Temple, a wooden pagoda in a cedar grove, and the Tibetan Monastery.",
      "Shopping on Mall Road, then dinner at the hotel."
    ],
    tip: "Paragliding and rafting are paid on the spot and only run when the weather allows.",
    meals: { breakfast: true, lunch: true, dinner: true }
  },
  {
    dayLabel: "Day 7",
    title: "Manali to Kasol",
    tag: "Himachal",
    meta: "Stay 3: riverside camp, Kasol; Manali to Kasol 75 km, 2.5 hrs",
    bullets: [
      "Check out after breakfast.",
      "Through the Atal Tunnel to Sissu or Koksar in the Lahaul valley (about 3,100 m), depending on weather.",
      "Solang Valley for views and adventure activities; optional Jogini Waterfall trek.",
      "Back through Manali to Kasol and the camp by the Parvati River.",
      "Evening campfire with a barbecue by the river."
    ],
    tip: "Bad weather can close the Atal Tunnel at short notice; if so, alternative routes or activities are planned the same day.",
    meals: { breakfast: true, lunch: false, dinner: true }
  },
  {
    dayLabel: "Day 8",
    title: "Grahan",
    tag: "Himachal",
    meta: "Stay 4: village homestay; Kasol to Grahan, 7 km off-road plus a 500 m walk",
    bullets: [
      "Check out after breakfast; big bags stay in the luggage room at Kasol.",
      "Off-road vehicle provided both ways, then a 500 m walk to the village (about 2,300 m).",
      "Check in, lunch and rest.",
      "Trek to Silukutty Waterfall, then visit Pulgi village.",
      "Evening bonfire in the village."
    ],
    tip: "Only a day bag goes up; take a warm layer and shoes with good grip.",
    meals: { breakfast: true, lunch: true, dinner: true }
  },
  {
    dayLabel: "Day 9",
    title: "Kasol",
    tag: "Himachal",
    meta: "Road: Kasol to Delhi by bus, about 550 km, 11–12 hrs, overnight",
    bullets: [
      "Return to Kasol by off-road vehicle after breakfast.",
      "Walk through Kasol, the Hippie Market and Israeli food (not included).",
      "Manikaran Sahib Gurudwara and a bath in its natural hot springs.",
      "Short trek to Chalal, then a DJ session with the group.",
      "The bus leaves for Delhi after the DJ session."
    ],
    tip: "Pick up everything from the luggage room before the evening.",
    meals: { breakfast: true, lunch: false, dinner: true }
  },
  {
    dayLabel: "Day 10",
    title: "Delhi",
    tag: "Delhi",
    meta: "Stay 5: hotel in Delhi",
    bullets: [
      "Reach Delhi by morning; freshen up and have breakfast (rooms are limited at that hour).",
      "Qutub Minar and the Lotus Temple.",
      "Shopping at Sarojini Market.",
      "Jama Masjid and its food street: Aslam Chicken, Qureshi Kebab and Karim’s.",
      "Delhi by night, then the hotel."
    ],
    tip: "Go hungry and go as a group; agree a meeting time and place before splitting up.",
    meals: { breakfast: true, lunch: true, dinner: false }
  },
  {
    dayLabel: "Day 11",
    title: "Agra",
    tag: "Uttar Pradesh",
    meta: "Road: Delhi to Agra 250 km, 4–5 hrs; drop at Hazrat Nizamuddin station",
    bullets: [
      "Check out after breakfast and drive to Agra.",
      "Taj Mahal, built by Shah Jahan for Mumtaz Mahal, and Agra Fort.",
      "Shopping at the factory outlets (marble, leather, souvenirs; bargaining is expected).",
      "Drive back to Delhi and drop at the station for the early-morning train."
    ],
    tip: "The Taj is closed on Fridays; if Day 11 is a Friday the visit has to move. An electric vehicle covers the last stretch to the gate; keep tickets and ID handy.",
    meals: { breakfast: true, lunch: true, dinner: true }
  },
  {
    dayLabel: "Days 12–14",
    title: "Delhi to Kozhikode",
    tag: "On the rails",
    meta: "Train: Mangla Lakshadweep Express 12618, Hazrat Nizamuddin 05:35 (Day 12) to Kozhikode 03:32 (Day 14), two nights on board",
    bullets: [
      "Board at 05:35 on Day 12.",
      "Day 13 on board, south through the length of the country.",
      "Arrive at 03:32 on Day 14. The tour ends."
    ],
    tip: "Thank you for travelling with Voyage Adventures.",
    meals: { breakfast: false, lunch: false, dinner: false }
  }
];

// =============================================================================
// 3. DAY BY DAY ACCORDION RENDERER
// =============================================================================
function renderItinerary() {
  const container = document.getElementById("days-container");
  if (!container) return;

  const mealLabels = ["Breakfast", "Lunch", "Dinner"];

  const html = daysData.map((d) => {
    const bulletsHtml = d.bullets.map((b) => `<li>${b}</li>`).join("");

    const mealChipsHtml = [
      { name: "Breakfast", included: d.meals.breakfast },
      { name: "Lunch", included: d.meals.lunch },
      { name: "Dinner", included: d.meals.dinner }
    ].map(m => {
      const cls = m.included ? "meal-chip is-included" : "meal-chip";
      const txt = m.included ? m.name : `${m.name} not included`;
      return `<i class="${cls}">${txt}</i>`;
    }).join("");

    return `
      <details class="day-accordion">
        <summary>
          <span class="day-num">${d.dayLabel}</span>
          <span class="day-title">${d.title}</span>
          <span class="accordion-icon" aria-hidden="true">+</span>
          <span class="day-tag">${d.tag}</span>
        </summary>
        <div class="accordion-body">
          <ul class="day-bullets">
            ${bulletsHtml}
          </ul>
          <div class="info-box">${d.meta}</div>
          <p class="tip-box"><b>Good to know:</b> ${d.tip}</p>
          <div class="meal-chips" aria-label="Meals included">
            ${mealChipsHtml}
          </div>
        </div>
      </details>
    `;
  }).join("");

  container.innerHTML = html;

  // Set up Toggle All Days button
  const toggleBtn = document.getElementById("toggle-all-days");
  if (toggleBtn) {
    let allOpen = false;
    toggleBtn.addEventListener("click", () => {
      allOpen = !allOpen;
      const accordions = container.querySelectorAll("details.day-accordion");
      accordions.forEach((el) => {
        el.open = allOpen;
      });
      toggleBtn.textContent = allOpen ? "Close all days" : "Open all days";
    });
  }
}

// =============================================================================
// 4. HERO DESTINATION SLIDER
// =============================================================================
function initDestinationSlider() {
  const sliderEl = document.getElementById("hero-slider");
  if (!sliderEl) return;

  const bgsContainer = document.getElementById("slider-bgs");
  const copyContainer = document.getElementById("slider-copy");
  const tagEl = document.getElementById("slider-tag");
  const titleEl = document.getElementById("slider-title");
  const descEl = document.getElementById("slider-desc");
  const thumbsContainer = document.getElementById("slider-thumbs");
  const counterEl = document.getElementById("slider-counter");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const progressBar = document.getElementById("slider-progress-bar");

  let currentIndex = 0;
  const totalSlides = slides.length;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build background layers with image + fallback gradient
  slides.forEach((slide) => {
    const bgDiv = document.createElement("div");
    bgDiv.className = "slider-bg-layer";
    // Compound background: big format image loaded first, fallback gradient behind it
    bgDiv.style.backgroundImage = `url("${slide.bgImage || slide.image}"), ${slide.fallbackGradient}`;
    bgsContainer.appendChild(bgDiv);
  });

  const bgLayers = bgsContainer.children;

  function renderSlide(index, isFirstLoad = false) {
    currentIndex = (index + totalSlides) % totalSlides;

    // 1. Cross-fade background layers
    Array.from(bgLayers).forEach((layer, i) => {
      if (i === currentIndex) {
        layer.classList.add("is-active");
      } else {
        layer.classList.remove("is-active");
      }
    });

    // 2. Animate and update copy
    copyContainer.classList.remove("is-animating");
    if (!isFirstLoad && !prefersReducedMotion) {
      void copyContainer.offsetWidth; // Trigger reflow to restart CSS animation
      copyContainer.classList.add("is-animating");
    }

    const current = slides[currentIndex];
    tagEl.textContent = current.tag;
    titleEl.textContent = current.name;
    descEl.textContent = current.desc;

    // 3. Counter display (01 / 06)
    const formattedCur = String(currentIndex + 1).padStart(2, "0");
    const formattedTotal = String(totalSlides).padStart(2, "0");
    counterEl.textContent = `${formattedCur} / ${formattedTotal}`;

    // 4. Render rotated thumbnails of OTHER slides (next slide is always first)
    thumbsContainer.innerHTML = "";
    for (let offset = 1; offset < totalSlides; offset++) {
      const targetIndex = (currentIndex + offset) % totalSlides;
      const targetSlide = slides[targetIndex];

      const thumbBtn = document.createElement("button");
      thumbBtn.type = "button";
      thumbBtn.className = "slider-thumb-card";
      thumbBtn.style.backgroundImage = `url("${targetSlide.thumbImage || targetSlide.image}"), ${targetSlide.fallbackGradient}`;
      thumbBtn.setAttribute("aria-label", `Show destination: ${targetSlide.name}`);
      thumbBtn.innerHTML = `<span>${targetSlide.name}</span>`;

      thumbBtn.addEventListener("click", () => {
        goToSlide(targetIndex);
      });

      thumbsContainer.appendChild(thumbBtn);
    }
    thumbsContainer.scrollLeft = 0;

    // 5. Reset progress bar animation
    if (!prefersReducedMotion && progressBar) {
      progressBar.classList.remove("is-running");
      void progressBar.offsetWidth; // Reflow
      progressBar.classList.add("is-running");
    }
  }

  function goToSlide(targetIndex) {
    renderSlide(targetIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Event Listeners for Controls
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Auto-advance on progress bar completion
  if (progressBar) {
    progressBar.addEventListener("animationend", () => {
      if (!prefersReducedMotion) {
        nextSlide();
      }
    });
  }

  // Keyboard navigation (Left / Right arrow keys)
  sliderEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  });

  // Touch Swipe Gesture Support (50px threshold)
  let touchStartX = null;
  let touchStartY = null;

  sliderEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  sliderEl.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null || touchStartY === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant and above 50px threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide(); // Swiped left -> next
        } else {
          prevSlide(); // Swiped right -> prev
        }
      }

      touchStartX = null;
      touchStartY = null;
    },
    { passive: true }
  );

  // Initial render
  renderSlide(0, true);
}

// =============================================================================
// 5. MOBILE & STICKY NAVIGATION MENU TOGGLE
// =============================================================================
function initNavigationMenu() {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const drawer = document.getElementById("mobile-nav-drawer");
  const closeBtn = document.getElementById("mobile-nav-close");
  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // Close when clicking outside panel
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) {
      closeMenu();
    }
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Close automatically when any drawer nav link is clicked
  const drawerLinks = drawer.querySelectorAll("a");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// =============================================================================
// 6. DARK & LIGHT THEME TOGGLER
// =============================================================================
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  if (!toggleBtns.length) return;

  const sunSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem("voyage_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let activeTheme = savedTheme ? savedTheme : (systemPrefersDark ? "dark" : "light");

  function applyTheme(theme) {
    activeTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("voyage_theme", theme);

    toggleBtns.forEach((btn) => {
      const isDark = theme === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");

      const icon = btn.querySelector(".theme-icon");
      if (icon) {
        icon.innerHTML = isDark ? sunSvg : moonSvg;
      }

      const label = btn.querySelector(".theme-label");
      if (label) {
        label.textContent = isDark ? "Light" : "Dark";
      }
    });
  }

  // Set initial theme
  applyTheme(activeTheme);

  // Bind click handlers to all toggle buttons (desktop + drawer)
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });

  // Listen for OS system theme changes if user hasn't explicitly saved a choice
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("voyage_theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

// =============================================================================
// 7. DOM CONTENT LOADED ENTRY POINT
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderItinerary();
  initDestinationSlider();
  initNavigationMenu();
  initThemeToggle();
});
