const PROFILE = {
  whatsapp: "6287872412014",
  whatsappDisplay: "+62 878-7241-2014",
  email: "hilmanalfiqri01@gmail.com"
};

const WHATSAPP_MESSAGE =
  "Halo M.Hilman Alfiqri, saya melihat portfolio Anda dan ingin berdiskusi mengenai pembuatan website atau sistem digital untuk bisnis saya.";

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindContactLinks();
  initNavbar();
  initMobileMenu();
  initHero();
  initScrollProgress();
  initMaskedHeadings();
  initScrollReveals();
  initStoryProgress();
  initTimeline();
  initPointerSpotlights();
  initDepthEffects();
  initMagneticButtons();
  initMicroTilt();
  initCurrentYear();
}

function bindContactLinks() {
  const wa = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.href = wa;
  });
}

function initNavbar() {
  const header = document.getElementById("site-header");
  const links = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("#home,#about,#expertise,#projects,#services,#process,#contact")];

  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 26);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { threshold: [0.2,0.45,0.7], rootMargin: "-22% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const icon = toggle?.querySelector("img");
  if (!toggle || !menu || !icon) return;

  const close = () => {
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","Buka menu");
    icon.src = "assets/icons/menu.svg";
  };

  const open = () => {
    menu.hidden = false;
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded","true");
    toggle.setAttribute("aria-label","Tutup menu");
    icon.src = "assets/icons/close.svg";
  };

  toggle.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? close() : open();
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 992) close(); });
}

function initHero() {
  requestAnimationFrame(() => document.body.classList.add("hero-ready"));
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress-bar");
  let raf = null;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    document.body.classList.toggle("has-scrolled", window.scrollY > 8);
    raf = null;
  };
  window.addEventListener("scroll", () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function initMaskedHeadings() {
  const headings = document.querySelectorAll(".masked-heading");
  if (!("IntersectionObserver" in window)) {
    headings.forEach((h) => h.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .32 });
  headings.forEach((heading) => observer.observe(heading));
}

function initScrollReveals() {
  const nodes = document.querySelectorAll(".reveal-standard,.reveal-card,.reveal-perspective,.image-mask-reveal");
  document.querySelectorAll(".stagger-group").forEach((group) => {
    group.querySelectorAll(".reveal-card").forEach((card,index) => {
      card.style.transitionDelay = `${Math.min(index * 75, 420)}ms`;
    });
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: "0px 0px -5% 0px" });

  nodes.forEach((node) => observer.observe(node));
}

function initStoryProgress() {
  const steps = [...document.querySelectorAll("[data-story-step]")];
  if (!steps.length) return;

  const update = () => {
    const point = window.innerHeight * .62;
    steps.forEach((step) => {
      step.classList.toggle("active", step.getBoundingClientRect().top < point);
    });
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initTimeline() {
  const timeline = document.getElementById("process-timeline");
  const progress = document.getElementById("timeline-progress");
  const steps = [...document.querySelectorAll(".process-step")];
  if (!timeline || !progress) return;

  let raf = null;
  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const point = window.innerHeight * .62;
    const ratio = Math.max(0, Math.min(1, (point - rect.top) / Math.max(rect.height,1)));
    progress.style.height = `${ratio * 100}%`;
    steps.forEach((step) => step.classList.toggle("active", step.getBoundingClientRect().top < point));
    raf = null;
  };
  window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive:true });
  window.addEventListener("resize", update);
  update();
}

function initPointerSpotlights() {
  if (!window.matchMedia("(pointer:fine)").matches) return;
  document.querySelectorAll("[data-spotlight]").forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      surface.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    }, { passive:true });
  });
}

function initDepthEffects() {
  if (!window.matchMedia("(pointer:fine)").matches || window.innerWidth < 992) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

  document.querySelectorAll("[data-depth-root]").forEach((root) => {
    const layers = [...root.querySelectorAll("[data-depth]")];
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, raf = null;

    const render = () => {
      currentX += (targetX - currentX) * .11;
      currentY += (targetY - currentY) * .11;
      layers.forEach((layer) => {
        const amount = Number(layer.dataset.depth || .5);
        layer.style.translate = `${currentX * amount}px ${currentY * amount}px`;
      });
      if (Math.abs(targetX-currentX) > .02 || Math.abs(targetY-currentY) > .02) {
        raf = requestAnimationFrame(render);
      } else {
        raf = null;
      }
    };

    root.addEventListener("pointermove", (event) => {
      const rect = root.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - .5;
      const ny = (event.clientY - rect.top) / rect.height - .5;
      targetX = nx * 7;
      targetY = ny * 6;
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive:true });

    root.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(render);
    });
  });
}

function initMagneticButtons() {
  if (!window.matchMedia("(pointer:fine)").matches || window.innerWidth < 992) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

  document.querySelectorAll(".magnetic").forEach((button) => {
    let x = 0, y = 0, tx = 0, ty = 0, raf = null;
    const render = () => {
      x += (tx-x) * .18;
      y += (ty-y) * .18;
      button.style.translate = `${x}px ${y}px`;
      if (Math.abs(tx-x) > .03 || Math.abs(ty-y) > .03) raf = requestAnimationFrame(render);
      else raf = null;
    };
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width - .5) * 6;
      ty = ((event.clientY - rect.top) / rect.height - .5) * 5;
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive:true });
    button.addEventListener("pointerleave", () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(render);
    });
  });
}

function initMicroTilt() {
  if (!window.matchMedia("(pointer:fine)").matches || window.innerWidth < 992) return;
  if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(1000px) rotateX(${(-y*1.1).toFixed(2)}deg) rotateY(${(x*1.1).toFixed(2)}deg)`;
    }, { passive:true });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initCurrentYear() {
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
}
