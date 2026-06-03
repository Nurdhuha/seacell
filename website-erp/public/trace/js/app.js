/* JavaScript Controller - QR Traceability Page (Samudra Ecosystem Style) */

// Mock Database of Seaweed Batches (Synced with ERP StateContext.jsx)
const BATCH_DATABASE = {
    'BATCH-20260520-001': {
        id: 'BATCH-20260520-001',
        tanggalTanam: '2026-04-10',
        tanggalPanen: '2026-05-20',
        pupuk: 'NPK Kelp-Boost (Organik)',
        iceIce: false,
        beratBasah: 100,
        beratKering: 69,
        kadarAir: 31.0,
        grade: 'GRADE A',
        suhuPengering: 38.5,
        location: {
            name: 'Pesisir Pantai Nusa Penida, Bali',
            coords: '-8.6732, 115.4389'
        },
        description: 'Rumput laut premium Nusa Penida. Pengeringan mekanis terkendali meminimalkan pertumbuhan bakteri dan menjaga warna hijau laut tetap cerah alami.',
        timeline: [
            { title: 'Tebar Bibit Unggul', date: '10 Apr 2026', desc: 'Metode pra-tanam organik di Nusa Penida menggunakan tali bentang 50m. Bibit sehat tanpa hama.' },
            { title: 'Monitoring & Perawatan', date: '25 Apr 2026', desc: 'Pemantauan suhu air laut rata-rata 27.8°C, nutrisi Kelp-Boost diserap optimal, tidak terdeteksi gejala penyakit.' },
            { title: 'Panen Raya Pesisir', date: '20 Mei 2026', desc: 'Kondisi panen prima pada pagi hari. Rumput laut disortir manual, dicuci air bersih.' },
            { title: 'Drying & QC Batching', date: '20 Mei 2026', desc: 'Pengeringan terkontrol di Solar Dome pada suhu 38.5°C hingga kadar air mengunci tepat di 31.0%.' }
        ],
        carouselImages: [
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%230A4D68"/><circle cx="240" cy="135" r="80" fill="%23088395" opacity="0.3"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Solar Dome Dryer - Samudra</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%230EA5E9" text-anchor="middle">Proses Pengeringan Higienis Bebas Debu Jalanan</text></svg>',
                caption: 'Pengeringan higienis di dalam Solar Dome mekanis'
            },
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%23088395"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Hasil Panen Premium - Grade A</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%23FAF8F5" text-anchor="middle">Kadar air 31.0% teruji gravimetri presisi</text></svg>',
                caption: 'Kualitas rumput laut Grade A premium kering siap packing'
            }
        ]
    },
    'BATCH-20260522-002': {
        id: 'BATCH-20260522-002',
        tanggalTanam: '2026-04-12',
        tanggalPanen: '2026-05-22',
        pupuk: 'Urea Prima-Grow',
        iceIce: false,
        beratBasah: 150,
        beratKering: 100,
        kadarAir: 33.3,
        grade: 'GRADE B',
        suhuPengering: 39.0,
        location: {
            name: 'Teluk Sanur, Denpasar',
            coords: '-8.6811, 115.2638'
        },
        description: 'Rumput laut berkualitas tinggi dari Pantai Sanur. Sangat cocok sebagai bahan baku industri agar-agar dengan hasil gelasi yang kokoh.',
        timeline: [
            { title: 'Penyemaian Bibit Tali', date: '12 Apr 2026', desc: 'Bibit unggul diikat pada tali nilon metode rakit apung di perairan pasang surut Sanur.' },
            { title: 'Monitoring Kualitas Air', date: '01 Mei 2026', desc: 'Pemantauan berkala salinitas air laut stabil 32 ppt. Bebas polusi limbah industri pantai.' },
            { title: 'Pemanenan & Sortasi', date: '22 Mei 2026', desc: 'Panen dilakukan siang hari, pembersihan serpihan karang dan rumput liar.' },
            { title: 'Solar Dehydration', date: '22 Mei 2026', desc: 'Pengeringan bertahap dengan kontrol suhu 39.0°C hingga kadar air berada di batas 33.3%.' }
        ],
        carouselImages: [
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%230A4D68"/><circle cx="240" cy="135" r="80" fill="%23088395" opacity="0.3"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Solar Dome Dryer - Sanur</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%230EA5E9" text-anchor="middle">Pengeringan tertutup menjamin standar sanitasi internasional</text></svg>',
                caption: 'Sarana Solar Dome higienis modern milik koperasi'
            },
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%23088395"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Standar Grade B Teruji</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%23FAF8F5" text-anchor="middle">Sangat ideal untuk pengolahan ekstraksi gelasi pangan</text></svg>',
                caption: 'Kondisi fisik rumput laut kering siap kirim'
            }
        ]
    },
    'BATCH-20260525-003': {
        id: 'BATCH-20260525-003',
        tanggalTanam: '2026-04-15',
        tanggalPanen: '2026-05-25',
        pupuk: 'Kompos Pesisir Subur',
        iceIce: true,
        beratBasah: 80,
        beratKering: 50,
        kadarAir: 37.5,
        grade: 'REJECT',
        suhuPengering: 42.0,
        location: {
            name: 'Pesisir Pantai Pandawa, Badung',
            coords: '-8.8450, 115.1861'
        },
        description: 'Status panen berada di tingkat toleransi bawah akibat paparan patogen musiman di perairan sekitar Pandawa.',
        timeline: [
            { title: 'Tanam Tali Gantung', date: '15 Apr 2026', desc: 'Penanaman bibit rumput laut di perairan Pantai Pandawa selatan.' },
            { title: 'Terdeteksi Ice-Ice', date: '10 Mei 2026', desc: 'Kondisi air laut memanas (30°C). Ujung rumput laut mulai memutih dan rapuh (Waspada Wabah).' },
            { title: 'Panen Mitigasi Darurat', date: '25 Mei 2026', desc: 'Panen dilakukan lebih awal guna menghindari pembusukan massal di laut.' },
            { title: 'Pengeringan Maksimal', date: '25 Mei 2026', desc: 'Proses pengeringan ekstra panas suhu 42°C. Hasil akhir kadar air 37.5%.' }
        ],
        carouselImages: [
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%23F43F5E" opacity="0.85"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Pemeriksaan Laboratorium</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%23FAF8F5" text-anchor="middle">Terdeteksi degradasi patogen es-es (ice-ice)</text></svg>',
                caption: 'Laboratorium Koperasi mengonfirmasi gejala ice-ice'
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const batchId = urlParams.get('batch') || urlParams.get('id');

    const loadingView = document.getElementById('loading-view');
    const errorView = document.getElementById('error-view');
    const mainView = document.getElementById('main-view');

    // Simulate small smooth loading delay (300ms) for high-end web experience
    setTimeout(() => {
        loadingView.style.display = 'none';

        // Check Local Storage (if shared domain with website-erp)
        let batchData = null;
        try {
            const localData = localStorage.getItem('website_erp_rumput_laut_data_react');
            if (localData) {
                const parsed = JSON.parse(localData);
                const matched = parsed.find(b => b.id === batchId);
                if (matched) {
                    batchData = formatLocalBatchData(matched);
                }
            }
        } catch (e) {
            console.warn('Could not read from shared localStorage:', e);
        }

        // Fallback to static mockup database
        if (!batchData && batchId) {
            batchData = BATCH_DATABASE[batchId];
        }

        // Default layout fallback (BATCH #1) if scanned without params
        if (!batchData) {
            if (!batchId) {
                batchData = BATCH_DATABASE['BATCH-20260520-001'];
            } else {
                // Show Error View if ID is invalid
                errorView.style.display = 'flex';
                document.getElementById('error-message').innerText = `Batch ID "${batchId}" tidak ditemukan di server Koperasi Samudra.`;
                return;
            }
        }

        // Render Data to DOM
        renderBatchData(batchData);
        mainView.style.display = 'block';

        // Trigger animations (e.g. moisture progress bar)
        setTimeout(() => {
            const fillElement = document.getElementById('moisture-fill');
            if (fillElement) {
                fillElement.style.width = `${batchData.kadarAir}%`;
            }
        }, 100);

        // Initialize Carousel controls
        initCarousel();
    }, 450);
}

// Map localStorage database structure to full presentation structure
function formatLocalBatchData(raw) {
    const defaultCoords = {
        'GRADE A': { name: 'Pesisir Pantai Nusa Penida, Bali', coords: '-8.6732, 115.4389' },
        'GRADE B': { name: 'Teluk Sanur, Denpasar', coords: '-8.6811, 115.2638' },
        'REJECT': { name: 'Pesisir Pantai Pandawa, Badung', coords: '-8.8450, 115.1861' }
    };
    
    const gradeKey = raw.grade.toUpperCase();
    const loc = defaultCoords[gradeKey] || defaultCoords['GRADE A'];
    
    return {
        id: raw.id,
        tanggalTanam: raw.tanggalTanam,
        tanggalPanen: raw.tanggalPanen,
        pupuk: raw.pupuk || 'Nutrisi Organik Samudra',
        iceIce: raw.iceIce,
        beratBasah: raw.beratBasah,
        beratKering: raw.beratKering,
        kadarAir: raw.kadarAir,
        grade: raw.grade,
        suhuPengering: raw.suhuPengering || 38.0,
        location: loc,
        description: `Hasil panen rumput laut budidaya Koperasi Samudra dengan metode berkelanjutan. Teruji higienis dengan sistem pengeringan mekanis ${raw.suhuPengering || 38.0}°C.`,
        timeline: [
            { title: 'Tebar Bibit Mula', date: formatDate(raw.tanggalTanam), desc: `Pemasangan tali bentang menggunakan pupuk ${raw.pupuk || 'organik'} untuk imun bibit.` },
            { title: 'Monitoring Kualitas Air', date: 'Tengah Siklus', desc: 'Pemantauan salinitas dan pH air laut stabil, pengawasan dari tim budidaya Koperasi.' },
            { title: 'Pemanenan Panen', date: formatDate(raw.tanggalPanen), desc: `Panen batch seberat ${raw.beratBasah} kg disortir manual untuk jaminan mutu.` },
            { title: 'Pengeringan & QC Kunci', date: formatDate(raw.tanggalPanen), desc: `Pengeringan mekanis terkontrol pada suhu ${raw.suhuPengering || 38.0}°C mengunci kadar air di ${raw.kadarAir}%.` }
        ],
        carouselImages: [
            {
                url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270"><rect width="480" height="270" fill="%230A4D68"/><circle cx="240" cy="135" r="80" fill="%23088395" opacity="0.3"/><text x="50%25" y="45%25" font-family="sans-serif" font-weight="bold" font-size="18" fill="white" text-anchor="middle">Solar Dome Dryer - Samudra</text><text x="50%25" y="60%25" font-family="sans-serif" font-size="12" fill="%230EA5E9" text-anchor="middle">Proses Pengeringan Higienis Bebas Debu Jalanan</text></svg>',
                caption: 'Proses pengeringan terkontrol di Solar Dome mekanis'
            }
        ]
    };
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const day = parseInt(parts[2]);
    const month = months[parseInt(parts[1]) - 1];
    const year = parts[0];
    return `${day} ${month} ${year}`;
}

function renderBatchData(data) {
    // Basic Details
    document.getElementById('batch-id-title').innerText = data.id;
    document.getElementById('batch-id-subtitle').innerText = data.id;
    document.getElementById('product-desc').innerText = data.description;
    
    // Status Badges
    const gradeBadge = document.getElementById('badge-grade');
    gradeBadge.innerText = `${data.grade} - PREMIUM QUALITY`;
    gradeBadge.className = 'badge-grade'; // reset
    if (data.grade.includes('A')) {
        gradeBadge.classList.add('grade-a');
        gradeBadge.innerText = 'GRADE A - PREMIUM QUALITY';
    } else if (data.grade.includes('B')) {
        gradeBadge.classList.add('grade-b');
        gradeBadge.innerText = 'GRADE B - MEDIUM QUALITY';
    } else {
        gradeBadge.classList.add('reject');
        gradeBadge.innerText = 'QC REJECT - STANDAR RENDAH';
    }

    // Moisture Detail
    document.getElementById('moisture-val').innerText = `${data.kadarAir}%`;

    // Timeline Rendering
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = '';
    data.timeline.forEach((item, index) => {
        const activeClass = index === data.timeline.length - 1 ? 'active' : '';
        const itemHtml = `
            <div class="timeline-item">
                <div class="timeline-dot ${activeClass}"></div>
                <div class="timeline-header">
                    <span class="timeline-title">${item.title}</span>
                    <span class="timeline-date">${item.date}</span>
                </div>
                <p class="timeline-desc">${item.desc}</p>
            </div>
        `;
        timelineContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Map Render
    document.getElementById('map-name').innerText = data.location.name;
    document.getElementById('map-coords').innerText = data.location.coords;
    
    // Carousel Render
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselDots = document.getElementById('carousel-dots');
    carouselSlides.innerHTML = '';
    carouselDots.innerHTML = '';

    data.carouselImages.forEach((img, index) => {
        const activeClass = index === 0 ? 'active' : '';
        
        // Slide
        const slideHtml = `
            <div class="carousel-slide ${activeClass}">
                <img src="${img.url}" class="carousel-img" alt="Drying process">
                <div class="carousel-caption">${img.caption}</div>
            </div>
        `;
        carouselSlides.insertAdjacentHTML('beforeend', slideHtml);

        // Dot
        const dotHtml = `<span class="carousel-dot ${activeClass}" data-slide="${index}"></span>`;
        carouselDots.insertAdjacentHTML('beforeend', dotHtml);
    });

    // Technical Metrics Grid
    document.getElementById('metric-tanam').innerText = formatDate(data.tanggalTanam);
    document.getElementById('metric-panen').innerText = formatDate(data.tanggalPanen);
    document.getElementById('metric-suhu').innerText = `${data.suhuPengering}°C`;
    document.getElementById('metric-pupuk').innerText = data.pupuk.split(' ')[0]; // Ambil nama pupuk utama

    // WhatsApp Action FAB Link
    const waLink = document.getElementById('whatsapp-fab');
    const waMessage = encodeURIComponent(`Halo Koperasi Samudra, saya adalah pembeli industri B2B tertarik mengajukan penawaran kontrak dagang untuk produk Batch berkualitas Anda: ${data.id}. Mohon lampirkan sertifikat analisanya.`);
    waLink.href = `https://wa.me/6281234567890?text=${waMessage}`;
}

// Carousel Interactions
let currentSlide = 0;
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (slides.length <= 1) {
        // Hide navigation button if only 1 image
        const prevBtn = document.querySelector('.carousel-nav-btn.prev');
        const nextBtn = document.querySelector('.carousel-nav-btn.next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let rotateInterval = null;

    function startAutoRotate() {
        if (rotateInterval) clearInterval(rotateInterval);
        rotateInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach((s, idx) => {
            if (idx === currentSlide) s.classList.add('active');
            else s.classList.remove('active');
        });

        dots.forEach((d, idx) => {
            if (idx === currentSlide) d.classList.add('active');
            else d.classList.remove('active');
        });
    }

    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    const nextBtn = document.querySelector('.carousel-nav-btn.next');

    if (prevBtn) {
        prevBtn.onclick = () => {
            showSlide(currentSlide - 1);
            startAutoRotate();
        };
    }
    if (nextBtn) {
        nextBtn.onclick = () => {
            showSlide(currentSlide + 1);
            startAutoRotate();
        };
    }

    dots.forEach((dot, idx) => {
        dot.onclick = () => {
            showSlide(idx);
            startAutoRotate();
        };
    });

    // Start initial rotation
    startAutoRotate();
}
