/**
 * Wedding Affairs 2.0 - High Conversion & Luxury Interactive Engine
 */

// --- Global States ---
let currentLang = 'bn'; // Default to Bangla for authentic local resonance, toggleable to English
let currentTheme = 'dark';
let isAudioPlaying = false;
let audioCtx = null;
let audioTimer = null;
let currentLightboxIndex = 0;

// --- Gallery Dataset with authentic Rangpur & Bengali Wedding Assets ---
const galleryItems = [
  {
    id: 1,
    category: 'wedding',
    titleBn: 'পবিত্র তাজহাট রাজবাড়ীতে রাজকীয় কাপল রোমান্স',
    titleEn: 'Royal Couple Romance at Historic Tajhat Palace',
    coupleBn: 'ফারহান ও তাহমিনা',
    coupleEn: 'Farhan & Tahmina',
    venueBn: 'তাজহাট জমিদার বাড়ি, রংপুর',
    venueEn: 'Tajhat Palace, Rangpur',
    img: 'images/tajhat-romance.jpg',
    aspect: 'tall'
  },
  {
    id: 2,
    category: 'portraits',
    titleBn: 'রক্তিম বেনারসি ও রাজকীয় বাঙালি বধূর রূপ',
    titleEn: 'Regal Crimson Benarasi Elegance',
    coupleBn: 'ডা. জারিন তাসনিম',
    coupleEn: 'Dr. Zarin Tasnim',
    venueBn: 'লাক্সারি ব্রাইডাল স্যুট, রংপুর',
    venueEn: 'Luxury Bridal Suite, Rangpur',
    img: 'https://images.unsplash.com/photo-1742891595950-96c823c7f066?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 3,
    category: 'wedding',
    titleBn: 'পবিত্র নিকাহ ও শুভ পরিণয় মুহূর্ত',
    titleEn: 'Sacred Promises & Ring Exchange (Nikah Ceremony)',
    coupleBn: 'শাহরিয়ার ও মালিহা',
    coupleEn: 'Shahriar & Maliha',
    venueBn: 'কেরামতিয়া হেরিটেজ, রংপুর',
    venueEn: 'Keramotia Heritage, Rangpur',
    img: 'images/nikah-ceremony.jpg',
    aspect: 'square'
  },
  {
    id: 4,
    category: 'reception',
    titleBn: 'আলোর ঝলকানিতে গ্র্যান্ড ওয়ালিমা রিসেপশন',
    titleEn: 'Grand Royal Walima Reception',
    coupleBn: 'আয়মান ও জারিনা',
    coupleEn: 'Ayman & Zarina',
    venueBn: 'গ্র্যান্ড প্যালেস কনভেনশন সেন্টার, রংপুর',
    venueEn: 'Grand Palace Convention Center, Rangpur',
    img: 'images/walima-reception.jpg',
    aspect: 'wide'
  },
  {
    id: 5,
    category: 'holud',
    titleBn: 'সুরভী উদ্যানে ক্যান্ডিড প্রেমের গল্প',
    titleEn: 'Candid Love Story at Surabhi Garden',
    coupleBn: 'সোহাগ ও সানজিদা',
    coupleEn: 'Sohag & Sanjida',
    venueBn: 'সুরভী উদ্যান, রংপুর',
    venueEn: 'Surabhi Garden, Rangpur',
    img: 'images/surabhi-romance.jpg',
    aspect: 'wide'
  },
  {
    id: 6,
    category: 'portraits',
    titleBn: 'চিকলি ওয়াটার পার্কের লেকসাইড রোমান্টিক ফ্রেম',
    titleEn: 'Romantic Lakeside Twilight at Chikli',
    coupleBn: 'রাকিব ও নুসরাত',
    coupleEn: 'Rakib & Nusrat',
    venueBn: 'চিকলি ওয়াটার পার্ক, রংপুর',
    venueEn: 'Chikli Water Park, Rangpur',
    img: 'images/chikli-romance.jpg',
    aspect: 'tall'
  }
];

// --- Translations Dataset ---
const i18n = {
  bn: {
    navHome: 'হোম',
    navMatcher: 'প্যাকেজ ম্যাচমেকার',
    navPackages: 'প্যাকেজসমূহ',
    navColorGrade: 'সিনে কালার গ্রেড',
    navCalculator: 'কস্ট ক্যালকুলেটর',
    navPortfolio: 'গ্যালারি',
    navContact: 'যোগাযোগ',
    bookDateBtn: 'বুকিং করুন',
    heroBadge: '✨ রংপুর ও সমগ্র বাংলাদেশে প্রিমিয়াম ওয়েডিং সিনেমাটোগ্রাফি',
    heroTitle: 'ভালোবাসার প্রতিটি মুহূর্ত হোক অমর চলচ্চিত্রের মতো রাজকীয়',
    heroSubtitle: 'ওয়েডিং অ্যাফেয়ার্স (Wedding Affairs) সাধারণ ছবি তোলে না; প্রতিটি বিয়েতে তৈরি করে এক একটি রাজকীয় মাস্টারপিস চলচ্চিত্র। স্বচ্ছ প্যাকেজ, আধুনিক সিনেমা ক্যামেরা ও ডেডিকেটেড ক্রু।',
    matchBtn: '⚡ ৩০ সেকেন্ডে প্যাকেজ খুঁজুন',
    explorePkgsBtn: '👑 প্যাকেজসমূহ ও অফার',
    watchShowreelBtn: '▶️ ৪K সিনেমাটিক শোরিল',
    quickCall: 'সরাসরি কল',
    quickWhatsapp: 'হোয়াটসঅ্যাপ চ্যাট',
    quickBook: 'দ্রুত বুকিং',
    quickCalc: 'খরচ ক্যালকুলেটর'
  },
  en: {
    navHome: 'Home',
    navMatcher: 'Package Matcher',
    navPackages: 'Packages',
    navColorGrade: 'Color Grade Demo',
    navCalculator: 'Cost Calculator',
    navPortfolio: 'Gallery',
    navContact: 'Contact',
    bookDateBtn: 'Book Now',
    heroBadge: '✨ Premier Wedding Cinematography in Rangpur & Nationwide',
    heroTitle: 'Transforming Your Sacred Vows into Cinematic Royalty',
    heroSubtitle: 'Wedding Affairs crafts heirloom wedding films and regal portraits. Sony Cinema FX Series, licensed 4K aerial drones, and handcrafted leather storybooks.',
    matchBtn: '⚡ Find My Package (30s)',
    explorePkgsBtn: '👑 Explore Packages',
    watchShowreelBtn: '▶️ Watch 4K Showreel',
    quickCall: 'Call Studio',
    quickWhatsapp: 'WhatsApp Chat',
    quickBook: 'Instant Booking',
    quickCalc: 'Cost Calculator'
  }
};

// ==========================================
// 1. SMART PACKAGE MATCHMAKER WIZARD
// ==========================================
let matchState = {
  days: '2',
  serviceType: 'combo',
  budget: 'royal'
};

function selectMatchOption(key, value, elem) {
  matchState[key] = value;
  
  // Update button visual states
  const parent = elem.closest('.matcher-step-options');
  if (parent) {
    parent.querySelectorAll('.match-option-btn').forEach(btn => {
      btn.classList.remove('bg-amber-400', 'text-black', 'border-amber-400', 'font-bold');
      btn.classList.add('bg-stone-900/80', 'text-stone-300', 'border-stone-700');
    });
    elem.classList.remove('bg-stone-900/80', 'text-stone-300', 'border-stone-700');
    elem.classList.add('bg-amber-400', 'text-black', 'border-amber-400', 'font-bold');
  }

  calculateBestPackage();
}

function calculateBestPackage() {
  const resultCard = document.getElementById('matcher-result-card');
  const resultName = document.getElementById('matcher-pkg-name');
  const resultPrice = document.getElementById('matcher-pkg-price');
  const resultDays = document.getElementById('matcher-pkg-days');
  const resultFeatures = document.getElementById('matcher-pkg-features');
  const bookBtn = document.getElementById('matcher-book-btn');

  let recommendation = {
    name: 'The Golden Royale (রয়্যাল হেরিটেজ)',
    price: '৳ ৭৫,০০০',
    days: '২ দিন আনলিমিটেড সময় কাভারেজ (হলুদ + বিয়ে)',
    features: [
      '৩ জন সিনিয়র এক্সক্লুসিভ ফটোগ্রাফার + ২ জন 4K সিনেমাটোগ্রাফার',
      '🎁 বোনাস: লাইসেন্সড 4K ড্রোন কাভারেজ সম্পূর্ণ ফ্রি!',
      '🎁 বোনাস: ১টি প্রিমিয়াম লেদার-বাউন্ড ফ্ল্যাশ মাউন্ট অ্যালবাম (১২x২৪ ইঞ্চি)',
      '৫-৭ মিনিটের সিনেমাটিক হাইলাইট ট্রেলার + ফুল মুভি + সোশ্যাল রিলস'
    ],
    pkgCode: 'The Golden Royale (২ দিন - ৳75,000)'
  };

  // Logic tree
  if (matchState.days === '3' || matchState.budget === 'vip') {
    recommendation = {
      name: 'The Imperial Crown (৩ দিনের পূর্ণাঙ্গ রাজকীয়)',
      price: '৳ ১,৩৫,০০০',
      days: '৩ দিন সম্পূর্ণ আনলিমিটেড কাভারেজ (হলুদ, বিয়ে ও বৌভাত)',
      features: [
        'চিফ ডিরেক্টর সহ ৮ সদস্যের মেগা প্রোডাকশন টিম',
        '🎁 বোনাস: সেম ডে এডিট (Same Day Edit) ভিডিও টিজার (অনুষ্ঠানের দিনই প্রদর্শন!)',
        '🎁 বোনাস: অতিথিদের জন্য ইনস্ট্যান্ট লাইভ ফটো ম্যাগনেট প্রিন্ট বুথ (১০০টি প্রিন্ট)',
        '4K ড্রোন ও সিনেমা ক্রেন + ২টি প্রিমিয়াম ইতালিয়ান হ্যান্ডক্রাফটেড ফটো অ্যালবাম'
      ],
      pkgCode: 'The Imperial Crown (৩ দিন - ৳135,000)'
    };
  } else if (matchState.days === '1') {
    if (matchState.serviceType === 'photo') {
      recommendation = {
        name: 'Package A: Classic Aura (ফটোগ্রাফি স্পেশাল)',
        price: '৳ ৪,৯৯৯',
        days: '১ দিন (৫ ঘণ্টা কাভারেজ • ডে অথবা নাইট শিফট)',
        features: [
          '১ জন সিনিয়র এক্সক্লুসিভ ফটোগ্রাফার',
          'আনলিমিটেড ফটোশুট + ৫০টি স্পেশালি রিটাচ করা ছবি',
          'সমস্ত ছবির নিখুঁত কালার কারেকশন',
          '৭ কার্যদিবসের মধ্যে দ্রুত ডেলিভারি'
        ],
        pkgCode: 'Package A: Classic Aura (৳4,999)'
      };
    } else if (matchState.serviceType === 'cinema') {
      recommendation = {
        name: 'Package B: Cinematic Glance (ভিডিও স্পেশাল)',
        price: '৳ ৪,৯৯৯',
        days: '১ দিন (৫ ঘণ্টা কাভারেজ • ডে অথবা নাইট শিফট)',
        features: [
          '১ জন সিনিয়র সিনেমাটোগ্রাফার + ১ জন লাইটম্যান',
          '২-৩ মিনিটের রোমান্টিক সিনেমাটিক ট্রেলার',
          'সম্পূর্ণ ইভেন্টের ফুল এইচডি ভিডিও ফুটেজ',
          'পেশাদার হ্যালোজেন লাইটিং সেটআপ'
        ],
        pkgCode: 'Package B: Cinematic Glance (৳4,999)'
      };
    } else if (matchState.budget === 'standard' || matchState.budget === 'royal') {
      recommendation = {
        name: 'Package D: Elegance Premium (ডাবল ফটো + সিনেমা)',
        price: '৳ ১৫,৯৯৯',
        days: '১ দিন (৫ ঘণ্টা কাভারেজ • ডে অথবা নাইট শিফট)',
        features: [
          '২ জন সিনিয়র ফটোগ্রাফার (ক্যান্ডিড + স্টেজ) + ১ জন সিনেমাটোগ্রাফার',
          'আনলিমিটেড ফটোশুট + ৫০টি স্পেশাল এডিটেড ছবি + সমস্ত কালার কারেকশন',
          'সিনেমাটোগ্রাফিক ভিডিও ও ২-৩ মিনিটের হাইলাইট ট্রেলার',
          'কমপ্লিট লাইট সেটআপ ও ৩০ দিনে পেনড্রাইভে ডেলিভারি'
        ],
        pkgCode: 'Package D: Elegance Premium (৳15,999)'
      };
    } else {
      recommendation = {
        name: 'Package C: Grace Duo (ফটো ও সিনেমা কম্বো)',
        price: '৳ ১২,০০০',
        days: '১ দিন (৫ ঘণ্টা কাভারেজ • ডে অথবা নাইট শিফট)',
        features: [
          '১ জন সিনিয়র ফটোগ্রাফার + ১ জন সিনিয়র সিনেমাটোগ্রাফার',
          '২ জন লাইটম্যান + কমপ্লিট লাইটিং সেটআপ',
          'আনলিমিটেড শুট + ৫০টি স্পেশাল রিটাচ ছবি + সিনেমাটিক ট্রেলার',
          'পেনড্রাইভে ফুল ডেলিভারি'
        ],
        pkgCode: 'Package C: Grace Duo (৳12,000)'
      };
    }
  }

  // Update UI with smooth fade
  if (resultCard) {
    resultCard.classList.add('opacity-50', 'scale-95');
    setTimeout(() => {
      resultName.textContent = recommendation.name;
      resultPrice.textContent = recommendation.price;
      resultDays.textContent = recommendation.days;
      
      resultFeatures.innerHTML = recommendation.features
        .map(f => `<li class="flex items-start gap-2"><span class="text-amber-400 font-bold">✓</span> <span>${f}</span></li>`)
        .join('');
      
      bookBtn.onclick = () => openBookingModalWithPackage(recommendation.pkgCode);
      resultCard.classList.remove('opacity-50', 'scale-95');
    }, 150);
  }
}

// ==========================================
// 2. BEFORE / AFTER COLOR GRADING SLIDER
// ==========================================
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  const overlay = document.getElementById('ba-overlay');
  const handle = document.getElementById('ba-handle');

  if (!container || !overlay || !handle) return;

  let isSliding = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;
    overlay.style.width = percent + '%';
    handle.style.left = percent + '%';
  };

  container.addEventListener('mousedown', (e) => {
    isSliding = true;
    moveSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => { isSliding = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    moveSlider(e.clientX);
  });

  // Touch Support for Mobile
  container.addEventListener('touchstart', (e) => {
    isSliding = true;
    moveSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => { isSliding = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    moveSlider(e.touches[0].clientX);
  }, { passive: true });
}

// ==========================================
// 3. THEME TOGGLER (Obsidian Dark vs Ivory Light)
// ==========================================
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('theme-toggle-btn');
  
  if (currentTheme === 'dark') {
    body.classList.add('light-theme');
    currentTheme = 'light';
    if (themeBtn) themeBtn.innerHTML = '🌙 ডার্ক রয়্যাল';
  } else {
    body.classList.remove('light-theme');
    currentTheme = 'dark';
    if (themeBtn) themeBtn.innerHTML = '☀️ আইভরি ব্রাইডাল';
  }
}

// ==========================================
// 4. LANGUAGE SWITCHER (Bangla / English)
// ==========================================
function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  const btnBn = document.getElementById('lang-bn');
  const btnEn = document.getElementById('lang-en');
  if (btnBn && btnEn) {
    if (lang === 'bn') {
      btnBn.className = 'px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-bold transition';
      btnEn.className = 'px-3 py-1 rounded-full text-stone-400 hover:text-stone-200 transition';
    } else {
      btnEn.className = 'px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-bold transition';
      btnBn.className = 'px-3 py-1 rounded-full text-stone-400 hover:text-stone-200 transition';
    }
  }
}

// ==========================================
// 5. AMBIENT SYNTHESIZER (Canon in D Chords)
// ==========================================
function toggleAmbientMusic() {
  if (isAudioPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
}

function startAmbientMusic() {
  try {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioCtxClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    isAudioPlaying = true;
    updateAudioUI(true);

    // Canon in D progression frequencies (D, A, Bm, F#m, G, D, G, A)
    const chords = [
      [293.66, 369.99, 440.00], // D Major
      [220.00, 277.18, 329.63], // A Major
      [246.94, 293.66, 369.99], // B Minor
      [185.00, 220.00, 277.18], // F# Minor
      [196.00, 246.94, 293.66], // G Major
      [293.66, 369.99, 440.00], // D Major
      [196.00, 246.94, 293.66], // G Major
      [220.00, 277.18, 329.63]  // A Major
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!isAudioPlaying) return;
      playSynthesizedChord(chords[chordIdx]);
      chordIdx = (chordIdx + 1) % chords.length;
      audioTimer = setTimeout(playChordStep, 3600);
    };

    playChordStep();
  } catch (err) {
    console.error("Audio Web API initialization:", err);
  }
}

function playSynthesizedChord(notes) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const masterGain = audioCtx.createGain();
  const vol = parseFloat(document.getElementById('ambient-volume')?.value || 0.25);
  
  masterGain.gain.setValueAtTime(0.001, now);
  masterGain.gain.exponentialRampToValueAtTime(vol * 0.18, now + 1.2);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
  masterGain.connect(audioCtx.destination);

  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.connect(masterGain);
    osc.start(now);
    osc.stop(now + 3.6);
  });
}

function stopAmbientMusic() {
  isAudioPlaying = false;
  if (audioTimer) clearTimeout(audioTimer);
  updateAudioUI(false);
}

function updateAudioUI(playing) {
  const soundWave = document.getElementById('sound-wave');
  const musicLabel = document.getElementById('music-label');
  if (soundWave) {
    if (playing) soundWave.classList.remove('paused');
    else soundWave.classList.add('paused');
  }
  if (musicLabel) {
    musicLabel.textContent = playing ? 'মিউজিক থামান' : 'মিউজিক চালান';
  }
}

// ==========================================
// 6. INTERACTIVE COST CALCULATOR 2.0
// ==========================================
function updateCostCalculator() {
  const days = parseInt(document.getElementById('calc-days')?.value || '2', 10);
  const teamTier = document.getElementById('calc-team')?.value || 'senior';
  
  const drone = document.getElementById('calc-drone')?.checked ? 15000 : 0;
  const sde = document.getElementById('calc-sde')?.checked ? 20000 : 0;
  const prewed = document.getElementById('calc-prewed')?.checked ? 25000 : 0;
  const album = document.getElementById('calc-album')?.checked ? 18000 : 0;
  const booth = document.getElementById('calc-booth')?.checked ? 22000 : 0;

  // Base rate calculation per day
  let basePerDay = 15000;
  if (teamTier === 'senior') basePerDay = 25000;
  if (teamTier === 'chief') basePerDay = 45000;

  let total = (basePerDay * days) + drone + sde + prewed + album + booth;

  // Multi-day courtesy discount
  if (days >= 3) total = total * 0.92; // 8% package perk

  const display = document.getElementById('calc-total-display');
  if (display) {
    display.textContent = '৳ ' + Math.round(total).toLocaleString('en-IN');
  }
}

function sendCustomQuoteToWhatsApp() {
  const days = document.getElementById('calc-days')?.value || '2';
  const total = document.getElementById('calc-total-display')?.textContent || '৳ ৭৫,০০০';
  const msg = `হ্যালো Wedding Affairs! আমি আপনাদের ওয়েবসাইট কস্ট ক্যালকুলেটর থেকে একটি কাস্টম কোটেশন তৈরি করেছি:\n\n• ইভেন্টের দিন: ${days} দিন\n• আনুমানিক বিনিয়োগ: ${total}\n\nঅনুগ্রহ করে আমার তারিখের বুকিং ও প্রাপ্যতা সম্পর্কে জানাবেন।`;
  window.open(`https://wa.me/8801772337400?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==========================================
// 7. EXPRESS 30-SECOND BOOKING MODAL
// ==========================================
function openBookingModalWithPackage(pkgName, shift = '☀️ ডে শিফট') {
  const modal = document.getElementById('booking-modal');
  const pkgInput = document.getElementById('modal-package-name');
  if (pkgInput) pkgInput.value = pkgName;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleExpressBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modal-name')?.value || '';
  const phone = document.getElementById('modal-phone')?.value || '';
  const date = document.getElementById('modal-date')?.value || '';
  const venue = document.getElementById('modal-venue')?.value || '';
  const pkg = document.getElementById('modal-package-name')?.value || '';
  const shift = document.getElementById('modal-shift')?.value || '';

  const waMsg = `*💍 WEDDING AFFAIRS নতুন বুকিং অনুসন্ধান*\n` +
    `• বর/কনের নাম: ${name}\n` +
    `• ফোন নম্বর: ${phone}\n` +
    `• অনুষ্ঠানের তারিখ: ${date}\n` +
    `• ভেন্যু ও শহর: ${venue}\n` +
    `• নির্বাচিত প্যাকেজ: ${pkg}\n` +
    `• শিফট: ${shift}\n\n` +
    `অনুগ্রহ করে আমাদের তারিখটি কনফার্ম করুন। ধন্যবাদ!`;

  closeBookingModal();
  window.open(`https://wa.me/8801772337400?text=${encodeURIComponent(waMsg)}`, '_blank');
}

// ==========================================
// 8. VIDEO THEATER MODAL (Showreel)
// ==========================================
function openVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const iframe = document.getElementById('video-iframe');
    if (iframe) iframe.src = iframe.src; // resets video playback
  }
}

// ==========================================
// 9. GALLERY RENDERER & LIGHTBOX
// ==========================================
function renderGallery(filter = 'all') {
  const grid = document.getElementById('gallery-grid-v2');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  grid.innerHTML = filtered.map((item, index) => {
    const title = currentLang === 'bn' ? item.titleBn : item.titleEn;
    const couple = currentLang === 'bn' ? item.coupleBn : item.coupleEn;
    const venue = currentLang === 'bn' ? item.venueBn : item.venueEn;

    return `
      <div onclick="openLightbox(${item.id})" class="glass-box rounded-2xl overflow-hidden cursor-pointer group relative aspect-[4/5] shadow-lg">
        <img src="${item.img}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition"></div>
        <div class="absolute bottom-4 left-4 right-4 text-left space-y-1">
          <span class="text-[10px] uppercase tracking-widest text-amber-300 font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/30">${couple}</span>
          <h4 class="text-white font-cormorant text-xl font-bold line-clamp-1 group-hover:text-amber-300 transition">${title}</h4>
          <p class="text-[11px] text-stone-300 line-clamp-1">📍 ${venue}</p>
        </div>
      </div>
    `;
  }).join('');
}

function filterGallery(category, elem) {
  document.querySelectorAll('.gallery-tab-v2').forEach(tab => {
    tab.classList.remove('bg-amber-400', 'text-black', 'border-amber-400');
    tab.classList.add('border-stone-800', 'text-stone-400');
  });
  elem.classList.remove('border-stone-800', 'text-stone-400');
  elem.classList.add('bg-amber-400', 'text-black', 'border-amber-400');

  renderGallery(category);
}

function openLightbox(id) {
  const item = galleryItems.find(i => i.id === id);
  if (!item) return;

  currentLightboxIndex = galleryItems.indexOf(item);
  const modal = document.getElementById('lightbox-modal-v2');
  const img = document.getElementById('lightbox-img-v2');
  const title = document.getElementById('lightbox-title-v2');
  const couple = document.getElementById('lightbox-couple-v2');
  const venue = document.getElementById('lightbox-venue-v2');

  if (img) img.src = item.img;
  if (title) title.textContent = currentLang === 'bn' ? item.titleBn : item.titleEn;
  if (couple) couple.textContent = currentLang === 'bn' ? item.coupleBn : item.coupleEn;
  if (venue) venue.textContent = currentLang === 'bn' ? item.venueBn : item.venueEn;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal-v2');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// ==========================================
// 10. GOLDEN DUST PARTICLES CANVAS
// ==========================================
function initCanvasParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = [];
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.6 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCanvasParticles();
  initBeforeAfterSlider();
  renderGallery();
  calculateBestPackage();

  // Volume slider event
  const volSlider = document.getElementById('ambient-volume');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      const valElem = document.getElementById('vol-display');
      if (valElem) valElem.textContent = Math.round(e.target.value * 100) + '%';
    });
  }

  // Calculator inputs listener
  document.querySelectorAll('#calc-days, #calc-team, #calc-drone, #calc-sde, #calc-prewed, #calc-album, #calc-booth')
    .forEach(input => {
      input.addEventListener('change', updateCostCalculator);
    });

  updateCostCalculator();
});
