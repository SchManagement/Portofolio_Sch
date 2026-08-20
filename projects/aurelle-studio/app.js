const STORE_KEY_CART = "aurelle-cart";
const STORE_KEY_WISHLIST = "aurelle-wishlist";
const STORE_KEY_ACCOUNT = "aurelle-account";
const STORE_KEY_ORDERS = "aurelle-orders";

const CATEGORY_GROUPS = {
  "Dress Collection": ["Dress"],
  "Tops Collection": ["Blouse", "Shirt", "Basic Wear"],
  "Bottom Collection": ["Pants", "Skirt"],
  "Outer Collection": ["Outerwear"],
  "Complete Outfit": ["Set Outfit"]
};

const products = [
  {
    id: "celeste-satin-dress",
    name: "Celeste Satin Dress",
    category: "Dress",
    subcategory: "Satin Dress",
    collection: "Dress Collection",
    price: 399000,
    priceLabel: "Rp399.000",
    description: "Dress satin premium dengan potongan elegan untuk acara formal maupun semi formal.",
    rating: 4.9,
    sizes: ["S", "M", "L"],
    colors: [{ name: "Champagne", hex: "#E9D7C4" }, { name: "Ivory", hex: "#F8F0E6" }],
    image: "assets/images/products/celeste-satin-dress.webp",
    gallery: [
      "assets/images/products/celeste-satin-dress.webp",
      "assets/images/products/celeste-satin-dress-detail.webp",
      "assets/images/products/celeste-satin-dress-detail-2.webp"
    ],
    badges: ["NEW", "SALE"],
    discount: "15%",
    popular: 98,
    latestRank: 1,
    isBestSeller: true
  },
  {
    id: "aurelle-linen-blouse",
    name: "Aurelle Linen Blouse",
    category: "Blouse",
    subcategory: "Blouse",
    collection: "Tops Collection",
    price: 289000,
    priceLabel: "Rp289.000",
    description: "Blouse linen ringan dengan desain minimalis dan nyaman digunakan.",
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Beige", hex: "#D9C1A4" }, { name: "Cream", hex: "#F4E6D0" }],
    image: "assets/images/products/aurelle-linen-blouse.webp",
    gallery: [
      "assets/images/products/aurelle-linen-blouse.webp",
      "assets/images/products/aurelle-linen-blouse-detail.webp",
      "assets/images/products/aurelle-linen-blouse-detail-2.webp"
    ],
    badges: ["NEW"],
    discount: "10%",
    popular: 94,
    latestRank: 2,
    isBestSeller: true
  },
  {
    id: "elora-knit-cardigan",
    name: "Elora Knit Cardigan",
    category: "Outerwear",
    subcategory: "Cardigan",
    collection: "Outer Collection",
    price: 349000,
    priceLabel: "Rp349.000",
    description: "Cardigan premium dengan tekstur lembut untuk tampilan effortless.",
    rating: 4.8,
    sizes: ["M", "L"],
    colors: [{ name: "Ivory", hex: "#F6EFE0" }, { name: "Cream", hex: "#EFE2C9" }],
    image: "assets/images/products/elora-knit-cardigan.webp",
    gallery: [
      "assets/images/products/elora-knit-cardigan.webp",
      "assets/images/products/elora-knit-cardigan-detail.webp",
      "assets/images/products/elora-knit-cardigan-detail-2.webp"
    ],
    badges: ["BEST SELLER"],
    discount: "12%",
    popular: 96,
    latestRank: 5,
    isBestSeller: true
  },
  {
    id: "amara-pleated-skirt",
    name: "Amara Pleated Skirt",
    category: "Skirt",
    subcategory: "Pleated Skirt",
    collection: "Bottom Collection",
    price: 319000,
    priceLabel: "Rp319.000",
    description: "Rok plisket modern dengan siluet elegan.",
    rating: 4.7,
    sizes: ["S", "M", "L"],
    colors: [{ name: "Soft Rose", hex: "#D8AF9E" }, { name: "Beige", hex: "#D9C6B5" }],
    image: "assets/images/products/amara-pleated-skirt.webp",
    gallery: [
      "assets/images/products/amara-pleated-skirt.webp",
      "assets/images/products/amara-pleated-skirt-detail.webp",
      "assets/images/products/amara-pleated-skirt-detail-2.webp"
    ],
    badges: ["NEW", "SALE"],
    discount: "10%",
    popular: 90,
    latestRank: 3,
    isBestSeller: false
  },
  {
    id: "luna-oversized-shirt",
    name: "Luna Oversized Shirt",
    category: "Shirt",
    subcategory: "Oversized Shirt",
    collection: "Tops Collection",
    price: 279000,
    priceLabel: "Rp279.000",
    description: "Kemeja oversized dengan gaya casual premium.",
    rating: 4.7,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Cream", hex: "#F8F0E6" }, { name: "Ivory", hex: "#F6F2EA" }],
    image: "assets/images/products/luna-oversized-shirt.webp",
    gallery: [
      "assets/images/products/luna-oversized-shirt.webp",
      "assets/images/products/luna-oversized-shirt-detail.webp",
      "assets/images/products/luna-oversized-shirt-detail-2.webp"
    ],
    badges: ["NEW"],
    discount: "8%",
    popular: 88,
    latestRank: 4,
    isBestSeller: false
  },
  {
    id: "aruna-wide-leg-pants",
    name: "Aruna Wide Leg Pants",
    category: "Pants",
    subcategory: "Wide Leg Pants",
    collection: "Bottom Collection",
    price: 329000,
    priceLabel: "Rp329.000",
    description: "Celana wide leg dengan desain modern dan nyaman.",
    rating: 4.8,
    sizes: ["S", "M", "L"],
    colors: [{ name: "Beige", hex: "#D9C2A8" }, { name: "Cream", hex: "#F3E8DA" }],
    image: "assets/images/products/aruna-wide-leg-pants.webp",
    gallery: [
      "assets/images/products/aruna-wide-leg-pants.webp",
      "assets/images/products/aruna-wide-leg-pants-detail.webp",
      "assets/images/products/aruna-wide-leg-pants-detail-2.webp"
    ],
    badges: ["BEST SELLER"],
    discount: "10%",
    popular: 95,
    latestRank: 7,
    isBestSeller: true
  },
  {
    id: "nara-premium-set",
    name: "Nara Premium Set",
    category: "Set Outfit",
    subcategory: "Matching Set",
    collection: "Complete Outfit",
    price: 499000,
    priceLabel: "Rp499.000",
    description: "Set outfit lengkap untuk tampilan stylish.",
    rating: 5.0,
    sizes: ["S", "M", "L"],
    colors: [{ name: "Beige", hex: "#CCB092" }, { name: "Ivory", hex: "#F7EBD9" }],
    image: "assets/images/products/nara-premium-set.webp",
    gallery: [
      "assets/images/products/nara-premium-set.webp",
      "assets/images/products/nara-premium-set-detail.webp",
      "assets/images/products/nara-premium-set-detail-2.webp"
    ],
    badges: ["NEW", "BEST SELLER"],
    discount: "15%",
    popular: 99,
    latestRank: 6,
    isBestSeller: true
  },
  {
    id: "sofia-basic-top",
    name: "Sofia Basic Top",
    category: "Basic Wear",
    subcategory: "Basic Top",
    collection: "Tops Collection",
    price: 219000,
    priceLabel: "Rp219.000",
    description: "Basic top berkualitas untuk penggunaan harian.",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Ivory", hex: "#F7F2E8" }, { name: "Cream", hex: "#EFE2CE" }],
    image: "assets/images/products/sofia-basic-top.webp",
    gallery: [
      "assets/images/products/sofia-basic-top.webp",
      "assets/images/products/sofia-basic-top-detail.webp",
      "assets/images/products/sofia-basic-top-detail-2.webp"
    ],
    badges: ["SALE"],
    discount: "10%",
    popular: 85,
    latestRank: 8,
    isBestSeller: false
  }
];

const categoryCards = [
  {
    title: "Dress Collection",
    image: "assets/images/products/celeste-satin-dress.webp",
    description: "Koleksi dress feminin untuk momen formal, semi formal, maupun tampilan casual yang elegan.",
    subcategories: ["Satin Dress", "Midi Dress", "Casual Dress"],
    filterValue: "Dress Collection",
    button: "Explore Dress"
  },
  {
    title: "Tops Collection",
    image: "assets/images/products/aurelle-linen-blouse.webp",
    description: "Atasan premium yang mudah dipadukan untuk tampilan kerja, santai, maupun layering.",
    subcategories: ["Blouse", "Shirt", "Basic Top"],
    filterValue: "Tops Collection",
    button: "Explore Tops"
  },
  {
    title: "Bottom Collection",
    image: "assets/images/products/aruna-wide-leg-pants.webp",
    description: "Potongan bawah modern dengan siluet bersih, nyaman, dan mudah dipadukan.",
    subcategories: ["Pants", "Skirt"],
    filterValue: "Bottom Collection",
    button: "Explore Bottom"
  },
  {
    title: "Outer Collection",
    image: "assets/images/products/elora-knit-cardigan.webp",
    description: "Layering piece untuk menambah tekstur dan karakter pada tampilan sehari-hari.",
    subcategories: ["Cardigan", "Jacket", "Outerwear"],
    filterValue: "Outer Collection",
    button: "Explore Outer"
  },
  {
    title: "Complete Outfit",
    image: "assets/images/products/nara-premium-set.webp",
    description: "Pilihan outfit lengkap yang siap dipakai untuk tampilan yang langsung terlihat rapi.",
    subcategories: ["Matching Set", "Casual Set"],
    filterValue: "Complete Outfit",
    button: "Explore Sets"
  }
];

let state = {
  cart: loadStorage(STORE_KEY_CART, []),
  wishlist: loadStorage(STORE_KEY_WISHLIST, []),
  account: loadStorage(STORE_KEY_ACCOUNT, null),
  filters: { category: "all", price: "all", size: "all", color: "all", sort: "latest" },
  filteredProducts: [...products]
};

let checkoutState = {
  step: 1,
  shipping: null,
  payment: null
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  resetInitialUI();
  renderCategoryCards();
  renderProducts();
  renderBestSeller();
  initNavbar();
  initMobileMenu();
  initCart();
  initWishlist();
  initSearch();
  initFilter();
  initPanels();
  initAnimations();
  initFaq();
  initNewsletter();
  initCurrentYear();
  initAnnouncementBar();
  initCheckout();
  initAccount();
  document.body.classList.add("hero-ready");
}


function resetInitialUI() {
  const hiddenIds = [
    "mobile-menu",
    "search-panel",
    "wishlist-panel",
    "account-panel",
    "cart-panel",
    "modal-backdrop",
    "quick-view-modal",
    "checkout-modal"
  ];

  hiddenIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });

  document.body.style.overflow = "";

  const mobileToggle = document.getElementById("mobile-toggle");
  if (mobileToggle) {
    mobileToggle.setAttribute("aria-expanded", "false");
    const icon = mobileToggle.querySelector("img");
    if (icon) icon.src = "assets/icons/menu.svg";
  }
}

function loadStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(value);
}
function findProduct(id) {
  return products.find((product) => product.id === id);
}
function getCartSubtotal() {
  return state.cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCategoryCards() {
  const grid = document.getElementById("category-grid");
  if (!grid) return;
  grid.innerHTML = categoryCards.map((card) => `
    <article class="category-card reveal">
      <div class="category-thumb">
        <img src="${card.image}" alt="${card.title}" loading="lazy">
      </div>
      <div class="category-content">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <div class="category-sublist">
          ${card.subcategories.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <button class="text-btn" type="button" data-category-jump="${card.filterValue}">
          ${card.button} <span>→</span>
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-category-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.categoryJump;
      const select = document.getElementById("category-filter");
      select.value = value;
      state.filters.category = value;
      applyFilters();
      document.getElementById("new-arrival").scrollIntoView({ behavior: "smooth" });
    });
  });

  observeNewReveals(grid);
}

function renderProducts(list = state.filteredProducts) {
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.innerHTML = list.map(renderProductCard).join("");
  bindProductCardEvents(grid);
  observeNewReveals(grid);
  refreshCounts();
}

function renderProductCard(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  return `
    <article class="product-card reveal">
      <div class="product-media spotlight">
        <img src="${product.image}" alt="${product.name}" loading="lazy" data-quick-view="${product.id}">
        <div class="badge-stack">
          ${product.badges.map((badge) => {
            const className = badge === "NEW" ? "new" : badge === "SALE" ? "sale" : "best";
            return `<span class="badge ${className}">${badge}</span>`;
          }).join("")}
        </div>
        <button class="wishlist-btn ${isWishlisted ? "active" : ""}" type="button"
          aria-label="${isWishlisted ? "Hapus dari" : "Tambah ke"} wishlist" data-wishlist="${product.id}">
          <img src="assets/icons/heart.svg" alt="" aria-hidden="true">
        </button>
        <div class="card-actions">
          <button class="btn btn-primary" type="button" data-add-cart="${product.id}">Add Cart</button>
          <button class="btn btn-secondary" type="button" data-quick-view="${product.id}">Quick View</button>
        </div>
      </div>
      <div class="product-content">
        <div class="product-top">
          <div>
            <h3 class="product-name">${product.name}</h3>
            <span class="product-category">${product.subcategory} · ${product.collection}</span>
          </div>
          <span class="product-price">${product.priceLabel}</span>
        </div>
        <div class="rating">
          <img src="assets/icons/star.svg" alt="" aria-hidden="true">
          <span>${product.rating} · Diskon ${product.discount}</span>
        </div>
      </div>
    </article>
  `;
}

function bindProductCardEvents(scope) {
  scope.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(button.dataset.addCart);
    });
  });
  scope.querySelectorAll("[data-wishlist]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleWishlist(button.dataset.wishlist);
    });
  });
  scope.querySelectorAll("[data-quick-view]").forEach((button) => {
    button.addEventListener("click", () => openQuickView(button.dataset.quickView));
  });
}

function renderBestSeller() {
  const grid = document.getElementById("best-grid");
  if (!grid) return;
  const best = products.filter((p) => p.isBestSeller).sort((a,b) => b.popular - a.popular).slice(0, 4);
  grid.innerHTML = best.map((product) => `
    <article class="best-card reveal">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div>
        <span class="eyebrow">${product.collection}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong class="product-price">${product.priceLabel}</strong>
        <div style="margin-top:14px;">
          <button class="btn btn-primary" type="button" data-quick-view="${product.id}">Quick View</button>
        </div>
      </div>
    </article>
  `).join("");
  bindProductCardEvents(grid);
  observeNewReveals(grid);
}

function initNavbar() {
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("#home, #collection, #new-arrival, #best-seller, #promo, #about, #contact");

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { threshold: [0.3, 0.55], rootMargin: "-20% 0px -50% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const open = () => {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.querySelector("img").src = "assets/icons/close.svg";
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector("img").src = "assets/icons/menu.svg";
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => toggle.getAttribute("aria-expanded") === "true" ? close() : open());
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

  menu.querySelectorAll("[data-mobile-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.dataset.mobilePanel;
      close();
      if (panelId === "account-panel") renderAccount();
      openPanel(panelId);
    });
  });

  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 992) close(); });
}

function initPanels() {
  document.getElementById("search-toggle").addEventListener("click", () => openPanel("search-panel"));
  document.getElementById("wishlist-toggle").addEventListener("click", () => {
    renderWishlist();
    openPanel("wishlist-panel");
  });
  document.getElementById("account-toggle").addEventListener("click", () => {
    renderAccount();
    openPanel("account-panel");
  });
  document.getElementById("cart-toggle").addEventListener("click", () => {
    renderCart();
    openPanel("cart-panel");
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeOverlay(button.dataset.close));
  });

  const backdrop = document.getElementById("modal-backdrop");
  backdrop.addEventListener("click", closeAllOverlays);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllOverlays();
  });
}

function openPanel(id) {
  closeAllOverlays(false);
  document.getElementById(id).hidden = false;
  document.getElementById("modal-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function openModal(id) {
  document.querySelectorAll(".panel").forEach((el) => el.hidden = true);
  document.getElementById("quick-view-modal").hidden = true;
  document.getElementById("checkout-modal").hidden = true;
  document.getElementById(id).hidden = false;
  document.getElementById("modal-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
  if (!anyOverlayOpen()) {
    document.getElementById("modal-backdrop").hidden = true;
    document.body.style.overflow = "";
  }
}

function closeAllOverlays(hideBackdrop = true) {
  document.querySelectorAll(".panel").forEach((el) => el.hidden = true);
  document.getElementById("quick-view-modal").hidden = true;
  document.getElementById("checkout-modal").hidden = true;
  if (hideBackdrop) {
    document.getElementById("modal-backdrop").hidden = true;
    document.body.style.overflow = "";
  }
}

function anyOverlayOpen() {
  const panelsOpen = [...document.querySelectorAll(".panel")].some((el) => !el.hidden);
  return panelsOpen ||
    !document.getElementById("quick-view-modal").hidden ||
    !document.getElementById("checkout-modal").hidden;
}

function initCart() {
  refreshCounts();
  renderCart();
}

function addToCart(productId, quantity = 1) {
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) existing.quantity += quantity;
  else state.cart.push({ id: productId, quantity });

  saveStorage(STORE_KEY_CART, state.cart);
  refreshCounts();
  renderCart();
  showMiniToast("Produk ditambahkan ke keranjang.");
}

function changeCartQuantity(productId, amount) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveStorage(STORE_KEY_CART, state.cart);
  refreshCounts();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveStorage(STORE_KEY_CART, state.cart);
  refreshCounts();
  renderCart();
}

function renderCart() {
  const wrap = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  if (!wrap) return;

  if (!state.cart.length) {
    wrap.innerHTML = `
      <div class="empty-panel-state">
        <img src="assets/icons/cart.svg" alt="" aria-hidden="true">
        <h3>Keranjang masih kosong</h3>
        <p>Tambahkan koleksi favorit Anda untuk mulai berbelanja.</p>
      </div>`;
    subtotalEl.textContent = "Rp0";
    return;
  }

  wrap.innerHTML = `<div class="cart-list">${state.cart.map((entry) => {
    const product = findProduct(entry.id);
    return `
      <article class="mini-card">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>${product.priceLabel}</p>
          <div class="qty-row">
            <div class="qty-box">
              <button type="button" data-cart-minus="${product.id}">
                <img src="assets/icons/minus.svg" alt="" aria-hidden="true">
              </button>
              <span>${entry.quantity}</span>
              <button type="button" data-cart-plus="${product.id}">
                <img src="assets/icons/plus.svg" alt="" aria-hidden="true">
              </button>
            </div>
          </div>
        </div>
        <button class="text-link" type="button" data-remove-cart="${product.id}">Hapus</button>
      </article>
    `;
  }).join("")}</div>`;

  subtotalEl.textContent = formatRupiah(getCartSubtotal());

  wrap.querySelectorAll("[data-cart-minus]").forEach((button) =>
    button.addEventListener("click", () => changeCartQuantity(button.dataset.cartMinus, -1)));
  wrap.querySelectorAll("[data-cart-plus]").forEach((button) =>
    button.addEventListener("click", () => changeCartQuantity(button.dataset.cartPlus, 1)));
  wrap.querySelectorAll("[data-remove-cart]").forEach((button) =>
    button.addEventListener("click", () => removeFromCart(button.dataset.removeCart)));
}

function refreshCounts() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("wishlist-count").textContent = state.wishlist.length;
}

function initWishlist() {
  renderWishlist();
}

function toggleWishlist(productId) {
  const adding = !state.wishlist.includes(productId);
  state.wishlist = adding
    ? [...state.wishlist, productId]
    : state.wishlist.filter((id) => id !== productId);

  saveStorage(STORE_KEY_WISHLIST, state.wishlist);
  refreshCounts();
  renderProducts(state.filteredProducts);
  renderWishlist();
  showMiniToast(adding ? "Produk disimpan ke wishlist." : "Produk dihapus dari wishlist.");
}

function renderWishlist() {
  const wrap = document.getElementById("wishlist-items");
  if (!wrap) return;

  if (!state.wishlist.length) {
    wrap.innerHTML = `
      <div class="empty-panel-state">
        <img src="assets/icons/wishlist.svg" alt="" aria-hidden="true">
        <h3>Belum ada wishlist</h3>
        <p>Simpan produk yang Anda suka agar mudah ditemukan kembali.</p>
      </div>`;
    return;
  }

  wrap.innerHTML = `<div class="wishlist-list">${state.wishlist.map((id) => {
    const product = findProduct(id);
    return `
      <article class="wishlist-card">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>${product.subcategory} · ${product.priceLabel}</p>
        </div>
        <div class="mini-card-actions">
          <button class="text-link" type="button" data-quick-view="${product.id}">Detail</button>
          <button class="text-link" type="button" data-remove-wishlist="${product.id}">Hapus</button>
        </div>
      </article>
    `;
  }).join("")}</div>`;

  wrap.querySelectorAll("[data-remove-wishlist]").forEach((button) =>
    button.addEventListener("click", () => toggleWishlist(button.dataset.removeWishlist)));
  wrap.querySelectorAll("[data-quick-view]").forEach((button) =>
    button.addEventListener("click", () => openQuickView(button.dataset.quickView)));
}

function initSearch() {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const popularButtons = document.querySelectorAll("[data-search]");

  const performSearch = (term = "") => {
    const query = term.trim().toLowerCase();
    const found = products.filter((product) => {
      const hay = [
        product.name, product.category, product.subcategory,
        product.collection, ...product.badges
      ].join(" ").toLowerCase();
      return hay.includes(query);
    });

    if (!query) {
      results.innerHTML = `<p class="empty-state">Cari berdasarkan nama produk, kategori, subkategori, atau koleksi.</p>`;
      return;
    }
    if (!found.length) {
      results.innerHTML = `<p class="empty-state">Tidak ada hasil untuk "<strong>${escapeHTML(term)}</strong>".</p>`;
      return;
    }

    results.innerHTML = found.map((product) => `
      <article class="search-card">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>${product.subcategory} · ${product.priceLabel}</p>
        </div>
        <button class="text-link" type="button" data-quick-view="${product.id}">Lihat</button>
      </article>
    `).join("");

    results.querySelectorAll("[data-quick-view]").forEach((button) =>
      button.addEventListener("click", () => openQuickView(button.dataset.quickView)));
  };

  performSearch();
  input.addEventListener("input", () => performSearch(input.value));
  popularButtons.forEach((button) => button.addEventListener("click", () => {
    input.value = button.dataset.search;
    performSearch(button.dataset.search);
  }));
}

function initFilter() {
  const ids = ["category-filter", "price-filter", "size-filter", "color-filter", "sort-filter"];
  const controls = ids.map((id) => document.getElementById(id));
  const filterToggle = document.getElementById("filter-toggle");
  const filterPanel = document.getElementById("filter-panel");

  const apply = () => {
    state.filters = {
      category: controls[0].value,
      price: controls[1].value,
      size: controls[2].value,
      color: controls[3].value,
      sort: controls[4].value
    };
    applyFilters();
  };

  controls.forEach((el) => el.addEventListener("change", apply));
  filterToggle.addEventListener("click", () => {
    filterPanel.hidden = !filterPanel.hidden;
  });
}

function categoryMatches(product, filterValue) {
  if (filterValue === "all") return true;
  if (CATEGORY_GROUPS[filterValue]) return CATEGORY_GROUPS[filterValue].includes(product.category);
  return product.category === filterValue;
}

function applyFilters() {
  let list = products.filter((product) => categoryMatches(product, state.filters.category));

  if (state.filters.price !== "all") {
    list = list.filter((product) => {
      if (state.filters.price === "under300") return product.price < 300000;
      if (state.filters.price === "300to400") return product.price >= 300000 && product.price <= 400000;
      if (state.filters.price === "above400") return product.price > 400000;
      return true;
    });
  }

  if (state.filters.size !== "all") {
    list = list.filter((product) => product.sizes.includes(state.filters.size));
  }
  if (state.filters.color !== "all") {
    list = list.filter((product) => product.colors.some((color) => color.name === state.filters.color));
  }

  if (state.filters.sort === "cheap") list.sort((a,b) => a.price - b.price);
  else if (state.filters.sort === "expensive") list.sort((a,b) => b.price - a.price);
  else if (state.filters.sort === "popular") list.sort((a,b) => b.popular - a.popular);
  else list.sort((a,b) => a.latestRank - b.latestRank);

  state.filteredProducts = list;
  renderProducts(list);
}

function openQuickView(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const content = document.getElementById("quick-view-content");
  let selectedSize = product.sizes[0];
  let selectedColor = product.colors[0].name;
  let quantity = 1;

  content.innerHTML = `
    <div class="quick-view-gallery">
      <div class="gallery-main">
        <img id="qv-main-image" src="${product.gallery[0]}" alt="${product.name}">
      </div>
      <div class="gallery-thumbs">
        ${product.gallery.map((src, index) => `
          <button class="gallery-thumb ${index === 0 ? "active" : ""}" type="button"
            data-gallery-src="${src}" aria-label="Lihat foto ${index + 1}">
            <img src="${src}" alt="">
          </button>
        `).join("")}
      </div>
    </div>

    <div class="qv-copy">
      <span class="eyebrow">${product.collection}</span>
      <h2 id="quick-view-title">${product.name}</h2>
      <span class="qv-category">${product.subcategory}</span>
      <div class="rating">
        <img src="assets/icons/star.svg" alt="" aria-hidden="true">
        <span>${product.rating} · Premium curated item</span>
      </div>
      <div class="qv-price">${product.priceLabel}</div>
      <p class="qv-desc">${product.description}</p>

      <div class="option-group">
        <strong>Pilih Ukuran</strong>
        <div class="option-list" id="qv-size-options">
          ${product.sizes.map((size, index) => `
            <button class="option ${index === 0 ? "selected" : ""}" type="button" data-size="${size}">${size}</button>
          `).join("")}
        </div>
        <button class="size-guide-link" type="button">
          <img src="assets/icons/size-guide.svg" alt="" aria-hidden="true"> Panduan Ukuran
        </button>
      </div>

      <div class="option-group">
        <strong>Pilih Warna</strong>
        <div class="option-list" id="qv-color-options">
          ${product.colors.map((color, index) => `
            <button class="option color-dot ${index === 0 ? "selected" : ""}" type="button" data-color="${color.name}">
              <span class="color-chip" style="background:${color.hex}"></span>${color.name}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="qty-row">
        <strong>Jumlah</strong>
        <div class="qty-box">
          <button type="button" id="qv-minus"><img src="assets/icons/minus.svg" alt="" aria-hidden="true"></button>
          <span id="qv-qty">1</span>
          <button type="button" id="qv-plus"><img src="assets/icons/plus.svg" alt="" aria-hidden="true"></button>
        </div>
      </div>

      <div class="qv-selection-summary">
        <span>Varian dipilih</span>
        <strong id="qv-selection-text">${selectedSize} · ${selectedColor}</strong>
      </div>

      <div class="qv-actions">
        <button class="btn btn-primary" type="button" id="qv-add-cart">Add to Cart</button>
        <button class="btn btn-secondary" type="button" id="qv-buy-now">Buy Now</button>
      </div>

      <div class="qv-meta">
        <div class="meta-card"><img src="assets/icons/shipping.svg" alt=""><span>Shipping</span><strong>Fast Delivery</strong></div>
        <div class="meta-card"><img src="assets/icons/payment.svg" alt=""><span>Payment</span><strong>Secure Checkout</strong></div>
        <div class="meta-card"><img src="assets/icons/return.svg" alt=""><span>Return</span><strong>Easy Exchange</strong></div>
      </div>
    </div>
  `;

  content.querySelectorAll("[data-gallery-src]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("qv-main-image").src = button.dataset.gallerySrc;
      content.querySelectorAll(".gallery-thumb").forEach((thumb) => thumb.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const updateSelection = () => {
    document.getElementById("qv-selection-text").textContent = `${selectedSize} · ${selectedColor}`;
  };

  content.querySelectorAll("[data-size]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      content.querySelectorAll("[data-size]").forEach((el) => el.classList.remove("selected"));
      button.classList.add("selected");
      updateSelection();
    });
  });

  content.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedColor = button.dataset.color;
      content.querySelectorAll("[data-color]").forEach((el) => el.classList.remove("selected"));
      button.classList.add("selected");
      updateSelection();
    });
  });

  const qtyEl = document.getElementById("qv-qty");
  document.getElementById("qv-minus").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    qtyEl.textContent = quantity;
  });
  document.getElementById("qv-plus").addEventListener("click", () => {
    quantity += 1;
    qtyEl.textContent = quantity;
  });

  document.getElementById("qv-add-cart").addEventListener("click", () => addToCart(product.id, quantity));
  document.getElementById("qv-buy-now").addEventListener("click", () => {
    addToCart(product.id, quantity);
    openCheckout();
  });

  openModal("quick-view-modal");
}

function initAccount() {
  renderAccount();
}

function renderAccount() {
  const content = document.getElementById("account-content");
  if (!content) return;

  if (state.account) {
    content.innerHTML = `
      <div class="account-profile">
        <div class="account-avatar">${initials(state.account.name)}</div>
        <p class="eyebrow">Member Profile</p>
        <h3>${escapeHTML(state.account.name)}</h3>
        <p>${escapeHTML(state.account.email)}</p>
        <div class="account-benefits">
          <div><img src="assets/icons/wishlist.svg" alt=""><span>Wishlist tersimpan di browser</span></div>
          <div><img src="assets/icons/order.svg" alt=""><span>Checkout lebih cepat dengan data profil</span></div>
          <div><img src="assets/icons/lock.svg" alt=""><span>Profil demo disimpan lokal pada perangkat ini</span></div>
        </div>
        <button class="btn btn-secondary btn-block" type="button" id="account-logout">Keluar dari Profil</button>
      </div>
    `;
    document.getElementById("account-logout").addEventListener("click", () => {
      state.account = null;
      localStorage.removeItem(STORE_KEY_ACCOUNT);
      renderAccount();
      showMiniToast("Profil lokal berhasil dihapus.");
    });
    return;
  }

  content.innerHTML = `
    <div class="account-intro">
      <img class="account-icon-large" src="assets/icons/user.svg" alt="" aria-hidden="true">
      <h3>Masuk ke AURELLE STUDIO</h3>
      <p>Buat profil lokal untuk mempercepat pengisian data checkout. Karena website ini statis, profil hanya disimpan pada browser Anda.</p>
    </div>
    <form class="account-form" id="account-form">
      <label>Nama Lengkap<input type="text" name="name" required autocomplete="name" placeholder="Nama Anda"></label>
      <label>Email<input type="email" name="email" required autocomplete="email" placeholder="nama@email.com"></label>
      <button class="btn btn-primary btn-block" type="submit">Simpan Profil</button>
    </form>
  `;

  document.getElementById("account-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.account = {
      name: data.get("name").trim(),
      email: data.get("email").trim()
    };
    saveStorage(STORE_KEY_ACCOUNT, state.account);
    renderAccount();
    showMiniToast("Profil lokal berhasil disimpan.");
  });
}

function initials(name) {
  return String(name || "AS").split(/\s+/).slice(0,2).map((part) => part[0]?.toUpperCase()).join("");
}

function initCheckout() {
  document.getElementById("checkout-btn").addEventListener("click", openCheckout);
}

function openCheckout() {
  if (!state.cart.length) {
    showMiniToast("Keranjang masih kosong.");
    return;
  }
  checkoutState = { step: 1, shipping: null, payment: null };
  renderCheckout();
  openModal("checkout-modal");
}

function renderCheckout() {
  const content = document.getElementById("checkout-content");
  document.querySelectorAll("[data-step-indicator]").forEach((el) => {
    const step = Number(el.dataset.stepIndicator);
    el.classList.toggle("active", step <= Math.min(checkoutState.step, 3));
  });

  if (checkoutState.step === 1) renderShippingStep(content);
  else if (checkoutState.step === 2) renderPaymentStep(content);
  else if (checkoutState.step === 3) renderReviewStep(content);
  else renderSuccessStep(content);
}

function renderShippingStep(content) {
  const profile = state.account || {};
  content.innerHTML = `
    <form class="checkout-form" id="shipping-form">
      <div class="checkout-form-grid">
        <label>Nama Lengkap<input name="name" required autocomplete="name" value="${escapeAttr(profile.name || "")}" placeholder="Nama penerima"></label>
        <label>Email<input name="email" type="email" required autocomplete="email" value="${escapeAttr(profile.email || "")}" placeholder="nama@email.com"></label>
        <label>Nomor Telepon<input name="phone" required autocomplete="tel" placeholder="08xxxxxxxxxx"></label>
        <label>Kota<input name="city" required autocomplete="address-level2" placeholder="Jakarta"></label>
        <label class="full">Alamat Lengkap<textarea name="address" required rows="3" placeholder="Nama jalan, nomor rumah, kecamatan..."></textarea></label>
        <label>Kode Pos<input name="postal" required inputmode="numeric" placeholder="12345"></label>
      </div>

      <div class="checkout-option-section">
        <h3>Pilih Pengiriman</h3>
        <label class="shipping-option">
          <input type="radio" name="shippingMethod" value="standard" data-cost="20000" checked>
          <img src="assets/icons/shipping.svg" alt="">
          <span><strong>Regular Delivery</strong><small>2–5 hari kerja</small></span>
          <b>Rp20.000</b>
        </label>
        <label class="shipping-option">
          <input type="radio" name="shippingMethod" value="express" data-cost="40000">
          <img src="assets/icons/shipping.svg" alt="">
          <span><strong>Express Delivery</strong><small>1–2 hari kerja</small></span>
          <b>Rp40.000</b>
        </label>
      </div>

      <div class="checkout-footer-actions">
        <button class="btn btn-primary" type="submit">Lanjut ke Pembayaran →</button>
      </div>
    </form>
  `;

  document.getElementById("shipping-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const selected = event.currentTarget.querySelector('input[name="shippingMethod"]:checked');
    checkoutState.shipping = {
      name: fd.get("name").trim(),
      email: fd.get("email").trim(),
      phone: fd.get("phone").trim(),
      city: fd.get("city").trim(),
      address: fd.get("address").trim(),
      postal: fd.get("postal").trim(),
      method: fd.get("shippingMethod"),
      shippingCost: Number(selected.dataset.cost)
    };
    checkoutState.step = 2;
    renderCheckout();
  });
}

function renderPaymentStep(content) {
  content.innerHTML = `
    <div class="checkout-step">
      <div class="payment-grid">
        <label class="payment-option">
          <input type="radio" name="paymentMethod" value="virtual-account" checked>
          <img src="assets/icons/bank.svg" alt="">
          <span><strong>Virtual Account</strong><small>Simulasi VA Bank</small></span>
        </label>
        <label class="payment-option">
          <input type="radio" name="paymentMethod" value="bank-transfer">
          <img src="assets/icons/payment.svg" alt="">
          <span><strong>Bank Transfer</strong><small>Simulasi transfer manual</small></span>
        </label>
        <label class="payment-option">
          <input type="radio" name="paymentMethod" value="e-wallet">
          <img src="assets/icons/wallet.svg" alt="">
          <span><strong>E-Wallet</strong><small>Simulasi pembayaran digital</small></span>
        </label>
      </div>
      <div class="secure-note">
        <img src="assets/icons/lock.svg" alt="">
        <p><strong>Secure checkout demo.</strong> Website statis ini tidak memproses nomor kartu, PIN, atau transaksi finansial nyata.</p>
      </div>
      <div class="checkout-footer-actions split-actions">
        <button class="btn btn-secondary" type="button" id="payment-back">← Kembali</button>
        <button class="btn btn-primary" type="button" id="payment-next">Review Pesanan →</button>
      </div>
    </div>
  `;

  document.getElementById("payment-back").addEventListener("click", () => {
    checkoutState.step = 1;
    renderCheckout();
  });
  document.getElementById("payment-next").addEventListener("click", () => {
    const selected = content.querySelector('input[name="paymentMethod"]:checked');
    checkoutState.payment = selected.value;
    checkoutState.step = 3;
    renderCheckout();
  });
}

function renderReviewStep(content) {
  const subtotal = getCartSubtotal();
  const shippingCost = checkoutState.shipping.shippingCost;
  const total = subtotal + shippingCost;

  content.innerHTML = `
    <div class="checkout-review">
      <div class="review-column">
        <h3>Ringkasan Produk</h3>
        <div class="review-items">
          ${state.cart.map((entry) => {
            const product = findProduct(entry.id);
            return `
              <div class="review-item">
                <img src="${product.image}" alt="${product.name}">
                <span><strong>${product.name}</strong><small>${entry.quantity} × ${product.priceLabel}</small></span>
                <b>${formatRupiah(product.price * entry.quantity)}</b>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="review-column">
        <h3>Pengiriman</h3>
        <div class="review-address">
          <strong>${escapeHTML(checkoutState.shipping.name)}</strong>
          <span>${escapeHTML(checkoutState.shipping.address)}</span>
          <span>${escapeHTML(checkoutState.shipping.city)} · ${escapeHTML(checkoutState.shipping.postal)}</span>
          <span>${escapeHTML(checkoutState.shipping.phone)}</span>
        </div>

        <h3>Pembayaran</h3>
        <div class="review-address">
          <span>${paymentLabel(checkoutState.payment)}</span>
        </div>

        <div class="order-total-box">
          <div><span>Subtotal</span><strong>${formatRupiah(subtotal)}</strong></div>
          <div><span>Pengiriman</span><strong>${formatRupiah(shippingCost)}</strong></div>
          <div class="grand-total"><span>Total</span><strong>${formatRupiah(total)}</strong></div>
        </div>
      </div>

      <div class="checkout-footer-actions split-actions full">
        <button class="btn btn-secondary" type="button" id="review-back">← Kembali</button>
        <button class="btn btn-primary" type="button" id="place-order">
          <img src="assets/icons/check.svg" alt=""> Buat Pesanan
        </button>
      </div>
    </div>
  `;

  document.getElementById("review-back").addEventListener("click", () => {
    checkoutState.step = 2;
    renderCheckout();
  });

  document.getElementById("place-order").addEventListener("click", () => {
    const orderNumber = createOrderNumber();
    const order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...state.cart],
      shipping: checkoutState.shipping,
      payment: checkoutState.payment,
      total
    };
    const orders = loadStorage(STORE_KEY_ORDERS, []);
    orders.push(order);
    saveStorage(STORE_KEY_ORDERS, orders);

    state.cart = [];
    saveStorage(STORE_KEY_CART, state.cart);
    refreshCounts();
    renderCart();

    checkoutState.orderNumber = orderNumber;
    checkoutState.total = total;
    checkoutState.step = 4;
    renderCheckout();
  });
}

function renderSuccessStep(content) {
  document.querySelectorAll("[data-step-indicator]").forEach((el) => el.classList.add("active"));
  content.innerHTML = `
    <div class="order-success">
      <img src="assets/icons/check.svg" alt="" aria-hidden="true">
      <p class="eyebrow">Order Created</p>
      <h3>Pesanan Berhasil Dibuat</h3>
      <p>Terima kasih. Pesanan demo Anda telah disimpan secara lokal pada browser.</p>
      <div class="order-number">
        <span>Nomor Pesanan</span>
        <strong>${checkoutState.orderNumber}</strong>
      </div>
      <div class="order-number">
        <span>Total</span>
        <strong>${formatRupiah(checkoutState.total)}</strong>
      </div>
      <button class="btn btn-primary" type="button" id="finish-checkout">Selesai</button>
    </div>
  `;
  document.getElementById("finish-checkout").addEventListener("click", closeAllOverlays);
}

function paymentLabel(value) {
  return {
    "virtual-account": "Virtual Account",
    "bank-transfer": "Bank Transfer",
    "e-wallet": "E-Wallet"
  }[value] || value;
}

function createOrderNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AS-${y}${m}${d}-${rand}`;
}

function initAnimations() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((el) => el.classList.add("show"));
    return;
  }
  window._aurelleRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      window._aurelleRevealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 30, 240)}ms`;
    window._aurelleRevealObserver.observe(item);
  });

  initSpotlights(document);
}

function observeNewReveals(scope) {
  if (!window._aurelleRevealObserver) {
    scope.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((el) => el.classList.add("show"));
    return;
  }
  scope.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((el) => {
    window._aurelleRevealObserver.observe(el);
  });
  initSpotlights(scope);
}

function initSpotlights(scope) {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  scope.querySelectorAll(".spotlight").forEach((item) => {
    if (item.dataset.spotlightBound) return;
    item.dataset.spotlightBound = "1";
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      item.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("newsletter-email");
    message.textContent = `Terima kasih! ${input.value} berhasil terdaftar.`;
    form.reset();
  });
}

function initCurrentYear() {
  document.getElementById("current-year").textContent = new Date().getFullYear();
}

function initAnnouncementBar() {
  const messages = [
    "Gratis Ongkir Seluruh Indonesia Untuk Pembelian Tertentu",
    "Diskon 15% Untuk Koleksi Baru Pilihan",
    "Elegant Style For Every Moment — Koleksi Premium Siap Belanja"
  ];
  const textEl = document.querySelector(".announcement-text");
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % messages.length;
    textEl.textContent = messages[idx];
  }, 3500);
}

function showMiniToast(message) {
  let toast = document.getElementById("mini-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "mini-toast";
    toast.className = "mini-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
function escapeAttr(value) {
  return escapeHTML(value);
}
