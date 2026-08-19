document.documentElement.classList.add("js");

// -----------------------------------------------------
// Profile & contact configuration
// Isi nilai di bawah ini saat data kontak sudah siap.
// -----------------------------------------------------
const PROFILE = {
  name: "Muhammad Hilman Alfiqri",
  role: "Web Application Developer & Digital Solution Builder",
  whatsapp: "",
  email: "",
  github: ""
};

const WHATSAPP_MESSAGE =
  "Halo Hilman, saya melihat portfolio Anda dan ingin berdiskusi mengenai pembuatan website atau sistem digital untuk bisnis saya.";

const projects = [
  {
    title: "Business Dashboard",
    category: "Development Concept",
    description:
      "Dashboard modern untuk monitoring operasional, data, dan aktivitas bisnis.",
    technologies: ["Dashboard", "Responsive UI", "Data Visualization"]
  },
  {
    title: "Invoice & Administration System",
    category: "System Module",
    description:
      "Sistem administrasi digital untuk pengelolaan transaksi dan dokumen bisnis.",
    technologies: ["Workflow", "Database", "Invoice"]
  },
  {
    title: "Mobile Business Application",
    category: "Mobile Integration",
    description:
      "Aplikasi mobile untuk membantu aktivitas pekerja lapangan dan operasional.",
    technologies: ["PWA", "Capacitor", "Mobile Workflow"]
  }
];

function init() {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActiveNavigation();
  initHeroAnimation();
  initCursorGlow();
  initCardSpotlights();
  initTimeline();
  initProjectInteractions();
  initProjectCards();
  initContactLinks();
  initCurrentYear();
  initScrollTop();
  document.body.classList.add("loaded");
}

document.addEventListener("DOMContentLoaded", init);

// Navbar scroll state
function initNavbar() {
  const header = document.querySelector("#site-header");
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
    ticking = false;
  };

  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

// Mobile menu
function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu navigasi");
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Tutup menu navigasi");
    menu.classList.add("active");
    document.body.classList.add("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMenu();
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );
  if (!elements.length) return;

  const groups = document.querySelectorAll(".stagger-group");
  groups.forEach((group) => {
    const children = group.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    children.forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 80, 560)}ms`;
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

// Active navigation
function initActiveNavigation() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => linkMap.set(link.dataset.section, link));

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) return;
      const currentId = visibleEntries[0].target.id;

      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = linkMap.get(currentId);
      if (activeLink) activeLink.classList.add("active");
    },
    { threshold: [0.16, 0.35, 0.55], rootMargin: "-18% 0px -52% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// Hero entrance sequence
function initHeroAnimation() {
  const steps = [...document.querySelectorAll(".hero-step")];
  if (!steps.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    steps.forEach((step) => step.classList.add("is-ready"));
    return;
  }

  steps
    .sort((a, b) => Number(a.dataset.heroStep) - Number(b.dataset.heroStep))
    .forEach((step, index) => {
      window.setTimeout(() => step.classList.add("is-ready"), 80 + index * 110);
    });
}

// Cursor glow for selected sections
function initCursorGlow() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer || reducedMotion) return;

  document.body.classList.add("pointer-enabled");

  document.querySelectorAll(".spotlight-zone").forEach((zone) => {
    zone.addEventListener("pointermove", (event) => {
      const rect = zone.getBoundingClientRect();
      zone.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      zone.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    });
  });
}

// Card spotlight
function initCardSpotlights() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) return;

  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });
  });
}

// Timeline progress & active steps
function initTimeline() {
  const timeline = document.querySelector("#process-timeline");
  const progress = document.querySelector("#timeline-progress");
  const steps = [...document.querySelectorAll(".timeline-step")];
  if (!timeline || !progress || !steps.length) return;

  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportTrigger = window.innerHeight * 0.58;
    const total = rect.height;
    const passed = Math.min(Math.max(viewportTrigger - rect.top, 0), total);
    const percent = total > 0 ? (passed / total) * 100 : 0;
    progress.style.height = `${percent}%`;

    steps.forEach((step) => {
      const stepRect = step.getBoundingClientRect();
      step.classList.toggle("is-active", stepRect.top < viewportTrigger);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateTimeline();
        ticking = false;
      });
    }
  };

  updateTimeline();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

// Desktop-only subtle parallax for the featured project
function initProjectInteractions() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showcase = document.querySelector(".project-showcase");
  const items = document.querySelectorAll(".parallax-item");
  if (!finePointer || reducedMotion || !showcase || !items.length) return;

  showcase.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 993) return;
    const rect = showcase.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    items.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.01);
      item.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
    });
  });

  showcase.addEventListener("pointerleave", () => {
    items.forEach((item) => {
      item.style.transition = "transform 350ms ease";
      item.style.transform = "translate3d(0,0,0)";
      window.setTimeout(() => {
        item.style.transition = "";
      }, 360);
    });
  });
}

// Reusable project cards from JavaScript data
function initProjectCards() {
  const container = document.querySelector("#project-list");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "other-project-card reveal show";
    article.style.transitionDelay = `${index * 80}ms`;

    const techMarkup = project.technologies
      .map((technology) => `<span>${escapeHtml(technology)}</span>`)
      .join("");

    article.innerHTML = `
      <span class="project-status">${escapeHtml(project.category)}</span>
      <h4>${escapeHtml(project.title)}</h4>
      <p>${escapeHtml(project.description)}</p>
      <div class="other-project-tech">${techMarkup}</div>
    `;
    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Contact links generated from PROFILE configuration
function initContactLinks() {
  const contactList = document.querySelector("#contact-list");
  const emptyState = document.querySelector("#contact-empty");
  const ctas = document.querySelectorAll(".js-contact-cta");
  if (!contactList) return;

  const normalizedWhatsApp = String(PROFILE.whatsapp || "").replace(/\D/g, "");
  const contacts = {
    whatsapp: normalizedWhatsApp
      ? `https://wa.me/${normalizedWhatsApp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
      : "",
    email: PROFILE.email ? `mailto:${PROFILE.email}` : "",
    github: normalizeExternalUrl(PROFILE.github)
  };

  let visibleCount = 0;
  Object.entries(contacts).forEach(([type, href]) => {
    const element = contactList.querySelector(`[data-contact="${type}"]`);
    if (!element || !href) return;

    element.href = href;
    element.hidden = false;
    visibleCount += 1;

    if (type === "whatsapp" || type === "github") {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });

  if (emptyState) emptyState.hidden = visibleCount > 0;

  ctas.forEach((cta) => {
    if (contacts.whatsapp) {
      cta.href = contacts.whatsapp;
      cta.target = "_blank";
      cta.rel = "noopener noreferrer";
      cta.setAttribute("aria-label", "Diskusikan project melalui WhatsApp");
    } else {
      cta.href = "#contact";
      cta.removeAttribute("target");
      cta.removeAttribute("rel");
    }
  });
}

function normalizeExternalUrl(value) {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function initCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

function initScrollTop() {
  const button = document.querySelector("#scroll-top");
  if (!button) return;

  let ticking = false;
  const update = () => {
    button.classList.toggle("show", window.scrollY > 640);
    ticking = false;
  };

  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });
}
