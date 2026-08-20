
document.addEventListener("DOMContentLoaded", init);

function init(){
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initHomeBooking();
  initRoomFilters();
  initGallery();
  initLightbox();
  initContactForm();
  initBooking();
  initConfirmation();
}

const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const rupiah=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);

function initNavbar(){
  const h=qs("[data-header]");
  if(!h) return;
  const onScroll=()=>h.classList.toggle("scrolled",window.scrollY>18);
  onScroll();
  addEventListener("scroll",onScroll,{passive:true});
}

function initMobileMenu(){
  const menu=qs("[data-mobile-menu]");
  qs("[data-menu-btn]")?.addEventListener("click",()=>menu?.classList.add("open"));
  qs("[data-menu-close]")?.addEventListener("click",()=>menu?.classList.remove("open"));
}

function initScrollReveal(){
  const els=qsa(".reveal,.image-reveal");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("in-view"));return}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");io.unobserve(e.target)}})
  },{threshold:.12});
  els.forEach(e=>io.observe(e));
}

function initHomeBooking(){
  const f=qs("[data-home-booking]");
  if(!f) return;
  const today=new Date(), tomorrow=new Date(Date.now()+86400000);
  f.checkin.value ||= today.toISOString().slice(0,10);
  f.checkout.value ||= tomorrow.toISOString().slice(0,10);
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const p=new URLSearchParams(new FormData(f));
    location.href=`booking.html?${p.toString()}`;
  });
}

function initRoomFilters(){
  const grid=qs("[data-room-grid]");
  if(!grid) return;
  const cards=qsa(".room-card",grid);
  let type="all",cap=null;
  const apply=()=>{
    cards.forEach(c=>{
      const okType=type==="all"||c.dataset.type===type;
      const okCap=!cap||Number(c.dataset.capacity)>=Number(cap);
      c.classList.toggle("hidden",!(okType&&okCap));
    });
  };
  qsa("[data-room-filter]").forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-room-filter]").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");type=b.dataset.roomFilter;apply();
  }));
  qsa("[data-cap-filter]").forEach(b=>b.addEventListener("click",()=>{
    cap=cap===b.dataset.capFilter?null:b.dataset.capFilter;
    qsa("[data-cap-filter]").forEach(x=>x.classList.toggle("active",x.dataset.capFilter===cap));
    apply();
  }));
  qs("[data-room-sort]")?.addEventListener("change",e=>{
    const mode=e.target.value;
    const arr=[...cards].sort((a,b)=>{
      if(mode==="low")return +a.dataset.price-+b.dataset.price;
      if(mode==="high")return +b.dataset.price-+a.dataset.price;
      return 0;
    });
    arr.forEach(x=>grid.append(x));
  });
}

let lightboxImages=[],lightboxIndex=0;
function initGallery(){
  const grid=qs("[data-gallery-grid]");
  if(!grid) return;
  qsa("[data-gallery-filter]").forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-gallery-filter]").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    const f=b.dataset.galleryFilter;
    qsa(".gallery-item",grid).forEach(it=>it.classList.toggle("hidden",f!=="all"&&it.dataset.category!==f));
  }));
}
function initLightbox(){
  const lb=qs("[data-lightbox]");
  if(!lb) return;
  const items=qsa(".gallery-item");
  lightboxImages=items.map(i=>i.querySelector("img")?.src).filter(Boolean);
  items.forEach((it,i)=>it.addEventListener("click",()=>openLightbox(i)));
  qs(".lightbox-close",lb)?.addEventListener("click",closeLightbox);
  qs(".lightbox-backdrop",lb)?.addEventListener("click",closeLightbox);
  qs(".lightbox-nav.prev",lb)?.addEventListener("click",()=>stepLightbox(-1));
  qs(".lightbox-nav.next",lb)?.addEventListener("click",()=>stepLightbox(1));
  addEventListener("keydown",e=>{
    if(!lb.classList.contains("open"))return;
    if(e.key==="Escape")closeLightbox();
    if(e.key==="ArrowLeft")stepLightbox(-1);
    if(e.key==="ArrowRight")stepLightbox(1);
  });
}
function openLightbox(i){
  const lb=qs("[data-lightbox]"); if(!lb||!lightboxImages.length)return;
  lightboxIndex=Math.max(0,Math.min(i,lightboxImages.length-1));
  qs(".lightbox-image",lb).src=lightboxImages[lightboxIndex];
  qs(".lightbox-count",lb).textContent=`${lightboxIndex+1} / ${lightboxImages.length}`;
  lb.classList.add("open");lb.setAttribute("aria-hidden","false");
}
function closeLightbox(){const lb=qs("[data-lightbox]");lb?.classList.remove("open");lb?.setAttribute("aria-hidden","true")}
function stepLightbox(d){if(!lightboxImages.length)return;lightboxIndex=(lightboxIndex+d+lightboxImages.length)%lightboxImages.length;openLightbox(lightboxIndex)}

function initContactForm(){
  const f=qs("[data-contact-form]");
  if(!f)return;
  f.addEventListener("submit",e=>{
    e.preventDefault();
    if(!f.reportValidity())return;
    qs(".form-status",f).textContent="Terima kasih. Ini adalah simulasi frontend; pesan belum dikirim ke server.";
    f.reset();
  });
}

const bookingRooms=[
  {name:"Deluxe King Room",img:"deluxe.webp",price:1850000,capacity:"2 Dewasa",amenities:"King Bed • Wi-Fi • City View"},
  {name:"Premier Twin Room",img:"premier.webp",price:2050000,capacity:"2 Dewasa",amenities:"Twin Bed • Wi-Fi • Lounge Chair"},
  {name:"Executive Suite",img:"executive.webp",price:3450000,capacity:"2 Dewasa",amenities:"King Bed • Living Area • Bathtub"},
  {name:"Élanora Grand Suite",img:"grand-suite.webp",price:5950000,capacity:"2–3 Dewasa",amenities:"King Bed • Suite Living • Premium View"}
];
const addons=[
  {id:"transfer",name:"Airport Transfer",price:350000,icon:"airport-transfer",desc:"Private transfer satu arah."},
  {id:"breakfast",name:"Breakfast for 2",price:450000,icon:"restaurant",desc:"Sarapan untuk dua tamu."},
  {id:"romantic",name:"Romantic Room Setup",price:650000,icon:"heart",desc:"Dekorasi kamar bernuansa romantis."},
  {id:"extra",name:"Extra Bed",price:500000,icon:"bed",desc:"Satu extra bed untuk masa menginap."},
  {id:"late",name:"Late Check-out",price:450000,icon:"clock",desc:"Perpanjangan check-out sesuai ketersediaan."}
];
let booking={
  step:1,checkIn:"",checkOut:"",rooms:1,adults:2,children:0,roomType:"",roomPrice:0,roomImage:"deluxe.webp",
  guest:{},addons:[],paymentMethod:"Bank Transfer",nights:0,subtotal:0,serviceFee:0,tax:0,total:0
};

function initBooking(){
  const form=qs("[data-booking-form]");
  if(!form)return;
  const params=new URLSearchParams(location.search);
  const ci=params.get("checkin"),co=params.get("checkout");
  form.checkIn.value=ci||new Date().toISOString().slice(0,10);
  form.checkOut.value=co||new Date(Date.now()+86400000).toISOString().slice(0,10);
  if(params.get("guests")) form.adults.value=params.get("guests");
  if(params.get("rooms")) form.rooms.value=parseInt(params.get("rooms"))||1;

  qsa("[data-booking-next]").forEach(b=>b.addEventListener("click",()=>bookingNext(form,b)));
  qsa("[data-booking-prev]").forEach(b=>b.addEventListener("click",()=>goBookingStep(Math.max(1,booking.step-1))));
  form.addEventListener("input",()=>syncBooking(form));
  form.addEventListener("change",()=>syncBooking(form));
  form.addEventListener("submit",e=>submitBooking(e,form));
  renderAddons();
  syncBooking(form);
  const wanted=params.get("room");
  if(wanted){
    const found=bookingRooms.find(r=>r.name===wanted);
    if(found){booking.roomType=found.name;booking.roomPrice=found.price;booking.roomImage=found.img}
  }
}

function bookingNext(form,button){
  syncBooking(form);
  if(booking.step===1){
    if(!validateDates(form))return;
    goBookingStep(2);
    simulateAvailability(button);
    return;
  }
  if(booking.step===2&&!booking.roomType)return;
  if(booking.step===3){
    const required=[form.guestName,form.guestEmail,form.guestPhone];
    if(required.some(x=>!x.value.trim())){required.find(x=>!x.value.trim())?.focus();return}
  }
  if(booking.step===5)booking.paymentMethod=form.paymentMethod.value;
  if(booking.step===5)renderReview();
  goBookingStep(Math.min(6,booking.step+1));
}

function validateDates(form){
  const a=new Date(form.checkIn.value+"T00:00:00"),b=new Date(form.checkOut.value+"T00:00:00");
  if(!form.checkIn.value||!form.checkOut.value||!(b>a)){
    alert("Check-out harus setelah check-in.");return false
  }
  return true;
}
function goBookingStep(n){
  booking.step=n;
  qsa(".booking-step").forEach(s=>s.classList.toggle("active",+s.dataset.step===n));
  qsa("[data-booking-progress]>div").forEach((d,i)=>{d.classList.toggle("active",i===n-1);d.classList.toggle("done",i<n-1)});
  scrollTo({top:0,behavior:"smooth"});
}
function simulateAvailability(){
  const loader=qs("[data-availability-loader]"),list=qs("[data-booking-rooms]");
  loader.style.display="flex";list.innerHTML="";
  setTimeout(()=>{loader.style.display="none";renderAvailableRooms()},650);
}
function renderAvailableRooms(){
  const list=qs("[data-booking-rooms]");
  list.innerHTML=bookingRooms.map(r=>`<article class="booking-room-option ${booking.roomType===r.name?"selected":""}" data-book-room="${r.name}">
    <img src="assets/images/rooms/${r.img}" alt="${r.name}"><div><h3>${r.name}</h3><p>${r.capacity} • ${r.amenities}</p><small>Termasuk pajak sesuai ringkasan.</small></div><div><strong>${rupiah(r.price)} / malam</strong><button type="button" class="btn btn-outline">Pilih Kamar</button></div></article>`).join("");
  qsa("[data-book-room]").forEach(card=>card.querySelector("button").addEventListener("click",()=>{
    const r=bookingRooms.find(x=>x.name===card.dataset.bookRoom);
    booking.roomType=r.name;booking.roomPrice=r.price;booking.roomImage=r.img;
    qsa("[data-book-room]").forEach(x=>x.classList.remove("selected"));card.classList.add("selected");
    const next=qs('.booking-step[data-step="2"] [data-booking-next]');next.disabled=false;
    calculateBooking();renderSummary();
  }));
  if(booking.roomType){const next=qs('.booking-step[data-step="2"] [data-booking-next]');next.disabled=false}
}
function renderAddons(){
  const g=qs("[data-addon-grid]");if(!g)return;
  g.innerHTML=addons.map(a=>`<article class="addon-card" data-addon="${a.id}"><img src="assets/icons/${a.icon}.svg" alt=""><div><strong>${a.name}</strong><small>${a.desc} • ${rupiah(a.price)}</small></div><button type="button" aria-label="Tambah ${a.name}"><img src="assets/icons/plus.svg" alt=""></button></article>`).join("");
  qsa("[data-addon]").forEach(c=>c.querySelector("button").addEventListener("click",()=>{
    const a=addons.find(x=>x.id===c.dataset.addon),idx=booking.addons.findIndex(x=>x.id===a.id);
    if(idx>=0)booking.addons.splice(idx,1); else booking.addons.push(a);
    c.classList.toggle("added",idx<0);
    c.querySelector("button img").src=`assets/icons/${idx<0?"minus":"plus"}.svg`;
    calculateBooking();renderSummary();
  }));
}
function syncBooking(form){
  booking.checkIn=form.checkIn?.value||booking.checkIn;
  booking.checkOut=form.checkOut?.value||booking.checkOut;
  booking.rooms=Number(form.rooms?.value)||1;
  booking.adults=Math.max(1,Number(form.adults?.value)||1);
  booking.children=Math.max(0,Number(form.children?.value)||0);
  booking.guest={
    name:form.guestName?.value||"",email:form.guestEmail?.value||"",phone:form.guestPhone?.value||"",
    country:form.country?.value||"Indonesia",identity:form.identity?.value||"",arrival:form.arrival?.value||"",request:form.request?.value||""
  };
  booking.paymentMethod=form.paymentMethod?.value||booking.paymentMethod;
  calculateBooking();renderSummary();
}
function calculateBooking(){
  if(booking.checkIn&&booking.checkOut){
    const a=new Date(booking.checkIn+"T00:00:00"),b=new Date(booking.checkOut+"T00:00:00");
    booking.nights=Math.max(0,Math.round((b-a)/86400000));
  }
  const roomSubtotal=booking.roomPrice*booking.nights*booking.rooms;
  const addonTotal=booking.addons.reduce((s,a)=>s+a.price,0);
  booking.subtotal=roomSubtotal+addonTotal;
  booking.serviceFee=Math.round(booking.subtotal*.05);
  booking.tax=Math.round((booking.subtotal+booking.serviceFee)*.11);
  booking.total=booking.subtotal+booking.serviceFee+booking.tax;
}
function renderSummary(){
  const s=qs("[data-booking-summary]");if(!s)return;
  qs(".summary-room-image img",s).src=`assets/images/rooms/${booking.roomImage}`;
  qs("h3",s).textContent=booking.roomType||"Belum ada kamar dipilih";
  const vals=[booking.checkIn||"-",booking.checkOut||"-",String(booking.nights),`${booking.adults} Dewasa${booking.children?`, ${booking.children} Anak`:""}`];
  qsa(".summary-lines b",s).forEach((b,i)=>b.textContent=vals[i]);
  qs(".summary-addons",s).innerHTML=booking.addons.map(a=>`<small>+ ${a.name} — ${rupiah(a.price)}</small>`).join("");
  const prices=[booking.subtotal,booking.serviceFee,booking.tax];
  qsa(".summary-price>div:not(.grand) b",s).forEach((b,i)=>b.textContent=rupiah(prices[i]));
  qs(".summary-price .grand strong",s).textContent=rupiah(booking.total);
}
function renderReview(){
  const box=qs("[data-booking-review]");if(!box)return;
  box.innerHTML=[
    ["Kamar",booking.roomType],["Check-in",booking.checkIn],["Check-out",booking.checkOut],["Jumlah malam",booking.nights],
    ["Tamu",`${booking.adults} Dewasa, ${booking.children} Anak`],["Nama",booking.guest.name],["Email",booking.guest.email],
    ["Pembayaran",booking.paymentMethod],["Grand Total",rupiah(booking.total)]
  ].map(([k,v])=>`<div><span>${k}</span><strong>${v||"-"}</strong></div>`).join("");
}
function submitBooking(e,form){
  e.preventDefault();
  syncBooking(form);
  if(!booking.roomType||!booking.guest.name||!booking.checkIn||!booking.checkOut||!form.agree.checked)return;
  const id=`ELA-2026-${String(Math.floor(10000+Math.random()*89999))}`;
  const payload={...booking,bookingId:id,paymentStatus:booking.paymentMethod==="Pay at Hotel"?"Bayar di Hotel":"Menunggu Pembayaran"};
  sessionStorage.setItem("elanora_booking_confirmation",JSON.stringify(payload));
  location.href="booking-confirmation.html";
}
function initConfirmation(){
  const host=qs("[data-confirm-details]");if(!host)return;
  const data=JSON.parse(sessionStorage.getItem("elanora_booking_confirmation")||"null");
  if(!data){host.innerHTML="<p>Tidak ada data reservasi aktif.</p>";return}
  qs("[data-confirm-id]").textContent=data.bookingId;
  const details=[
    ["Nama Tamu",data.guest?.name],["Kamar",data.roomType],["Check-in",data.checkIn],["Check-out",data.checkOut],
    ["Tamu",`${data.adults} Dewasa, ${data.children} Anak`],["Pembayaran",data.paymentStatus],["Total",rupiah(data.total)],["Kontak",data.guest?.phone]
  ];
  host.innerHTML=details.map(([k,v])=>`<div><span>${k}</span><strong>${v||"-"}</strong></div>`).join("");
}
