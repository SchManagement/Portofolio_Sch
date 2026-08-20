const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const state={
  page:'dashboard',
  invoices:JSON.parse(localStorage.getItem('nexora_v2_invoices')||'[]'),
  counter:Number(localStorage.getItem('nexora_v2_counter')||84),
  currentInvoiceId:null,
  confirmAction:null
};
const meta={
  dashboard:['Dashboard','Ringkasan operasional service hari ini'],
  nota:['Buat Nota','Buat transaksi service dan invoice pelanggan'],
  history:['Riwayat Nota','Kelola invoice dan status pengiriman'],
  schedule:['Jadwal Pekerjaan','Kalender dan workflow pekerjaan'],
  customers:['Pelanggan','CRM pelanggan dan unit AC'],
  technicians:['Teknisi','Kelola tim lapangan dan performa'],
  monitoring:['Monitoring Teknisi','Pantau status pekerjaan teknisi di lapangan'],
  activity:['Aktivitas Teknisi','Riwayat aktivitas teknisi dengan identitas yang jelas'],
  backup:['Backup','Backup, arsip, dan pemulihan data'],
  settings:['Pengaturan','Konfigurasi bisnis, invoice, dan WhatsApp']
};
const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n)||0);
const fmtDate=d=>new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',year:'numeric'}).format(d);
const fmtLong=d=>new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

document.addEventListener('DOMContentLoaded',()=>{
  $('#todayChip').textContent=fmtDate(new Date());
  $('#loginForm').addEventListener('submit',login);
  $('#togglePassword').addEventListener('click',togglePassword);
  $('#logoutBtn').addEventListener('click',logout);
  $('#menuBtn').addEventListener('click',()=>drawer(true));
  $('#drawerBackdrop').addEventListener('click',()=>drawer(false));
  $('#sidebarNav').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b)navigate(b.dataset.page)});
  $('#searchTrigger').addEventListener('click',openSearch);
  $('#globalSearchInput').addEventListener('input',renderSearch);
  document.addEventListener('click',globalClick);
  document.addEventListener('keydown',hotkeys);

  if(localStorage.getItem('nexora_v2_remember')==='1'){
    $('#loginUser').value=localStorage.getItem('nexora_v2_user')||'administrator';
    $('#rememberMe').checked=true;
  }
  if(localStorage.getItem('nexora_v2_logged')==='1')enterApp();
  loginParallax();
});

function login(e){
  e.preventDefault();
  const u=$('#loginUser').value.trim(),p=$('#loginPassword').value.trim();
  if(!u||!p){toast('warning','Login belum lengkap','Isi username/email dan password.');return}
  const btn=e.currentTarget.querySelector('button[type=submit]'),label=btn.querySelector('span');
  btn.disabled=true;label.textContent='Memverifikasi...';
  setTimeout(()=>{
    localStorage.setItem('nexora_v2_logged','1');
    if($('#rememberMe').checked){localStorage.setItem('nexora_v2_remember','1');localStorage.setItem('nexora_v2_user',u)}
    else localStorage.removeItem('nexora_v2_remember');
    label.textContent='Berhasil';
    setTimeout(()=>{btn.disabled=false;label.textContent='Masuk ke Dashboard';enterApp()},250);
  },450);
}
function togglePassword(){
  const i=$('#loginPassword'),show=i.type==='password';
  i.type=show?'text':'password';
  $('#togglePassword img').src=`assets/icons/${show?'eye-off':'eye'}.svg`;
  $('#togglePassword').setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password');
}
function enterApp(){$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');navigate('dashboard')}
function logout(){confirmBox('Keluar dari aplikasi?','Sesi portfolio demo saat ini akan ditutup.','Keluar',()=>{localStorage.removeItem('nexora_v2_logged');location.reload()})}
function drawer(open){$('#sidebar').classList.toggle('open',open);$('#drawerBackdrop').classList.toggle('open',open)}
function navigate(page){
  state.page=page;
  $$('.nav-item[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  const [t,s]=meta[page]||meta.dashboard;$('#pageTitle').textContent=t;$('#pageSubtitle').textContent=s;
  $('#pageHost').innerHTML=views[page]();
  drawer(false);window.scrollTo({top:0,behavior:'smooth'});
  requestAnimationFrame(()=>initPage(page));
}
function heading(title,sub,action=''){return `<div class="page-heading"><div><h1>${title}</h1><p>${sub}</p></div>${action}</div>`}
function status(text,cls='scheduled'){return `<span class="status ${cls}">${text}</span>`}

const views={
dashboard:()=>`<section class="page">
  <div class="greeting reveal">
    <div><div class="eyebrow">DEMO OPERATIONAL DATA</div><h1>Selamat Datang Kembali</h1><p>Berikut ringkasan operasional service AC hari ini.</p><div class="greeting-meta"><img src="assets/icons/calendar.svg"><span>${fmtLong(new Date())}</span></div><button class="btn primary" data-go="nota"><img src="assets/icons/invoice-add.svg">Buat Nota</button></div>
    <div class="greeting-art"><img src="assets/icons/air-conditioner.svg"></div>
  </div>
  <div class="kpi-grid">
    ${kpi('customer','Total Pelanggan','248','+12 bulan ini','248')}
    ${kpi('calendar','Pekerjaan Hari Ini','12','+3 dari kemarin','12')}
    ${kpi('technician','Teknisi Aktif','8','dari 10 teknisi','8')}
    ${kpi('invoice-history','Nota Bulan Ini','84','+18%','84')}
    <article class="kpi-card wide-kpi reveal"><div class="kpi-icon"><img src="assets/icons/payment.svg"></div><span>Pendapatan Bulan Ini</span><strong data-money="28750000">Rp0</strong><small class="positive">+14.8% dari bulan lalu</small><svg class="spark" viewBox="0 0 120 32"><path d="M2 26 C18 24,20 12,34 18 S54 23,66 12 S88 16,118 3"/></svg></article>
    ${kpi('check','Pekerjaan Selesai','73','86.9% completion','73')}
  </div>
  <div class="dashboard-grid">
    <article class="panel large reveal">
      <div class="panel-head"><div><h3>Pendapatan Service</h3><p>Performa 6 bulan terakhir</p></div><span class="chip">2026</span></div>
      <div class="line-chart-wrap"><svg class="line-chart" viewBox="0 0 720 230" preserveAspectRatio="none"><defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4CAF7D" stop-opacity=".22"/><stop offset="100%" stop-color="#4CAF7D" stop-opacity="0"/></linearGradient></defs><g class="grid-lines"><path d="M0 45H720M0 90H720M0 135H720M0 180H720"/></g><path class="chart-area" d="M0 190 C80 180 80 130 145 145 S255 175 305 105 S390 120 450 78 S565 105 720 28 L720 230 L0 230Z"/><path class="chart-line" d="M0 190 C80 180 80 130 145 145 S255 175 305 105 S390 120 450 78 S565 105 720 28"/></svg><div class="chart-labels"><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span><span>Jul</span><span>Agu</span></div></div>
    </article>
    <article class="panel reveal"><div class="panel-head"><div><h3>Status Pekerjaan</h3><p>Distribusi hari ini</p></div></div><div class="donut-wrap"><div class="donut"><div><strong>12</strong><span>Jobs</span></div></div><div class="legend"><span><i style="background:#9FCFBA"></i>Dijadwalkan<b>2</b></span><span><i style="background:#D8B26B"></i>Berangkat<b>2</b></span><span><i style="background:#6DB9B2"></i>Tiba<b>1</b></span><span><i style="background:#4CAF7D"></i>Dikerjakan<b>3</b></span><span><i style="background:#2F9E67"></i>Selesai<b>3</b></span><span><i style="background:#D9534F"></i>Dibatalkan<b>1</b></span></div></div></article>
    <article class="panel reveal"><div class="panel-head"><div><h3>Pekerjaan Mingguan</h3><p>Volume pekerjaan per hari</p></div></div><div class="bars"><div><i style="--h:48%"></i><span>Sen</span></div><div><i style="--h:66%"></i><span>Sel</span></div><div><i style="--h:57%"></i><span>Rab</span></div><div><i style="--h:82%"></i><span>Kam</span></div><div><i style="--h:73%"></i><span>Jum</span></div><div><i style="--h:92%"></i><span>Sab</span></div><div><i style="--h:39%"></i><span>Min</span></div></div></article>
    <article class="panel reveal"><div class="panel-head"><div><h3>Performa Teknisi</h3><p>Ranking penyelesaian</p></div><button class="text-btn" data-go="technicians">Lihat semua</button></div><div class="tech-ranking">${rank('RA','Rizky Aditya','12 job selesai','96%')}${rank('DP','Dimas Pratama','10 job selesai','92%')}${rank('AS','Andi Saputra','9 job selesai','89%')}</div></article>
  </div>
  <section class="panel reveal"><div class="panel-head"><div><h3>Akses Cepat</h3><p>Tindakan yang paling sering digunakan</p></div></div><div class="quick-grid">${quick('invoice-add','Buat Nota Baru','Buat transaksi service','nota')}${quick('calendar','Buat Jadwal','Atur pekerjaan baru','schedule')}${quick('customer','Tambah Pelanggan','Data pelanggan baru','customers')}${quick('technician','Tambah Teknisi','Kelola tim lapangan','technicians')}${quick('monitoring','Monitoring Teknisi','Pantau workflow aktif','monitoring')}</div></section>
  <div class="two-col">
    <section class="panel reveal"><div class="panel-head"><div><h3>Jadwal Hari Ini</h3><p>Pekerjaan aktif dan terjadwal</p></div><button class="text-btn" data-go="schedule">Lihat jadwal</button></div><div class="table-wrap"><table><thead><tr><th>Jam</th><th>Pelanggan</th><th>Lokasi</th><th>Teknisi</th><th>Layanan</th><th>Status</th><th></th></tr></thead><tbody><tr><td>08:30</td><td><strong>Budi Santoso</strong></td><td>Kemang</td><td>Rizky</td><td>Cuci AC</td><td>${status('Dikerjakan','work')}</td><td><button class="icon-btn small"><img src="assets/icons/more.svg"></button></td></tr><tr><td>10:00</td><td><strong>Siti Rahma</strong></td><td>Cilandak</td><td>Dimas</td><td>Tambah Freon</td><td>${status('Berangkat','go')}</td><td><button class="icon-btn small"><img src="assets/icons/more.svg"></button></td></tr><tr><td>13:30</td><td><strong>PT Mandala</strong></td><td>Tebet</td><td>Andi</td><td>Service AC</td><td>${status('Dijadwalkan','scheduled')}</td><td><button class="icon-btn small"><img src="assets/icons/more.svg"></button></td></tr></tbody></table></div></section>
    <section class="panel reveal"><div class="panel-head"><div><h3>Aktivitas Terbaru</h3><p>Update operasional terbaru</p></div><button class="text-btn" data-go="activity">Lihat semua</button></div><div class="timeline-mini">${miniActivity('route','Rizky berangkat menuju pelanggan','JOB-2026-0121 · Budi Santoso','08:25')}${miniActivity('location','Andi tiba di lokasi','JOB-2026-0117 · PT Mandala','08:17')}${miniActivity('send','Invoice berhasil dikirim','INV-2026-0084 · CV Kencana','07:58')}</div></section>
  </div>
</section>`,
nota:()=>`<section class="page">${heading('Buat Nota','Buat nota service, simpan transaksi, cetak invoice, dan kirim invoice melalui WhatsApp.','<span class="eyebrow-chip">LIVE PREVIEW</span>')}
<div class="invoice-layout"><div class="invoice-form-col">
  ${formSection('01','Data Pelanggan','Pilih pelanggan atau masukkan data baru.',`<div class="form-grid"><label class="field span-2"><span>Pilih Pelanggan</span><select id="customerSelect"><option value="">Pelanggan baru / pilih pelanggan</option><option data-name="Budi Santoso" data-phone="6281234567890" data-address="Jl. Kemang Raya No. 18, Jakarta">Budi Santoso</option><option data-name="Siti Rahma" data-phone="6289876543210" data-address="Jl. Cilandak Tengah, Jakarta">Siti Rahma</option></select></label><label class="field"><span>Nama Pelanggan</span><input id="custName" placeholder="Nama pelanggan"></label><label class="field"><span>Nomor WhatsApp</span><input id="custPhone" placeholder="628xxxxxxxxxx"></label><label class="field span-2"><span>Alamat</span><textarea id="custAddress" rows="2" placeholder="Alamat lengkap"></textarea></label><label class="field"><span>Kecamatan / Kota</span><input id="custCity" placeholder="Jakarta Selatan"></label><label class="field"><span>Catatan Lokasi</span><input id="custLocationNote" placeholder="Contoh: rumah pagar hitam"></label></div>`)}
  ${formSection('02','Detail Service','Tambahkan satu atau beberapa item service.',`<div id="serviceItems" class="service-items"></div><button class="btn secondary" id="addItemBtn" type="button"><img src="assets/icons/plus.svg">Tambah Item</button>`)}
  ${formSection('03','Teknisi & Job','Hubungkan nota dengan pekerjaan lapangan.',`<div class="form-grid"><label class="field"><span>Teknisi</span><select id="invoiceTech"><option>Rizky Aditya</option><option>Dimas Pratama</option><option>Andi Saputra</option></select></label><label class="field"><span>Teknisi Tambahan</span><select id="invoiceTech2"><option value="">Tidak ada</option><option>Dimas Pratama</option><option>Andi Saputra</option></select></label><label class="field"><span>Tanggal Service</span><input id="serviceDate" type="date"></label><label class="field"><span>Jam</span><input id="serviceTime" type="time" value="09:00"></label><label class="field"><span>Job ID</span><input id="jobId" value="JOB-2026-0121"></label><label class="field span-2"><span>Catatan Teknisi</span><textarea id="techNote" rows="2" placeholder="Catatan pekerjaan"></textarea></label></div>`)}
  ${formSection('04','Pembayaran','Atur diskon, pajak, dan status pembayaran.',`<div class="form-grid"><label class="field"><span>Diskon</span><div class="input-combo"><select id="discountType"><option value="nominal">Nominal</option><option value="percent">Persen</option></select><input id="discountValue" type="number" min="0" value="0"></div></label><label class="field"><span>Biaya Tambahan</span><input id="additionalFee" type="number" min="0" value="0"></label><label class="field"><span>Pajak (%)</span><input id="taxValue" type="number" min="0" value="0"></label><label class="field"><span>Status Pembayaran</span><select id="paymentStatus"><option>Belum Bayar</option><option>DP</option><option>Lunas</option></select></label><label class="field"><span>Metode</span><select id="paymentMethod"><option>Tunai</option><option>Transfer</option><option>QRIS</option><option>Lainnya</option></select></label><label class="field"><span>Jumlah Dibayar</span><input id="paidAmount" type="number" min="0" value="0"></label></div>`)}
</div>
<aside class="invoice-preview-col"><div class="invoice-preview" id="invoicePreview"><div class="invoice-brand"><div class="brand-logo">N</div><div><strong>NEXORA SERVICE</strong><span>AC Service Management System</span></div><div class="invoice-no"><small>INVOICE</small><b id="previewInvNo">DRAFT</b></div></div><div class="invoice-meta"><div><span>Tanggal</span><strong id="previewDate">-</strong></div><div><span>Job ID</span><strong id="previewJob">-</strong></div><div><span>Teknisi</span><strong id="previewTech">-</strong></div></div><div class="bill-to"><span>Ditagihkan kepada</span><strong id="previewName">Nama Pelanggan</strong><p id="previewPhone">Nomor WhatsApp</p><p id="previewAddress">Alamat pelanggan</p></div><div class="invoice-table"><div class="invoice-row head"><span>Layanan</span><span>Qty</span><span>Harga</span><span>Subtotal</span></div><div id="previewItems"></div></div><div class="invoice-summary"><div><span>Subtotal</span><b id="sumSubtotal">Rp0</b></div><div><span>Diskon</span><b id="sumDiscount">Rp0</b></div><div><span>Biaya Tambahan</span><b id="sumFee">Rp0</b></div><div><span>Pajak</span><b id="sumTax">Rp0</b></div><div class="grand"><span>Total</span><b id="sumTotal">Rp0</b></div><div><span>Dibayar</span><b id="sumPaid">Rp0</b></div><div><span>Sisa Pembayaran</span><b id="sumRemaining">Rp0</b></div></div><div class="payment-pill"><span>Status Pembayaran</span><strong id="previewPayment">Belum Bayar</strong></div><p class="invoice-note">Terima kasih telah menggunakan layanan NEXORA SERVICE.</p></div><div class="invoice-actions"><button class="btn primary" id="saveInvoiceBtn"><img src="assets/icons/save.svg">Simpan Nota</button><button class="btn secondary" id="printInvoiceBtn"><img src="assets/icons/print.svg">Cetak</button><button class="btn success" id="sendInvoiceBtn"><img src="assets/icons/whatsapp.svg">Kirim Invoice</button></div></aside>
</div></section>`,
history:()=>`<section class="page">${heading('Riwayat Nota','Kelola invoice, pembayaran, dan status pengiriman WhatsApp.','<button class="btn primary" data-go="nota"><img src="assets/icons/invoice-add.svg">Buat Nota</button>')}<div class="metric-strip"><div><span>Total Nota</span><strong id="histTotal">84</strong></div><div><span>Lunas</span><strong>62</strong></div><div><span>Belum Bayar</span><strong>22</strong></div><div><span>Invoice Terkirim</span><strong>78</strong></div><div><span>Invoice Gagal</span><strong>2</strong></div></div><section class="panel"><div class="filters"><div class="filter-search"><img src="assets/icons/search.svg"><input id="invoiceSearch" placeholder="Cari no. nota, pelanggan, teknisi..."></div><select><option>Semua pembayaran</option><option>Lunas</option><option>DP</option><option>Belum Bayar</option></select><select><option>Semua status invoice</option><option>Terkirim</option><option>Gagal</option></select><button class="btn secondary"><img src="assets/icons/refresh.svg">Reset Filter</button></div><div class="table-wrap"><table><thead><tr><th>No. Nota</th><th>Tanggal</th><th>Pelanggan</th><th>WhatsApp</th><th>Teknisi</th><th>Total</th><th>Pembayaran</th><th>Status Invoice</th><th>Aksi</th></tr></thead><tbody id="invoiceHistoryRows"></tbody></table></div></section></section>`,
schedule:()=>`<section class="page">${heading('Jadwal Pekerjaan','Kelola pekerjaan terjadwal dan workflow teknisi.','<button class="btn primary" id="newScheduleBtn"><img src="assets/icons/plus.svg">Buat Jadwal</button>')}<div class="view-switch"><button class="active">Kalender</button><button>Daftar</button></div><div class="schedule-layout"><section class="panel calendar-panel"><div class="calendar-head"><button class="icon-btn"><img src="assets/icons/chevron-left.svg"></button><div><h3>Agustus 2026</h3><p>12 pekerjaan terjadwal minggu ini</p></div><button class="icon-btn"><img src="assets/icons/chevron-right.svg"></button></div><div class="calendar-grid">${calendarHtml()}</div></section><aside class="panel"><div class="panel-head"><div><h3>Hari Ini</h3><p>20 Agustus 2026</p></div></div>${jobCard('08:30','Budi Santoso','Cuci AC · Kemang','Dikerjakan','work','RA')}${jobCard('10:00','Siti Rahma','Tambah Freon · Cilandak','Berangkat','go','DP')}${jobCard('13:30','PT Mandala','Service AC · Tebet','Dijadwalkan','scheduled','AS')}</aside></div></section>`,
customers:()=>`<section class="page">${heading('Pelanggan','CRM pelanggan, unit AC, riwayat service, dan invoice.','<button class="btn primary" id="addCustomerBtn"><img src="assets/icons/plus.svg">Tambah Pelanggan</button>')}<div class="metric-strip three"><div><span>Total Pelanggan</span><strong>248</strong></div><div><span>Pelanggan Aktif</span><strong>231</strong></div><div><span>Pelanggan Baru</span><strong>12</strong></div></div><section class="panel"><div class="filters"><div class="filter-search"><img src="assets/icons/search.svg"><input placeholder="Cari pelanggan..."></div><button class="btn secondary"><img src="assets/icons/filter.svg">Filter</button></div><div class="table-wrap"><table><thead><tr><th>Nama</th><th>WhatsApp</th><th>Alamat</th><th>Unit AC</th><th>Total Kunjungan</th><th>Service Terakhir</th><th>Total Transaksi</th><th>Aksi</th></tr></thead><tbody>${customerRow('BS','Budi Santoso','CUS-001','+62 812-3456-7890','Kemang, Jakarta','3 Unit','8','20 Agu 2026','Rp4.850.000')}${customerRow('SR','Siti Rahma','CUS-002','+62 898-7654-3210','Cilandak, Jakarta','2 Unit','5','18 Agu 2026','Rp3.250.000')}${customerRow('PM','PT Mandala','CUS-018','+62 811-2200-4488','Tebet, Jakarta','12 Unit','14','15 Agu 2026','Rp18.600.000')}</tbody></table></div></section></section>`,
technicians:()=>`<section class="page">${heading('Teknisi','Kelola tim, status kerja, job hari ini, dan performa.','<button class="btn primary" id="addTechBtn"><img src="assets/icons/plus.svg">Tambah Teknisi</button>')}<div class="metric-strip four"><div><span>Total Teknisi</span><strong>10</strong></div><div><span>Aktif</span><strong>8</strong></div><div><span>Sedang Bertugas</span><strong>5</strong></div><div><span>Offline</span><strong>2</strong></div></div><div class="tech-grid">${techCard('RA','Rizky Aditya','+62 812-3344-1100','Dikerjakan','work','3','96%','2 menit lalu')}${techCard('DP','Dimas Pratama','+62 813-5522-8811','Berangkat','go','2','92%','5 menit lalu')}${techCard('AS','Andi Saputra','+62 857-8899-2200','Tiba','arrived','2','89%','7 menit lalu')}${techCard('FH','Fajar Hidayat','+62 852-4411-7733','Offline','neutral','0','91%','kemarin')}</div></section>`,
monitoring:()=>`<section class="page">${heading('Monitoring Teknisi','Lihat status teknisi sedang apa di lapangan tanpa tampilan peta.','<button class="btn secondary" id="refreshMonitor"><img src="assets/icons/refresh.svg">Refresh Status</button>')}
<div class="monitor-note"><img src="assets/icons/information.svg"><div><strong>Status operasional teknisi</strong><p>Monitoring hanya menampilkan progres pekerjaan seperti dijadwalkan, di perjalanan, tiba di lokasi, dikerjakan, selesai, atau offline.</p></div></div>

<div class="monitor-summary-grid">
  <article><span class="monitor-summary-icon"><img src="assets/icons/technician.svg"></span><div><small>Teknisi Aktif</small><strong>8</strong><em>dari 10 teknisi</em></div></article>
  <article><span class="monitor-summary-icon"><img src="assets/icons/route.svg"></span><div><small>Di Perjalanan</small><strong>2</strong><em>menuju pelanggan</em></div></article>
  <article><span class="monitor-summary-icon"><img src="assets/icons/air-conditioner.svg"></span><div><small>Sedang Dikerjakan</small><strong>3</strong><em>pekerjaan aktif</em></div></article>
  <article><span class="monitor-summary-icon"><img src="assets/icons/check.svg"></span><div><small>Selesai Hari Ini</small><strong>7</strong><em>update operasional</em></div></article>
</div>

<section class="panel monitor-status-panel">
  <div class="monitor-toolbar">
    <div class="filter-search"><img src="assets/icons/search.svg"><input id="monitorSearch" placeholder="Cari teknisi, pelanggan, atau Job ID..."></div>
    <div class="monitor-status-filters">
      <button class="active" data-monitor-filter="all">Semua</button>
      <button data-monitor-filter="Dijadwalkan">Dijadwalkan</button>
      <button data-monitor-filter="Di Perjalanan">Di Perjalanan</button>
      <button data-monitor-filter="Tiba di Lokasi">Tiba</button>
      <button data-monitor-filter="Dikerjakan">Dikerjakan</button>
      <button data-monitor-filter="Selesai">Selesai</button>
      <button data-monitor-filter="Offline">Offline</button>
    </div>
  </div>

  <div class="monitor-status-list">
    ${monitorStatusCard('RA','Rizky Aditya','Dikerjakan','work','Budi Santoso','JOB-2026-0121','Cuci AC · 2 unit','09:14','1 menit lalu',4)}
    ${monitorStatusCard('DP','Dimas Pratama','Di Perjalanan','go','Siti Rahma','JOB-2026-0124','Tambah Freon','09:47','3 menit lalu',2)}
    ${monitorStatusCard('AS','Andi Saputra','Tiba di Lokasi','arrived','PT Mandala','JOB-2026-0117','Service AC','10:05','5 menit lalu',3)}
    ${monitorStatusCard('FA','Farhan Akbar','Dijadwalkan','scheduled','CV Sejahtera','JOB-2026-0128','Pasang AC','13:30','12 menit lalu',1)}
    ${monitorStatusCard('NH','Nanda Hidayat','Selesai','success','Rudi Hartono','JOB-2026-0114','Cuci AC · 3 unit','10:32','18 menit lalu',5)}
    ${monitorStatusCard('FH','Fajar Hidayat','Offline','neutral','-','-','Tidak ada pekerjaan aktif','-','Kemarin',0)}
  </div>
</section>
</section>`,

activity:()=>`<section class="page">${heading('Aktivitas Teknisi','Lihat siapa teknisinya, pekerjaan yang dikerjakan, pelanggan, status, dan waktu setiap aktivitas.','<button class="btn secondary" id="activityFilterBtn"><img src="assets/icons/filter.svg">Filter</button>')}
<div class="activity-overview-grid">
  <article><span><img src="assets/icons/activity.svg"></span><div><small>Aktivitas Hari Ini</small><strong>28</strong><em>dari seluruh teknisi</em></div></article>
  <article><span><img src="assets/icons/route.svg"></span><div><small>Keberangkatan</small><strong>6</strong><em>teknisi menuju lokasi</em></div></article>
  <article><span><img src="assets/icons/air-conditioner.svg"></span><div><small>Pekerjaan Aktif</small><strong>3</strong><em>sedang dikerjakan</em></div></article>
  <article><span><img src="assets/icons/check.svg"></span><div><small>Selesai</small><strong>7</strong><em>hari ini</em></div></article>
</div>

<section class="panel activity-panel">
  <div class="activity-toolbar">
    <div class="filter-search"><img src="assets/icons/search.svg"><input id="activitySearch" placeholder="Cari teknisi, pelanggan, Job ID, atau aktivitas..."></div>
    <select id="activityTechFilter">
      <option value="all">Semua Teknisi</option>
      <option>Rizky Aditya</option>
      <option>Dimas Pratama</option>
      <option>Andi Saputra</option>
      <option>Nanda Hidayat</option>
    </select>
  </div>

  <div class="activity-feed" id="activityFeed">
    ${activityRecord('RA','Rizky Aditya','08:12','Pekerjaan diterima','Dijadwalkan','scheduled','Budi Santoso','JOB-2026-0121','Cuci AC · 2 unit','Rizky menerima pekerjaan baru dan jadwal service sudah masuk ke daftar tugas.','calendar')}
    ${activityRecord('RA','Rizky Aditya','08:25','Berangkat menuju pelanggan','Di Perjalanan','go','Budi Santoso','JOB-2026-0121','Cuci AC · 2 unit','Rizky memulai perjalanan menuju lokasi pelanggan untuk menjalankan pekerjaan.','route')}
    ${activityRecord('RA','Rizky Aditya','09:05','Tiba di lokasi pelanggan','Tiba di Lokasi','arrived','Budi Santoso','JOB-2026-0121','Cuci AC · 2 unit','Rizky sudah tiba di lokasi pelanggan dan pekerjaan siap dimulai.','location')}
    ${activityRecord('RA','Rizky Aditya','09:14','Pekerjaan dimulai','Dikerjakan','work','Budi Santoso','JOB-2026-0121','Cuci AC · 2 unit','Rizky mulai melakukan pencucian dan pemeriksaan dua unit AC pelanggan.','air-conditioner')}
    ${activityRecord('DP','Dimas Pratama','09:47','Berangkat menuju pelanggan','Di Perjalanan','go','Siti Rahma','JOB-2026-0124','Tambah Freon','Dimas berangkat menuju pelanggan untuk pekerjaan penambahan freon.','route')}
    ${activityRecord('AS','Andi Saputra','10:05','Tiba di lokasi pelanggan','Tiba di Lokasi','arrived','PT Mandala','JOB-2026-0117','Service AC','Andi sudah berada di lokasi PT Mandala dan menunggu konfirmasi untuk memulai service.','location')}
    ${activityRecord('NH','Nanda Hidayat','10:32','Pekerjaan selesai','Selesai','success','Rudi Hartono','JOB-2026-0114','Cuci AC · 3 unit','Nanda menyelesaikan pekerjaan dan status job telah diperbarui menjadi selesai.','check')}
  </div>
</section>
</section>`,

backup:()=>`<section class="page">${heading('Backup Data','Kelola backup, unduhan arsip, dan pemulihan data.')}<div class="backup-hero"><div><div class="eyebrow">BACKUP TERAKHIR</div><h2>20 Agustus 2026 <span>01:42 WIB</span></h2><div class="backup-stats"><div><span>Status</span><strong style="color:#2F9E67">Berhasil</strong></div><div><span>Ukuran</span><strong>18.4 MB</strong></div><div><span>Dibuat oleh</span><strong>Administrator</strong></div></div><div class="backup-actions"><button class="btn primary" id="backupNow"><img src="assets/icons/database.svg">Buat Backup Sekarang</button><button class="btn secondary"><img src="assets/icons/download.svg">Download Backup</button></div></div><div class="backup-visual"><img src="assets/icons/database.svg"></div></div><section class="panel"><div class="panel-head"><div><h3>Riwayat Backup</h3><p>Arsip backup terbaru</p></div></div><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>File</th><th>Ukuran</th><th>Status</th><th>Dibuat oleh</th><th>Aksi</th></tr></thead><tbody><tr><td>20 Agu 2026 · 01:42</td><td>nexora-backup-20260820.zip</td><td>18.4 MB</td><td>${status('Berhasil','success')}</td><td>Administrator</td><td><div class="table-actions"><button class="icon-btn small"><img src="assets/icons/download.svg"></button><button class="icon-btn small restore-btn"><img src="assets/icons/restore.svg"></button></div></td></tr><tr><td>19 Agu 2026 · 01:40</td><td>nexora-backup-20260819.zip</td><td>18.1 MB</td><td>${status('Berhasil','success')}</td><td>System</td><td><div class="table-actions"><button class="icon-btn small"><img src="assets/icons/download.svg"></button><button class="icon-btn small restore-btn"><img src="assets/icons/restore.svg"></button></div></td></tr></tbody></table></div></section></section>`,
settings:()=>`<section class="page">${heading('Pengaturan','Konfigurasi bisnis, invoice, WhatsApp, keamanan, dan aplikasi.','<button class="btn primary" id="saveSettings"><img src="assets/icons/save.svg">Simpan Perubahan</button>')}<div class="settings-layout"><aside class="settings-nav"><button class="active" data-tab="business"><img src="assets/icons/building.svg">Profil Bisnis</button><button data-tab="invoice"><img src="assets/icons/invoice-history.svg">Nota & Invoice</button><button data-tab="whatsapp"><img src="assets/icons/whatsapp.svg">WhatsApp Bot</button><button data-tab="security"><img src="assets/icons/security.svg">User & Security</button><button data-tab="app"><img src="assets/icons/settings.svg">Application</button><button data-tab="backupset"><img src="assets/icons/backup.svg">Backup</button></aside><section class="panel">
${settingView('business',true,'Profil Bisnis','Identitas yang digunakan pada aplikasi dan invoice.',`<div class="form-grid"><label class="field span-2"><span>Nama Bisnis</span><input value="NEXORA SERVICE"></label><label class="field span-2"><span>Alamat</span><textarea rows="2">Jakarta, Indonesia</textarea></label><label class="field"><span>Phone</span><input value="+62 812-0000-0000"></label><label class="field"><span>WhatsApp</span><input value="+62 812-0000-0000"></label><label class="field span-2"><span>Email</span><input value="admin@nexora.local"></label></div>`)}
${settingView('invoice',false,'Nota & Invoice','Atur penomoran, pajak, dan footer invoice.',`<div class="form-grid"><label class="field"><span>Invoice Prefix</span><input value="INV-2026-"></label><label class="field"><span>Pajak Default (%)</span><input type="number" value="0"></label><label class="field span-2"><span>Footer</span><textarea rows="3">Terima kasih telah menggunakan layanan NEXORA SERVICE.</textarea></label></div>`)}
${settingView('whatsapp',false,'WhatsApp Bot','Status koneksi dan template pesan invoice.',`<div class="security-note"><img src="assets/icons/security.svg"><p>Credential, token, API secret, dan session WhatsApp hanya tersedia pada backend server dan tidak disimpan di frontend.</p></div><label class="field"><span>Template Pesan</span><textarea id="waTemplate" rows="11">Halo Bapak/Ibu [Nama Pelanggan],

Terima kasih telah menggunakan layanan kami.

Berikut invoice service Anda:

No. Invoice: [Invoice Number]
Tanggal: [Tanggal]
Total: [Total]
Status Pembayaran: [Status]

Invoice terlampir pada pesan ini.

Terima kasih.
NEXORA SERVICE</textarea></label><div class="card-actions"><button class="btn secondary" id="testConnection"><img src="assets/icons/refresh.svg">Tes Koneksi</button><button class="btn secondary" id="testSend"><img src="assets/icons/send.svg">Tes Kirim</button></div>`)}
${settingView('security',false,'User & Security','Pengaturan akun dan sesi.',`<div class="security-list"><div><span><strong>Administrator</strong><small>Super Admin · Sesi aktif saat ini</small></span><button class="btn secondary">Kelola Akun</button></div><div><span><strong>Password</strong><small>Gunakan autentikasi backend pada production</small></span><button class="btn secondary">Ubah Password</button></div></div>`)}
${settingView('app',false,'Application','Preferensi regional dan antarmuka.',`<div class="form-grid"><label class="field"><span>Currency</span><select><option>IDR — Rupiah</option></select></label><label class="field"><span>Time Zone</span><select><option>Asia/Jakarta</option></select></label><label class="field"><span>Date Format</span><select><option>DD MMM YYYY</option></select></label><label class="field"><span>Interface</span><select><option>Light Green Premium</option></select></label></div>`)}
${settingView('backupset',false,'Backup','Konfigurasi backup aplikasi.',`<div class="security-list"><div><span><strong>Backup Otomatis</strong><small>Scaffold UI — production membutuhkan backend job.</small></span><input type="checkbox" checked></div><div><span><strong>Retensi</strong><small>Simpan 30 backup terakhir.</small></span><select><option>30 backup</option><option>60 backup</option></select></div></div>`)}
</section></div></section>`
};

function kpi(icon,label,value,sub,count){return `<article class="kpi-card reveal"><div class="kpi-icon"><img src="assets/icons/${icon}.svg"></div><span>${label}</span><strong data-count="${count}">0</strong><small class="${sub.startsWith('+')?'positive':''}">${sub}</small></article>`}
function rank(i,n,s,p){return `<div><div class="avatar">${i}</div><div><strong>${n}</strong><span>${s}</span></div><b>${p}</b></div>`}
function quick(icon,t,s,p){return `<button class="quick-card" data-go="${p}"><span class="quick-icon"><img src="assets/icons/${icon}.svg"></span><span><strong>${t}</strong><small>${s}</small></span><img src="assets/icons/chevron-right.svg"></button>`}
function miniActivity(icon,t,s,time){return `<div><span class="activity-icon"><img src="assets/icons/${icon}.svg"></span><div><strong>${t}</strong><p>${s}</p><small>${time}</small></div></div>`}
function formSection(n,t,s,body){return `<section class="panel form-section"><div class="section-title"><span class="step">${n}</span><div><h3>${t}</h3><p>${s}</p></div></div>${body}</section>`}
function calendarHtml(){const d=['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(x=>`<div class="dow">${x}</div>`);const cells=[];for(let i=27;i<=31;i++)cells.push(`<div class="day muted">${i}</div>`);for(let i=1;i<=30;i++){let extra='';if(i===4)extra='<span class="job-pill">08:30 · Cuci AC</span>';if(i===12)extra='<span class="job-pill">09:00 · Freon</span>';if(i===19)extra='<span class="job-pill">13:30 · Instalasi</span>';if(i===20)extra='<span class="job-pill strong">08:30 · Budi</span><span class="job-pill">13:30 · Mandala</span>';cells.push(`<div class="day ${i===20?'today':''}"><b>${i}</b>${extra}</div>`)}return d.join('')+cells.join('')}
function jobCard(time,name,desc,st,cls,av){return `<div class="job-card"><span class="time">${time}</span><div><strong>${name}</strong><p>${desc}</p>${status(st,cls)}</div><div class="avatar">${av}</div></div>`}
function customerRow(av,name,id,phone,address,units,visits,last,total){return `<tr><td><div class="person-cell"><div class="avatar">${av}</div><div><strong>${name}</strong><small>${id}</small></div></div></td><td>${phone}</td><td>${address}</td><td>${units}</td><td>${visits}</td><td>${last}</td><td>${total}</td><td><div class="table-actions"><button class="icon-btn small"><img src="assets/icons/eye.svg"></button><button class="icon-btn small"><img src="assets/icons/edit.svg"></button><button class="icon-btn small" data-delete="${name}"><img src="assets/icons/delete.svg"></button></div></td></tr>`}
function techCard(av,name,phone,st,cls,jobs,perf,last){return `<article class="tech-card"><div class="tech-head"><div class="avatar large">${av}</div><div><h3>${name}</h3><p>${phone}</p></div><button class="icon-btn small"><img src="assets/icons/more.svg"></button></div><div class="tech-badges">${status(st,cls)}${status('Akun Aktif','success')}</div><div class="tech-stats"><div><span>Job Hari Ini</span><strong>${jobs}</strong></div><div><span>Performa</span><strong>${perf}</strong></div><div><span>Akun</span><strong>Aktif</strong></div></div><div class="tech-foot"><img src="assets/icons/clock.svg">Aktivitas terakhir ${last}</div><div class="card-actions"><button class="btn secondary">Detail</button><button class="btn secondary" data-go="monitoring"><img src="assets/icons/location.svg">Monitoring</button></div></article>`}
function monitorTech(id,av,name,sub,live){return `<button class="monitor-tech ${id==='rizky'?'selected':''} ${live?'':'offline'}" data-tech="${id}"><div class="avatar">${av}</div><div><strong>${name}</strong><span>${sub}</span></div>${live?'<i class="live-dot"></i>':''}</button>`}
function monitorStatusCard(av,name,st,cls,customer,job,service,time,updated,stage){
  const steps=['Dijadwalkan','Di Perjalanan','Tiba','Dikerjakan','Selesai'];
  return `<article class="monitor-status-card" data-monitor-status="${esc(st)}" data-monitor-search="${esc((name+' '+customer+' '+job+' '+service+' '+st).toLowerCase())}">
    <div class="monitor-card-top">
      <div class="avatar large">${av}</div>
      <div class="monitor-person">
        <div class="monitor-person-line"><div><h3>${name}</h3><p>${job==='-'?'Tidak ada job aktif':job}</p></div>${status(st,cls)}</div>
        <div class="monitor-progress-bars">${steps.map((x,i)=>`<i class="${stage>i+1?'done':stage===i+1?'current':''}"></i>`).join('')}</div>
        <div class="monitor-progress-labels">${steps.map(x=>`<span>${x}</span>`).join('')}</div>
      </div>
    </div>
    <div class="monitor-detail-grid">
      <div><small>Pelanggan</small><strong>${customer}</strong></div>
      <div><small>Layanan</small><strong>${service}</strong></div>
      <div><small>Waktu Status</small><strong>${time}</strong></div>
      <div><small>Update Terakhir</small><strong>${updated}</strong></div>
    </div>
    <footer class="monitor-card-footer">
      <span><img src="assets/icons/activity.svg">${st==='Offline'?'Teknisi sedang tidak memiliki pekerjaan aktif':`${name} sedang berstatus ${st.toLowerCase()}`}</span>
      <button class="btn secondary" data-go="activity">Lihat Aktivitas</button>
    </footer>
  </article>`;
}

function activityRecord(av,name,time,title,st,cls,customer,job,service,description,icon){
  const search=(name+' '+title+' '+st+' '+customer+' '+job+' '+service+' '+description).toLowerCase();
  return `<article class="activity-record" data-activity-tech="${esc(name)}" data-activity-search="${esc(search)}">
    <div class="activity-time"><strong>${time}</strong><span>Hari ini</span></div>
    <div class="activity-line"><i></i></div>
    <div class="activity-content">
      <div class="activity-person-row">
        <div class="avatar">${av}</div>
        <div class="activity-person"><strong>${name}</strong><span>Teknisi Lapangan</span></div>
        ${status(st,cls)}
      </div>
      <div class="activity-event">
        <span class="activity-event-icon"><img src="assets/icons/${icon}.svg"></span>
        <div><h3>${title}</h3><p>${description}</p></div>
      </div>
      <div class="activity-meta-grid">
        <div><small>Pelanggan</small><strong>${customer}</strong></div>
        <div><small>Job ID</small><strong>${job}</strong></div>
        <div><small>Layanan</small><strong>${service}</strong></div>
      </div>
    </div>
  </article>`;
}

function timelineItem(time,title,st,cls,desc,icon,meta){return `<article><time>${time}</time><span class="timeline-dot"></span><div><div class="timeline-head"><strong>${title}</strong>${status(st,cls)}</div><p>${desc}</p><small><img src="assets/icons/${icon}.svg">${meta}</small></div></article>`}
function settingView(id,active,title,sub,body){return `<div class="setting-view ${active?'active':''}" data-setting-view="${id}"><div class="section-title"><div><h3>${title}</h3><p>${sub}</p></div></div>${body}</div>`}

function initPage(page){
  $$('[data-go]').forEach(b=>b.onclick=()=>navigate(b.dataset.go));
  $$('[data-delete]').forEach(b=>b.onclick=()=>confirmBox('Hapus data ini?',`Data ${b.dataset.delete} akan dihapus dari tampilan demo.`,'Hapus',()=>{b.closest('tr')?.remove();toast('success','Data dihapus','Tampilan demo telah diperbarui.')}));

  if(page==='dashboard')initDashboard();
  if(page==='nota')initNota();
  if(page==='history')renderHistory();
  if(page==='monitoring')initMonitoring();
  if(page==='activity')initActivity();
  if(page==='backup')initBackup();
  if(page==='settings')initSettings();

  $('#newScheduleBtn')?.addEventListener('click',()=>toast('info','Form jadwal','Form jadwal demo siap dikembangkan ke backend.'));
  $('#addCustomerBtn')?.addEventListener('click',()=>toast('info','Tambah pelanggan','Modal pelanggan dapat dihubungkan ke backend pada production.'));
  $('#addTechBtn')?.addEventListener('click',()=>toast('info','Tambah teknisi','Modal teknisi dapat dihubungkan ke backend pada production.'));
}
function initDashboard(){
  $$('[data-count]').forEach((el,i)=>animateNumber(el,Number(el.dataset.count),650+i*45));
  $$('[data-money]').forEach(el=>animateMoney(el,Number(el.dataset.money),850));
}
function animateNumber(el,target,d=700){if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=target;return}let st;function f(ts){st??=ts;const p=Math.min((ts-st)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function animateMoney(el,target,d=800){if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=rupiah(target);return}let st;function f(ts){st??=ts;const p=Math.min((ts-st)/d,1),e=1-Math.pow(1-p,3);el.textContent=rupiah(Math.round(target*e));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}

const services={'Cuci AC':85000,'Service AC':150000,'Bongkar AC':125000,'Pasang AC':250000,'Tambah Freon':175000,'Isi Freon':300000,'Perbaikan Bocor':350000,'Ganti Kapasitor':250000,'Ganti Sparepart':300000,'Instalasi Baru':650000,'Survey':100000,'Lainnya':0};
function initNota(){
  $('#serviceDate').value=new Date().toISOString().slice(0,10);
  $('#addItemBtn').onclick=()=>addServiceItem();
  $('#customerSelect').onchange=e=>{const o=e.target.selectedOptions[0];if(o?.dataset.name){$('#custName').value=o.dataset.name;$('#custPhone').value=o.dataset.phone;$('#custAddress').value=o.dataset.address;updateInvoice()}};
  ['custName','custPhone','custAddress','custCity','custLocationNote','invoiceTech','invoiceTech2','serviceDate','serviceTime','jobId','discountType','discountValue','additionalFee','taxValue','paymentStatus','paymentMethod','paidAmount','techNote'].forEach(id=>$('#'+id)?.addEventListener('input',updateInvoice));
  $('#paymentStatus').addEventListener('change',()=>{if($('#paymentStatus').value==='Lunas')$('#paidAmount').value=calc().total;updateInvoice()});
  $('#saveInvoiceBtn').onclick=saveInvoice;
  $('#printInvoiceBtn').onclick=()=>window.print();
  $('#sendInvoiceBtn').onclick=sendInvoice;
  addServiceItem('Cuci AC',2,85000);
  updateInvoice();
}
function addServiceItem(name='Cuci AC',qty=1,price=85000){
  const row=document.createElement('div');row.className='service-row';
  row.innerHTML=`<label class="service-name"><span>Jenis Service</span><select class="srv-name">${Object.keys(services).map(s=>`<option ${s===name?'selected':''}>${s}</option>`).join('')}</select></label><label><span>Unit</span><input class="srv-unit" value="unit"></label><label><span>Qty</span><input class="srv-qty" type="number" min="1" value="${qty}"></label><label><span>Harga</span><input class="srv-price" type="number" min="0" value="${price}"></label><label><span>Subtotal</span><div class="subtotal">${rupiah(qty*price)}</div></label><button class="icon-btn small delete-service" type="button" aria-label="Hapus item"><img src="assets/icons/delete.svg"></button>`;
  $('#serviceItems').append(row);
  row.querySelector('.srv-name').onchange=e=>{row.querySelector('.srv-price').value=services[e.target.value]||0;updateInvoice()};
  row.querySelector('.delete-service').onclick=()=>{row.remove();updateInvoice()};
  row.querySelectorAll('input,select').forEach(i=>i.addEventListener('input',updateInvoice));
}
function getItems(){return $$('.service-row').map(r=>{const name=r.querySelector('.srv-name').value,unit=r.querySelector('.srv-unit').value,qty=Number(r.querySelector('.srv-qty').value)||0,price=Number(r.querySelector('.srv-price').value)||0;return{name,unit,qty,price,subtotal:qty*price}})}
function calc(){const items=getItems(),subtotal=items.reduce((a,b)=>a+b.subtotal,0),dv=Number($('#discountValue')?.value)||0,dt=$('#discountType')?.value||'nominal',discount=Math.min(subtotal,dt==='percent'?subtotal*(dv/100):dv),fee=Number($('#additionalFee')?.value)||0,taxPct=Number($('#taxValue')?.value)||0,preTax=Math.max(0,subtotal-discount+fee),tax=preTax*(taxPct/100),total=preTax+tax,paid=Number($('#paidAmount')?.value)||0,remaining=Math.max(0,total-paid);return{items,subtotal,discount,fee,tax,total,paid,remaining}}
function updateInvoice(){
  if(!$('#invoicePreview'))return;const c=calc();
  $$('.service-row').forEach(r=>{const q=Number(r.querySelector('.srv-qty').value)||0,p=Number(r.querySelector('.srv-price').value)||0;r.querySelector('.subtotal').textContent=rupiah(q*p)});
  $('#previewName').textContent=$('#custName').value||'Nama Pelanggan';$('#previewPhone').textContent=$('#custPhone').value||'Nomor WhatsApp';$('#previewAddress').textContent=$('#custAddress').value||'Alamat pelanggan';
  $('#previewDate').textContent=$('#serviceDate').value?fmtDate(new Date($('#serviceDate').value+'T00:00:00')):'-';$('#previewJob').textContent=$('#jobId').value||'-';$('#previewTech').textContent=[$('#invoiceTech').value,$('#invoiceTech2').value].filter(Boolean).join(', ');
  $('#previewItems').innerHTML=c.items.length?c.items.map(i=>`<div class="invoice-row"><span>${esc(i.name)}</span><span>${i.qty}</span><span>${rupiah(i.price)}</span><span>${rupiah(i.subtotal)}</span></div>`).join(''):`<div class="invoice-row"><span>Belum ada item</span><span>-</span><span>-</span><span>-</span></div>`;
  $('#sumSubtotal').textContent=rupiah(c.subtotal);$('#sumDiscount').textContent='- '+rupiah(c.discount);$('#sumFee').textContent=rupiah(c.fee);$('#sumTax').textContent=rupiah(c.tax);$('#sumTotal').textContent=rupiah(c.total);$('#sumPaid').textContent=rupiah(c.paid);$('#sumRemaining').textContent=rupiah(c.remaining);$('#previewPayment').textContent=$('#paymentStatus').value;
}
function validateInvoice(){if(!$('#custName').value.trim())return'Nama pelanggan wajib diisi.';if(!$('#custPhone').value.trim())return'Nomor WhatsApp wajib diisi.';if(getItems().length===0)return'Tambahkan minimal satu item service.';if(getItems().some(i=>i.qty<=0))return'Qty item harus lebih dari 0.';return''}
function saveInvoice(silent=false){
  const err=validateInvoice();if(err){toast('warning','Nota belum lengkap',err);return null}
  const c=calc();state.counter++;localStorage.setItem('nexora_v2_counter',state.counter);const no=`INV-2026-${String(state.counter).padStart(4,'0')}`;
  const inv={id:crypto.randomUUID?.()||String(Date.now()),invoiceNumber:no,date:$('#serviceDate').value,customer:$('#custName').value.trim(),phone:$('#custPhone').value.trim(),address:$('#custAddress').value.trim(),technician:[$('#invoiceTech').value,$('#invoiceTech2').value].filter(Boolean).join(', '),jobId:$('#jobId').value,items:c.items,total:c.total,paid:c.paid,remaining:c.remaining,paymentStatus:$('#paymentStatus').value,paymentMethod:$('#paymentMethod').value,deliveryStatus:'Belum Dikirim',createdAt:new Date().toISOString()};
  state.invoices.unshift(inv);localStorage.setItem('nexora_v2_invoices',JSON.stringify(state.invoices));state.currentInvoiceId=inv.id;$('#previewInvNo').textContent=no;if(!silent)toast('success','Nota berhasil disimpan',`${no} tersimpan pada portfolio demo.`);return inv
}
async function sendInvoice(){
  const err=validateInvoice();if(err){toast('warning','Invoice belum siap',err);return}
  const btn=$('#sendInvoiceBtn');btn.disabled=true;btn.innerHTML='<img src="assets/icons/whatsapp.svg">Mengirim Invoice...';
  const inv=state.invoices.find(x=>x.id===state.currentInvoiceId)||saveInvoice(true);if(!inv){btn.disabled=false;return}
  let ok=false;
  try{
    const c=new AbortController(),t=setTimeout(()=>c.abort(),8000);
    try{
      const r=await fetch('/api/invoices/send-whatsapp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({invoiceId:inv.id,customerName:inv.customer,phone:inv.phone,message:`Invoice ${inv.invoiceNumber} - ${rupiah(inv.total)}`,documentUrl:''}),signal:c.signal});
      clearTimeout(t);ok=r.ok;
    }catch(e){clearTimeout(t);await new Promise(r=>setTimeout(r,650));ok=true}
    inv.deliveryStatus=ok?'Terkirim':'Gagal';localStorage.setItem('nexora_v2_invoices',JSON.stringify(state.invoices));
    if(!ok)throw new Error('Provider error');
    btn.innerHTML='<img src="assets/icons/check.svg">Invoice Terkirim';toast('success','Invoice berhasil dikirim','Demo memperagakan status sukses. Production harus memakai backend/provider WhatsApp.');
  }catch(e){
    btn.innerHTML='<img src="assets/icons/error.svg">Gagal Mengirim';toast('error','Invoice gagal dikirim','Koneksi layanan WhatsApp mengalami gangguan.');setTimeout(()=>btn.innerHTML='<img src="assets/icons/refresh.svg">Coba Lagi',900)
  }finally{setTimeout(()=>btn.disabled=false,700)}
}
function renderHistory(){
  const demo=[{invoiceNumber:'INV-2026-0084',date:'2026-08-20',customer:'CV Kencana',phone:'+62 811-2233-4455',technician:'Rizky Aditya',total:650000,paymentStatus:'Lunas',deliveryStatus:'Terkirim'},{invoiceNumber:'INV-2026-0083',date:'2026-08-19',customer:'Budi Santoso',phone:'+62 812-3456-7890',technician:'Dimas Pratama',total:425000,paymentStatus:'DP',deliveryStatus:'Terkirim'},{invoiceNumber:'INV-2026-0082',date:'2026-08-19',customer:'Siti Rahma',phone:'+62 898-7654-3210',technician:'Andi Saputra',total:300000,paymentStatus:'Belum Bayar',deliveryStatus:'Gagal'}];
  const all=[...state.invoices,...demo];$('#histTotal').textContent=84+state.invoices.length;
  $('#invoiceHistoryRows').innerHTML=all.map((x,i)=>`<tr data-search="${esc((x.invoiceNumber+' '+x.customer+' '+x.technician).toLowerCase())}"><td><strong>${esc(x.invoiceNumber)}</strong></td><td>${fmtDate(new Date(x.date+'T00:00:00'))}</td><td><strong>${esc(x.customer)}</strong></td><td>${esc(x.phone||'-')}</td><td>${esc(x.technician)}</td><td><strong>${rupiah(x.total)}</strong></td><td>${status(x.paymentStatus,x.paymentStatus==='Lunas'?'success':x.paymentStatus==='DP'?'go':'scheduled')}</td><td>${status(x.deliveryStatus,x.deliveryStatus==='Terkirim'?'success':x.deliveryStatus==='Gagal'?'danger':'scheduled')}</td><td><div class="table-actions"><button class="icon-btn small"><img src="assets/icons/eye.svg"></button><button class="icon-btn small"><img src="assets/icons/edit.svg"></button><button class="icon-btn small"><img src="assets/icons/print.svg"></button><button class="icon-btn small"><img src="assets/icons/send.svg"></button><button class="icon-btn small" data-history-delete="${i}"><img src="assets/icons/delete.svg"></button></div></td></tr>`).join('');
  $('#invoiceSearch').oninput=e=>{$$('#invoiceHistoryRows tr').forEach(r=>r.hidden=!r.dataset.search.includes(e.target.value.toLowerCase()))};
  $$('[data-history-delete]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.historyDelete);confirmBox('Hapus invoice?','Invoice akan dihapus dari riwayat demo ini.','Hapus',()=>{if(i<state.invoices.length){state.invoices.splice(i,1);localStorage.setItem('nexora_v2_invoices',JSON.stringify(state.invoices))}renderHistory();toast('success','Invoice dihapus','Riwayat demo diperbarui.')})});
}
function initMonitoring(){
  const cards=$$('.monitor-status-card');
  const search=$('#monitorSearch');
  let activeFilter='all';

  function applyMonitorFilters(){
    const q=(search?.value||'').trim().toLowerCase();
    cards.forEach(card=>{
      const filterMatch=activeFilter==='all'||card.dataset.monitorStatus===activeFilter;
      const searchMatch=!q||(card.dataset.monitorSearch||'').includes(q);
      card.hidden=!(filterMatch&&searchMatch);
    });
  }

  search?.addEventListener('input',applyMonitorFilters);

  $$('[data-monitor-filter]').forEach(btn=>{
    btn.onclick=()=>{
      $$('[data-monitor-filter]').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      activeFilter=btn.dataset.monitorFilter;
      applyMonitorFilters();
    };
  });

  $('#refreshMonitor').onclick=()=>{
    const b=$('#refreshMonitor');
    b.disabled=true;
    b.innerHTML='<img src="assets/icons/refresh.svg">Memperbarui...';
    setTimeout(()=>{
      b.disabled=false;
      b.innerHTML='<img src="assets/icons/check.svg">Status Diperbarui';
      toast('success','Monitoring diperbarui','Status teknisi lapangan berhasil diperbarui pada demo.');
      setTimeout(()=>b.innerHTML='<img src="assets/icons/refresh.svg">Refresh Status',900);
    },650);
  };
}

function initActivity(){
  const records=$$('.activity-record');
  const search=$('#activitySearch');
  const tech=$('#activityTechFilter');

  function applyActivityFilters(){
    const q=(search?.value||'').trim().toLowerCase();
    const selected=tech?.value||'all';
    records.forEach(record=>{
      const searchMatch=!q||(record.dataset.activitySearch||'').includes(q);
      const techMatch=selected==='all'||record.dataset.activityTech===selected;
      record.hidden=!(searchMatch&&techMatch);
    });
  }

  search?.addEventListener('input',applyActivityFilters);
  tech?.addEventListener('change',applyActivityFilters);
  $('#activityFilterBtn')?.addEventListener('click',()=>search?.focus());
}

function initBackup(){
  $('#backupNow').onclick=()=>{const b=$('#backupNow');b.disabled=true;b.innerHTML='<img src="assets/icons/database.svg">Membuat Backup...';setTimeout(()=>{b.disabled=false;b.innerHTML='<img src="assets/icons/check.svg">Backup Berhasil';toast('success','Backup selesai','Backup demo berhasil dibuat.');setTimeout(()=>b.innerHTML='<img src="assets/icons/database.svg">Buat Backup Sekarang',1100)},800)};
  $$('.restore-btn').forEach(b=>b.onclick=()=>confirmBox('Pulihkan backup ini?','Data aplikasi saat ini dapat berubah setelah proses restore. Pastikan backup yang dipilih sudah benar.','Pulihkan Backup',()=>toast('success','Restore demo dijalankan','Production harus memproses restore melalui backend.')));
}
function initSettings(){
  $$('.settings-nav button').forEach(b=>b.onclick=()=>{$$('.settings-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.setting-view').forEach(v=>v.classList.toggle('active',v.dataset.settingView===b.dataset.tab))});
  $('#saveSettings').onclick=()=>toast('success','Pengaturan disimpan','Preferensi demo telah diperbarui.');
  $('#testConnection')?.addEventListener('click',()=>toast('success','Koneksi WhatsApp berhasil','Demo koneksi berhasil. Production membutuhkan credential server.'));
  $('#testSend')?.addEventListener('click',()=>toast('info','Tes kirim dijalankan','Demo tidak mengekspos credential di frontend.'));
}

function globalClick(e){
  const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go);return}
  const c=e.target.closest('[data-close]');if(c){closeModal(c.dataset.close);return}
}
function hotkeys(e){
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
  if(e.key==='Escape'){$$('.modal.open').forEach(m=>m.classList.remove('open'));drawer(false)}
}
function openSearch(){$('#searchModal').classList.add('open');$('#searchModal').setAttribute('aria-hidden','false');setTimeout(()=>$('#globalSearchInput').focus(),50);renderSearch()}
function closeModal(id){const m=$('#'+id);m.classList.remove('open');m.setAttribute('aria-hidden','true')}
function renderSearch(){
  const q=($('#globalSearchInput').value||'').toLowerCase(),groups=[['Pelanggan',['Budi Santoso — Kemang','Siti Rahma — Cilandak','PT Mandala — Tebet']],['Invoice',['INV-2026-0084 — CV Kencana','INV-2026-0083 — Budi Santoso','INV-2026-0082 — Siti Rahma']],['Pekerjaan',['JOB-2026-0121 — Cuci AC','JOB-2026-0124 — Tambah Freon']],['Teknisi',['Rizky Aditya — Dikerjakan','Dimas Pratama — Berangkat','Andi Saputra — Tiba']]];
  $('#globalSearchResults').innerHTML=groups.map(([g,a])=>{const m=a.filter(x=>x.toLowerCase().includes(q));return m.length?`<div class="search-group"><span>${g}</span>${m.map(x=>`<div class="search-result"><div><strong>${esc(x.split(' — ')[0])}</strong><small>${esc(x.split(' — ')[1]||'')}</small></div><img src="assets/icons/chevron-right.svg" width="13"></div>`).join('')}</div>`:''}).join('')||'<div class="search-group"><span>Tidak ada hasil</span></div>';
}
function confirmBox(title,text,label,action){$('#confirmTitle').textContent=title;$('#confirmText').textContent=text;$('#confirmAction').textContent=label;state.confirmAction=action;$('#confirmAction').onclick=()=>{closeModal('confirmModal');state.confirmAction?.();state.confirmAction=null};$('#confirmModal').classList.add('open');$('#confirmModal').setAttribute('aria-hidden','false')}
function toast(type,title,desc){const icon={success:'check',info:'information',warning:'warning',error:'error'}[type]||'information',t=document.createElement('div');t.className='toast';t.innerHTML=`<div class="toast-icon"><img src="assets/icons/${icon}.svg"></div><div><strong>${esc(title)}</strong><p>${esc(desc)}</p></div>`;$('#toastHost').append(t);setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(8px)';setTimeout(()=>t.remove(),220)},3200)}
function loginParallax(){const v=$('#loginVisual'),p=$('#previewWindow');if(!v||matchMedia('(pointer:coarse)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let rx=0,ry=0,raf=0;v.addEventListener('pointermove',e=>{const r=v.getBoundingClientRect();rx=(e.clientX-r.left)/r.width-.5;ry=(e.clientY-r.top)/r.height-.5;if(!raf)raf=requestAnimationFrame(()=>{p.style.translate=`${rx*5}px ${ry*4}px`;$$('.floating-card',v).forEach((c,i)=>c.style.translate=`${rx*(4+i)}px ${ry*(4+i)}px`);raf=0})});v.addEventListener('pointerleave',()=>{p.style.translate='';$$('.floating-card',v).forEach(c=>c.style.translate='')})}
