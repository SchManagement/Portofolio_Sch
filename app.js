const PROFILE = {
  name: "M.Hilman Alfiqri",
  role: "Web Application Developer & Digital Solution Builder",
  whatsapp: "6287872412014",
  whatsappDisplay: "+62 878-7241-2014",
  email: "hilmanalfiqri01@gmail.com"
};

const WHATSAPP_MESSAGE =
  "Halo M.Hilman Alfiqri, saya melihat portfolio Anda dan ingin berdiskusi mengenai pembuatan website atau sistem digital untuk bisnis saya.";

document.addEventListener("DOMContentLoaded", init);

function init() {
  injectHeroAccent();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActiveNavigation();
  initHeroAnimation();
  initCursorGlow();
  initCardSpotlights();
  initTimeline();
  initContactLinks();
  initCurrentYear();
}

function injectHeroAccent() {
  const title = document.querySelector(".hero-title");
  if (!title) return;
  const phrase = "Sistem Digital";
  title.innerHTML = title.textContent.replace(
    phrase,
    `<span class="accent">${phrase}</span>`
  );
}

function initNavbar() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    toggle.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Tutup menu");
    menu.hidden = false;
    document.body.classList.add("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMenu();
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("show"));
    return;
  }

  document.querySelectorAll(".stagger-group").forEach((group) => {
    group.querySelectorAll(".reveal").forEach((card, index) => {
      card.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -4% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initActiveNavigation() {
  const sections = document.querySelectorAll(
    "#home, #about, #expertise, #projects, #services, #process, #contact"
  );
  const links = document.querySelectorAll(".nav-link");

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${visible.target.id}`
        );
      });
    },
    { threshold: [0.25, 0.45, 0.65], rootMargin: "-18% 0px -52% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initHeroAnimation() {
  requestAnimationFrame(() => {
    document.body.classList.add("hero-ready");
  });
}

function initCursorGlow() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".section-glow").forEach((section) => {
    const glow = section.querySelector(".cursor-glow");
    if (!glow) return;

    let rafId = null;
    let latestEvent = null;

    section.addEventListener("pointerenter", () => section.classList.add("glow-active"));
    section.addEventListener("pointerleave", () => section.classList.remove("glow-active"));
    section.addEventListener(
      "pointermove",
      (event) => {
        latestEvent = event;
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          glow.style.left = `${latestEvent.clientX - rect.left}px`;
          glow.style.top = `${latestEvent.clientY - rect.top}px`;
          rafId = null;
        });
      },
      { passive: true }
    );
  });
}

function initCardSpotlights() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      },
      { passive: true }
    );
  });
}

function initTimeline() {
  const timeline = document.getElementById("process-timeline");
  if (!timeline) return;

  const steps = [...timeline.querySelectorAll(".process-step")];

  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportPoint = window.innerHeight * 0.62;
    const progress = Math.max(
      0,
      Math.min(1, (viewportPoint - rect.top) / Math.max(rect.height, 1))
    );

    timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);

    steps.forEach((step) => {
      const stepRect = step.getBoundingClientRect();
      step.classList.toggle("active", stepRect.top < viewportPoint);
    });
  };

  updateTimeline();
  window.addEventListener("scroll", updateTimeline, { passive: true });
  window.addEventListener("resize", updateTimeline);
}

function initContactLinks() {
  const whatsappURL =
    `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const emailURL = `mailto:${PROFILE.email}`;

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.setAttribute("href", whatsappURL);
  });

  document.querySelectorAll(".js-whatsapp-display").forEach((element) => {
    element.textContent = PROFILE.whatsappDisplay;
  });

  document.querySelectorAll(".js-email-link, .js-email-text").forEach((link) => {
    link.setAttribute("href", emailURL);
    if (link.classList.contains("js-email-text")) {
      link.textContent = PROFILE.email;
    }
  });
}

function initCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}
