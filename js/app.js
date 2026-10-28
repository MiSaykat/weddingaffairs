/**
 * Wedding Affairs - Luxury Wedding Portfolio & Studio
 * Interactive Controller & Features
 */

// --- Global State ---
let currentLang = 'en'; // Default to English on initial site load, with full Bengali toggle
let isAudioPlaying = false;
let audioCtx = null;
let audioTimer = null;
let currentLightboxIndex = 0;

// --- Gallery Dataset (Curated Masterpieces: Authentic Wedding Affairs Studio & Heritage Traditions) ---
const galleryItems = [
  {
    id: 1,
    category: ['cinematic', 'wedding'],
    titleEn: 'Royal Grandeur on the Marble Steps of Tajhat Palace',
    titleBn: 'তাজহাট জমিদার বাড়ির শ্বেতশুভ্র রাজকীয় সিঁড়িতে যুগল',
    coupleEn: 'Farhan & Natasha',
    coupleBn: 'ফারহান ও নাতাশা',
    venueEn: 'Tajhat Palace Historic Estate, Rangpur',
    venueBn: 'তাজহাট জমিদার বাড়ি, রংপুর',
    img: 'images/gallery/tajhat-palace-grand-stairs.jpg',
    aspect: 'wide'
  },
  {
    id: 2,
    category: ['portraits', 'wedding'],
    titleEn: 'Regal Crimson Benarasi Elegance',
    titleBn: 'লাল বেনারসি ও সোনার সাজে বধূ',
    coupleEn: 'Dr. Zarin Tasnim',
    coupleBn: 'ডা. জারিন তাসনিম',
    venueEn: 'Luxury Bridal Suite, Rangpur',
    venueBn: 'লাক্সারি ব্রাইডাল স্যুট, রংপুর',
    img: 'https://images.unsplash.com/photo-1742891595950-96c823c7f066?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 3,
    category: ['cinematic', 'portraits', 'wedding'],
    titleEn: 'Eternal Affection: Golden Hour Forehead Kiss',
    titleBn: 'গোধূলি সূর্যের কিরণে ভালোবাসার গভীর পরশ',
    coupleEn: 'Tanvir & Mehnaz',
    coupleBn: 'তানভীর ও মেহনাজ',
    venueEn: 'Golden Nature Meadow, Rangpur',
    venueBn: 'গোধূলির স্বর্ণালী আলোছায়া, রংপুর',
    img: 'images/gallery/golden-hour-forehead-kiss.jpg',
    aspect: 'tall'
  },
  {
    id: 4,
    category: ['holud'],
    titleEn: 'Vibrant Floral Gaye Holud with Couple',
    titleBn: 'গাঁদা ফুলে সাজানো বর-কনের প্রাণবন্ত গায়ে হলুদ',
    coupleEn: 'Tahmid & Samira',
    coupleBn: 'তাহমিদ ও সামিরা',
    venueEn: 'Paradise Garden Lawn, Rangpur',
    venueBn: 'প্যারাডাইস গার্ডেন লন, রংপুর',
    img: 'https://images.pexels.com/photos/33078527/pexels-photo-33078527/free-photo-of-vibrant-haldi-ceremony-with-bride-and-groom.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'wide'
  },
  {
    id: 5,
    category: ['portraits', 'wedding'],
    titleEn: 'Traditional Bengali Bride with Shola Mukut & Gachkouto',
    titleBn: 'শোলা মুকুট ও গাছকৌটো হাতে সনাতনী বাঙালি কনে',
    coupleEn: 'Puja Roy',
    coupleBn: 'পূজা রায়',
    venueEn: 'Heritage Puja Mandap & Garden, Rangpur',
    venueBn: 'ঐতিহ্যবাহী সনাতন মণ্ডপ প্রাঙ্গণ, রংপুর',
    img: 'images/gallery/traditional-mukut-bride.jpg',
    aspect: 'tall'
  },
  {
    id: 6,
    category: ['wedding'],
    titleEn: 'Sacred Shubho Drishti & Eternal Vows (Hindu Tradition)',
    titleBn: 'পানের পাতায় সনাতনী শুভদৃষ্টি ও মালাবদল (হিন্দু বিবাহ)',
    coupleEn: 'Sourav & Puja',
    coupleBn: 'সৌরভ ও পূজা',
    venueEn: 'Radhagovinda Mandap, Rangpur',
    venueBn: 'শ্রী শ্রী রাধাগোবিন্দ মন্দির মণ্ডপ, রংপুর',
    img: 'https://images.unsplash.com/photo-1742146640285-6ae1e68ab0b5?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 7,
    category: ['cinematic', 'wedding', 'portraits'],
    titleEn: 'Architectural Romance under Palace Arches',
    titleBn: 'শ্বেতমহলের খিলানে বেনারসি ও শেরওয়ানিতে প্রণয়',
    coupleEn: 'Farhan & Natasha',
    coupleBn: 'ফারহান ও নাতাশা',
    venueEn: 'Tajhat Palace Archways, Rangpur',
    venueBn: 'তাজহাট জমিদার বাড়ি খিলান, রংপুর',
    img: 'images/gallery/tajhat-palace-arch-couple.jpg',
    aspect: 'tall'
  },
  {
    id: 8,
    category: ['portraits'],
    titleEn: 'Timeless Bengali Bridal Glow',
    titleBn: 'মৃদু হাসিতে বাঙালি বধূর রূপ',
    coupleEn: 'Sadia Jahan Nowrin',
    coupleBn: 'সাদিয়া জাহান নওরিন',
    venueEn: 'Heritage Studio Indoor, Rangpur',
    venueBn: 'হেরিটেজ স্টুডিও ইনডোর, রংপুর',
    img: 'https://images.unsplash.com/photo-1742891603352-73af8562bbcf?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square'
  },
  {
    id: 9,
    category: ['cinematic', 'wedding'],
    titleEn: 'Heritage Symphony: Grand Facade of Tajhat Palace',
    titleBn: 'তাজহাট রাজপ্রাসাদের লাল ও শ্বেত স্থাপত্যের সামনে যুগল',
    coupleEn: 'Farhan & Natasha',
    coupleBn: 'ফারহান ও নাতাশা',
    venueEn: 'Tajhat Palace Historic Estate, Rangpur',
    venueBn: 'তাজহাট জমিদার বাড়ি, রংপুর',
    img: 'images/gallery/tajhat-palace-heritage-facade.jpg',
    aspect: 'wide'
  },
  {
    id: 10,
    category: ['holud'],
    titleEn: 'Intricate Mehendi & Alta Symphony',
    titleBn: 'আলপনাময় মেহেন্দী ও বধূর আলতা হাত',
    coupleEn: 'Nahian & Sumaiya',
    coupleBn: 'নাহিয়ান ও সুমাইয়া',
    venueEn: 'Bridal Heritage Suite, Rangpur',
    venueBn: 'ব্রাইডাল হেরিটেজ স্যুট, রংপুর',
    img: 'https://images.pexels.com/photos/36354615/pexels-photo-36354615/free-photo-of-intricate-bridal-mehndi-application-on-arm.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'wide'
  },
  {
    id: 11,
    category: ['portraits', 'wedding'],
    titleEn: 'Royal Heritage Groom Sherwani & Turban',
    titleBn: 'অভিজাত বরের শেরওয়ানি ও পাগড়ি',
    coupleEn: 'Tanvir Ahmed',
    coupleBn: 'তানভীর আহমেদ',
    venueEn: 'Grand Palace Convention, Rangpur',
    venueBn: 'গ্র্যান্ড প্যালেস কনভেনশন, রংপুর',
    img: 'https://images.unsplash.com/photo-1755931450169-513db8303ccf?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 12,
    category: ['cinematic', 'portraits'],
    titleEn: 'Sunset Silhouette: Radiance into Eternity',
    titleBn: 'সূর্যাস্তের দ্যুতিতে হৃদয়ের মেলবন্ধন',
    coupleEn: 'Tanvir & Mehnaz',
    coupleBn: 'তানভীর ও মেহনাজ',
    venueEn: 'Sunset Viewpoint, Rangpur',
    venueBn: 'গোধূলির স্বর্ণালী আলো, রংপুর',
    img: 'images/gallery/sunset-embrace-silhouette.jpg',
    aspect: 'tall'
  },
  {
    id: 13,
    category: ['wedding', 'cinematic'],
    titleEn: 'Starlight Romance: Royal Couple in Midnight Forest',
    titleBn: 'নিশীথিনীর মায়াময় আলোয় অরণ্যে রাজকীয় দম্পতি',
    coupleEn: 'Farhan & Natasha',
    coupleBn: 'ফারহান ও নাতাশা',
    venueEn: 'Enchanted Forest Estate, Rangpur',
    venueBn: 'মায়াবী বনানী প্রাঙ্গণ, রংপুর',
    img: 'images/gallery/cinematic-night-woods.jpg',
    aspect: 'tall'
  },
  {
    id: 14,
    category: ['portraits'],
    titleEn: 'Intimate Indoor Bridal Adornment',
    titleBn: 'ইনডোরে আয়নার সামনে কনের সাজ',
    coupleEn: 'Tanzila Haque Nova',
    coupleBn: 'তানজিলা হক নোভা',
    venueEn: 'Prime Suite Indoor, Rangpur',
    venueBn: 'প্রাইম স্যুট ইনডোর, রংপুর',
    img: 'https://images.unsplash.com/photo-1742891600223-fb9527316d3f?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 15,
    category: ['cinematic', 'portraits'],
    titleEn: 'Masterpiece Rim-Light Silhouette in Dark Woods',
    titleBn: 'অন্ধকার বনে ব্যাকলাইটে ক্রিয়েটিভ সিনেমাটিক সিল্যুয়েট',
    coupleEn: 'Silhouette of Two Souls',
    coupleBn: 'দুটি আত্মার মহাকাব্যিক ছায়ামূর্তি',
    venueEn: 'Twilight Woods, Rangpur',
    venueBn: 'রংপুর অরণ্য প্রাঙ্গণ',
    img: 'images/gallery/creative-night-rimlight.jpg',
    aspect: 'wide'
  },
  {
    id: 16,
    category: ['portraits', 'cinematic'],
    titleEn: 'Serene Nature Portrait at Surabhi Udyan',
    titleBn: 'সুরভি উদ্যানের সবুজ অরণ্যে স্নিগ্ধ প্রাকৃতিক পোর্ট্রেট',
    coupleEn: 'Botanical Outdoor Session',
    coupleBn: 'সবুজে ঘেরা প্রকৃতির কোলে',
    venueEn: 'Surabhi Udyan Botanical Park, Rangpur',
    venueBn: 'সুরভি উদ্যান বোটানিক্যাল পার্ক, রংপুর',
    img: 'images/gallery/surabhi-udyan-portrait.jpg',
    aspect: 'wide'
  },
  {
    id: 17,
    category: ['reception', 'portraits'],
    titleEn: 'Chikli Water Park Elegance: Family Milestone Portrait',
    titleBn: 'চিকলি ওয়াটার পার্ক ফাউন্টেনের সামনে আনন্দঘন ফ্যামিলি ফ্রেম',
    coupleEn: 'Imran, Nadia & Anaya',
    coupleBn: 'ইমরান, নাদিয়া ও আনায়া',
    venueEn: 'Chikli Water Park Resort, Rangpur',
    venueBn: 'চিকলি ওয়াটার পার্ক, রংপুর',
    img: 'images/gallery/chikli-waterpark-family.jpg',
    aspect: 'tall'
  },
  {
    id: 18,
    category: ['reception', 'portraits'],
    titleEn: 'Pure Joy: Reaching for the Sky at Chikli Lawn',
    titleBn: 'নীল আকাশের নিচে সন্তানকে উঁচিয়ে ধরার আনন্দ ও উচ্ছ্বাস',
    coupleEn: 'Imran, Nadia & Anaya',
    coupleBn: 'ইমরান, নাদিয়া ও আনায়া',
    venueEn: 'Chikli Lakeside Lawn, Rangpur',
    venueBn: 'চিকলি লেকসাইড লন, রংপুর',
    img: 'images/gallery/chikli-family-joy.jpg',
    aspect: 'tall'
  }
];

// --- Translations Dictionary ---
const i18n = {
  bn: {
    navHome: 'হোম',
    navAbout: 'আমাদের গল্প',
    navServices: 'সার্ভিসসমূহ',
    navTeam: 'আমাদের টিম',
    navPortfolio: 'গ্যালারি',
    navPackages: 'প্যাকেজসমূহ',
    navCalculator: 'কস্ট ক্যালকুলেটর',
    navReviews: 'রিভিউ',
    navContact: 'যোগাযোগ',
    bookDateBtn: 'বুকিং করুন',

    heroBadge: 'প্রিমিয়াম ওয়েডিং সিনেমাটোগ্রাফি ও ফটোগ্রাফি',
    heroTitle: 'ভালোবাসার প্রতিটি মুহূর্ত হোক চির অম্লান ও স্মরণীয়',
    heroSubtitle: 'ওয়েডিং অ্যাফেয়ার্স (Wedding Affairs) প্রতিটি বিয়েতে সাজিয়ে তোলে ভালোবাসার এক রাজকীয় দৃশ্যকাব্য। আমাদের ক্যামেরার ফ্রেমে বন্দী হবে আপনার জীবনের সেরা মুহূর্তগুলো।',
    heroExploreBtn: 'পোর্টফোলিও দেখুন',
    heroPackagesBtn: 'প্যাকেজ দেখুন',

    chkEventDate: 'ইভেন্টের তারিখ নির্বাচন',
    chkShift: 'ইভেন্ট শিফট (৫ ঘণ্টা)',
    chkLocation: 'আপনার শহর/ভেন্যু',
    chkEventType: 'ইভেন্টের ধরন',
    chkBtn: 'তারিখ চেক করুন',

    statWeddings: '১৫০০+ এরও বেশি বিবাহ উদযাপন',
    statAwards: '১২+ জাতীয় ও আন্তর্জাতিক সম্মাননা',
    statSatisfaction: '৯৯.৯% আনন্দিত যুগল',
    statExperience: '১০+ বছরেরও বেশি অভিজ্ঞতা',

    aboutBadge: 'আমাদের দর্শন ও শিল্প',
    aboutTitle: 'আমরা শুধু ছবি তুলি না, আমরা অমর প্রেমের গল্প লিখি',
    aboutP1: 'একটি বিয়ে শুধু দুটি মানুষের মেলবন্ধন নয়; এটি দুটি পরিবারের আনন্দাশ্রু, হাসি, গান আর আবেগঘন হাজারো অনুভূতির মহোৎসব। Wedding Affairs-এর লক্ষ্য হলো সেই প্রতিটি মূল্যবান অনুভূতিকে সযত্নে পরম নান্দনিকতায় ধরে রাখা।',
    aboutP2: 'আমাদের টিম সজ্জিত আধুনিকতম 4K সিনেমা ক্যামেরা, ড্রোন এবং মাস্টার কালারিস্টদের নিপুণ কারুকাজে। প্রতিটি ফ্রেমে আমরা ঢেলে দিই রাজকীয় আভিজাত্য ও বাস্তব অনুভূতির মেলবন্ধন।',
    aboutF1: 'ক্যান্ডিড ও রাজকীয় পোজের নিখুঁত সংমিশ্রণ',
    aboutF2: 'সিনেমাটিক 4K হাইলাইট ট্রেলার ও ফুল লেন্থ মুভি',
    aboutF3: 'ইতালি থেকে আমদানিকৃত বিলাসবহুল চামড়ার ফটোবুক',
    aboutF4: 'সারা বাংলাদেশ ও আন্তর্জাতিক ডেস্টিনেশন ওয়েডিং সাপোর্ট',

    servicesBadge: 'আমাদের সেবা সমূহ',
    servicesTitle: 'আপনার স্বপ্নের বিবাহের জন্য বিশ্বমানের আয়োজন',
    srv1Title: 'সিগনেচার ওয়েডিং ফটোগ্রাফি',
    srv1Desc: 'ক্যান্ডিড ইমোশন, রিচুয়ালস এবং রাজকীয় কাপল পোট্রেট। প্রতিটি হাসিমুখের নিখুঁত আর্টওয়ার্ক।',
    srv2Title: '4K সিনেমাটিক ওয়েডিং ফিল্ম',
    srv2Desc: 'সিনেমার মতো ড্রামাটিক স্টোরিলাইন, ব্যাকগ্রাউন্ড মিউজিক এবং কালার গ্রেডিং সমন্বিত মাস্টারপিস ভিডিও।',
    srv3Title: 'প্রি ও পোস্ট ওয়েডিং শুট',
    srv3Desc: 'মনোরম রিসোর্ট, সমুদ্র সৈকত বা প্রাকৃতিক সৌন্দর্যে সাজানো রোমান্টিক কাপল স্টোরিটেলিং শুট।',
    srv4Title: 'ড্রোন এরিয়াল সিনেমাটোগ্রাফি',
    srv4Desc: 'আকাশ থেকে পুরো ভেন্যু, আলোকসজ্জা ও রাজকীয় বরযাত্রার দৃষ্টিনন্দন এরিয়াল ড্রোন ফুটেজ।',
    srv5Title: 'লাক্সারি হ্যান্ডক্রাফটেড ফটো অ্যালবাম',
    srv5Desc: 'প্রিমিয়াম ভেলভেট ও লেদার বাইন্ডিংয়ে তৈরি ওয়াটারপ্রুফ ফ্ল্যাশ মাউন্ট লাইফটাইম অ্যালবাম।',
    srv6Title: 'লাইভ প্রিন্ট ও ফটো বুথ',
    srv6Desc: 'মেহমানদের জন্য অনুষ্ঠানে বসেই সাথে সাথে ইনস্ট্যান্ট ফটো ম্যাগনেট ও প্রিন্ট স্মৃতি উপহার।',

    galleryBadge: 'আমাদের সেরা কাজসমূহ',
    galleryTitle: 'অনুভূতির ক্যানভাসে আমাদের কয়েকটি ফ্রেম',
    tabAll: 'সবগুলো',
    tabHolud: 'গায়ে হলুদ ও মেহেন্দী',
    tabWedding: 'বিয়ে ও শুভ পরিণয়',
    tabCinematic: 'সিনেমাটিক রোমান্স',
    tabPortraits: 'ব্রাইডাল ও পোর্ট্রেট',
    tabReception: 'রিসেপশন ও ফ্যামিলি',

    packagesBadge: 'স্বচ্ছ ও সেরা প্যাকেজ',
    packagesTitle: 'আপনার বাজেটের সাথে মানানসই রাজকীয় আয়োজন',
    popularBadge: 'সবচেয়ে জনপ্রিয়',
    perDay: 'প্রতি ইভেন্ট',
    bookThisPkg: 'এই প্যাকেজটি বুক করুন',

    pkg1Name: 'সিলভার গ্রেস',
    pkg1Desc: 'ঘরোয়া ও ছোট পরিসরের বিয়ের আয়োজনের জন্য আদর্শ।',
    pkg1Price: '৳ ৩৫,০০০',
    pkg1F1: '১ দিন (৫-৬ ঘণ্টা কাভারেজ)',
    pkg1F2: '২ জন অভিজ্ঞ ফটোগ্রাফার (১ ক্যান্ডিড + ১ ট্রেডিশনাল)',
    pkg1F3: '১ জন 4K সিনেমাটোগ্রাফার',
    pkg1F4: 'আনলিমিটেড ক্লিক ও ১০০টি হাই-এন্ড রিটাচ করা ছবি',
    pkg1F5: '৩-৫ মিনিটের সিনেমাটিক ট্রেলার ও ফুল ভিডিও',
    pkg1F6: 'অনলাইন গুগল ড্রাইভ ডেলিভারি (১৫ দিন)',

    pkg2Name: 'রয়্যাল হেরিটেজ',
    pkg2Desc: 'হলুদ ও বিয়ের পরিপূর্ণ প্যাকেজ, যা সবচেয়ে বেশি ক্লায়েন্টদের পছন্দ।',
    pkg2Price: '৳ ৭৫,০০০',
    pkg2F1: '২ দিন কাভারেজ (হলুদ + বিয়ে অথবা বিয়ে + রিসেপশন)',
    pkg2F2: '৩ জন সিনিয়র এক্সক্লুসিভ ফটোগ্রাফার',
    pkg2F3: '২ জন 4K সিনেমাটোগ্রাফার + ফুল গিম্বল সাপোর্ট',
    pkg2F4: 'লাইসেন্সড ড্রোন এরিয়াল কাভারেজ অন্তর্ভুক্ত',
    pkg2F5: '১টি প্রিমিয়াম লেদার-বাউন্ড ফ্ল্যাশ মাউন্ট অ্যালবাম (১২x২৪ ইঞ্চি)',
    pkg2F6: '৫-৭ মিনিটের ড্রামাটিক সিনেমাটিক ফিল্ম ও রিলস',
    pkg2F7: '১টি বড় ফ্রেমড ক্যানভাস পোট্রেট (২০x৩০ ইঞ্চি)',

    pkg3Name: 'ইম্পেরিয়াল প্লাটিনাম',
    pkg3Desc: 'অভিজাত রাজকীয় পরিবারের জন্য সম্পূর্ণ ভিআইপি ও ডেস্টিনেশন ওয়েডিং প্যাকেজ।',
    pkg3Price: '৳ ১,৩৫,০০০',
    pkg3F1: '৩ দিন পর্যন্ত আনলিমিটেড সময় কাভারেজ (হলুদ, বিয়ে ও বৌভাত)',
    pkg3F2: 'চিফ ডিরেক্টর সহ ৫ সদস্যের মেগা টিম',
    pkg3F3: '4K সিনেমাটিক টিম + একই দিনে এডিট করা (Same Day Edit) ভিডিও',
    pkg3F4: '4K ড্রোন ও ক্রেন প্রোডাকশন কাভারেজ',
    pkg3F5: '২টি প্রিমিয়াম ইতালিয়ান হ্যান্ডক্রাফটেড ফটো অ্যালবাম',
    pkg3F6: 'কমপ্লিমেন্টারি প্রি-ওয়েডিং অথবা পোস্ট-ওয়েডিং কাপল শুট',
    pkg3F7: 'ইনস্ট্যান্ট ফটো বুথ (অতিথিদের জন্য ১০০টি প্রিন্ট)',

    calcBadge: 'কাস্টম কোটেশন বিল্ডার',
    calcTitle: 'আপনার পছন্দ অনুযায়ী প্যাকেজ তৈরি করুন',
    calcDaysLabel: 'ইভেন্টের দিন সংখ্যা:',
    calcTeamLabel: 'ফটোগ্রাফি ও ভিডিও টিম ক্যাটাগরি:',
    calcTeamStandard: 'স্ট্যান্ডার্ড প্রফেশনাল টিম',
    calcTeamSenior: 'সিনিয়র এক্সক্লুসিভ টিম (+৳১৫,০০০)',
    calcTeamChief: 'চিফ ডিরেক্টর সিগনেচার টিম (+৳৩৫,০০০)',
    calcAddonsLabel: 'পছন্দসই অতিরিক্ত সার্ভিস যুক্ত করুন:',
    calcDrone: '4K ড্রোন এরিয়াল কাভারেজ (+৳১৫,০০০)',
    calcSde: 'সেম ডে এডিট (SDE) ভিডিও টিজার (+৳২০,০০০)',
    calcPreWed: 'প্রি-ওয়েডিং ডেস্টিনেশন শুট (+৳২৫,০০০)',
    calcAlbum: 'হ্যান্ডক্রাফটেড লেদার অ্যালবাম (+৳১৮,০০০)',
    calcBooth: 'অতিথিদের লাইভ ফটো ম্যাগনেট বুথ (+৳২২,০০০)',
    calcEstimatedTotal: 'আনুমানিক মোট বিনিয়োগ:',
    calcBookBtn: 'এই কাস্টম প্যাকেজে বুকিং পাঠান',

    reviewsBadge: 'প্রেমের মিষ্টি গল্প',
    reviewsTitle: 'আমাদের আনন্দিত দম্পতিদের মনখোলা অনুভূতি',

    faqBadge: 'সাধারণ প্রশ্নোত্তর',
    faqTitle: 'আপনার মনে থাকা গুরুত্বপূর্ণ প্রশ্নের উত্তর',
    faqQ2: 'ছবি ও ভিডিও ডেলিভারি পেতে কতদিন সময় লাগে?',
    faqA2_p1: '👑 <strong>রয়্যাল লাক্সারি প্যাকেজ (প্রথম ৩টি মেগা কালেকশন):</strong> আমাদের লাক্সারি প্যাকেজগুলোর ক্ষেত্রে মাত্র <strong>৩ কার্যদিবসের মধ্যে</strong> সমস্ত ছবি এবং <strong>১৫ কার্যদিবসের মধ্যে</strong> সম্পূর্ণ কালার গ্রেডেড 4K ভিডিও ও সিনেমাটিক ট্রেলার ডেলিভারি সম্পন্ন হয়।',
    faqA2_p2: '💎 <strong>স্ট্যান্ডার্ড প্যাকেজ (প্যাকেজ A থেকে G):</strong> আমাদের রেগুলার প্যাকেজগুলোর সমস্ত ছবি ও এডিটেড ভিডিও <strong>৩০ থেকে ৪০ কার্যদিবসের মধ্যে</strong> আপনার পেনড্রাইভে হোম ডেলিভারি অথবা হাই-স্পিড গুগল ড্রাইভ লিঙ্কে প্রদান করা হয়।',
    faqA2_p3: '☁️ <em>ক্লাউড ব্যাকআপ নিশ্চয়তা: গুগল ড্রাইভে সরবরাহকৃত সমস্ত ছবি ও ভিডিও ফাইল টানা <strong>১ বছর পর্যন্ত সুরক্ষিতভাবে সংরক্ষণ</strong> করা হয়।</em>',
    faqQ3: 'আমরা কি ঢাকার বাইরে বা দেশের বাইরে ডেস্টিনেশন শুটের সুবিধা পাবো?',
    faqA3: 'হ্যাঁ, অবশ্যই! Wedding Affairs সারা বাংলাদেশ—বিশেষ করে <strong>কক্সবাজার, চট্টগ্রাম, সিলেট, যশোর, বরিশাল, কুষ্টিয়া, বগুড়া, রাজশাহী ইত্যাদি</strong> শহরসহ যেকোনো জেলায় এবং আন্তর্জাতিকভাবে <strong>ইন্ডিয়া (ভারত), মালয়েশিয়া, দুবাই (সংযুক্ত আরব আমিরাত), ব্যাংকক (থাইল্যান্ড)</strong>-এ প্রিমিয়াম ডেস্টিনেশন ওয়েডিং কাভারেজ প্রদান করে। শুধু টিমের ট্রান্সপোর্ট ও থাকার ব্যবস্থা ক্লায়েন্টদের সমন্বয় করতে হয়।',
    faqQ4: 'আমরা কি সব র\' (Raw) ফুটেজ এবং ছবি সম্পূর্ণভাবে পাবো?',
    faqA4: 'হ্যাঁ, আমাদের প্রতিটি প্যাকেজেই সমস্ত র\' ছবি এবং আনকাট হাই-রেজ্যুলেশন ভিডিও ফুটেজ সম্পূর্ণ বিনামূল্যে গুগল ড্রাইভে অথবা আপনার সরবরাহকৃত হার্ড ড্রাইভে প্রদান করা হয়।',
    faqQ5: 'ট্রাভেল খরচ (Travel Cost) কি আপনাদের নাকি আমাদের?',
    faqA5: 'রংপুর সিটি কর্পোরেশনের অভ্যন্তরীণ ভেন্যুগুলোর জন্য আমাদের সকল প্যাকেজে যাতায়াত খরচ সম্পূর্ণ ফ্রি। তবে আমাদের মূল স্টুডিও লোকেশন (পশ্চিম খাসবাগ তিন মাথা, রংপুর) থেকে আপনাদের ভেন্যু যত দূরে, সেই দূরত্ব অনুযায়ী ট্রাভেল ও লজিস্টিক খরচ আলাদাভাবে গণনা করা হয় অথবা ইনভয়েস দেওয়ার সময় স্বচ্ছভাবে যুক্ত করা হয়। দূরবর্তী জেলা বা ডেস্টিনেশন ওয়েডিংয়ের ক্ষেত্রে টিমের যাতায়াত ও থাকার ব্যবস্থা ক্লায়েন্ট সরাসরি সমন্বয় করেন অথবা অফিসিয়াল ইনভয়েস অনুযায়ী পরিশোধ করেন।',

    contactBadge: 'তারিখ নির্ধারণ করুন',
    contactTitle: 'আপনার স্বপ্নের বিয়ে সাজাতে আমাদের সাথে কথা বলুন',
    contactP: 'আপনার কাঙ্ক্ষিত তারিখটি আমাদের শিডিউলে সংরক্ষিত রাখতে আজই যোগাযোগ করুন।',
    fldName: 'বর ও কনের নাম',
    fldPhone: 'ফোন / হোয়াটসঅ্যাপ নম্বর',
    fldEmail: 'ইমেইল অ্যাড্রেস',
    fldDate: 'অনুষ্ঠানের সম্ভাব্য তারিখ',
    fldVenue: 'ভেন্যুর নাম ও শহর',
    fldPkg: 'নির্বাচিত প্যাকেজ',
    fldShift: 'ইভেন্ট শিফট নির্বাচন করুন (ডে, নাইট অথবা ডাবল শিফট)',
    fldMsg: 'বিশেষ কোনো অনুরোধ বা তথ্য',
    sendInquiryBtn: 'বুকিং ইনফরমেশন জমা দিন',
    orWhatsApp: 'সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন',

    musicPlay: 'মিউজিক চালান',
    musicPause: 'মিউজিক থামান'
  },
  en: {
    navHome: 'Home',
    navAbout: 'Our Story',
    navServices: 'Services',
    navTeam: 'Our Team',
    navPortfolio: 'Gallery',
    navPackages: 'Packages',
    navCalculator: 'Cost Calculator',
    navReviews: 'Reviews',
    navContact: 'Contact',
    bookDateBtn: 'Book Date',

    heroBadge: 'Premium Wedding Cinematography & Photography',
    heroTitle: 'Capturing Eternal Love & Royal Elegance',
    heroSubtitle: 'Wedding Affairs transforms your wedding into a cinematic visual masterpiece. Preserving the laughter, tears, and royal grandeur for a lifetime of cherished memories.',
    heroExploreBtn: 'Explore Gallery',
    heroPackagesBtn: 'View Packages',

    chkEventDate: 'Select Event Date',
    chkShift: 'Event Shift (5 Hours)',
    chkLocation: 'Your Venue / City',
    chkEventType: 'Event Type',
    chkBtn: 'Check Availability',

    statWeddings: '1,500+ Weddings Celebrated',
    statAwards: '12+ Industry Awards',
    statSatisfaction: '99.9% Happy Couples',
    statExperience: '10+ Years of Experience',

    aboutBadge: 'Our Philosophy & Art',
    aboutTitle: 'We Don’t Just Take Photos, We Craft Visual Heirloom Stories',
    aboutP1: 'A wedding is not just a ceremony; it is a tapestry of unrepeatable emotions, tears of joy, heartfelt smiles, and sacred vows. At Wedding Affairs, we approach each wedding with the sensitivity of poets and the precision of master artists.',
    aboutP2: 'Equipped with state-of-the-art 4K cinema cameras, aerial drones, and master colorists, we create memories bathed in royal grandeur and unfiltered emotion.',
    aboutF1: 'Seamless blend of candid realism and royal editorial portraits',
    aboutF2: '4K cinematic highlight trailers and full-length feature films',
    aboutF3: 'Imported handcrafted Italian flush-mount leather storybooks',
    aboutF4: 'Destination wedding coverage across Bangladesh & Worldwide',

    servicesBadge: 'Our Curated Offerings',
    servicesTitle: 'World-Class Craftsmanship for Your Dream Wedding',
    srv1Title: 'Signature Wedding Photography',
    srv1Desc: 'Candid emotions, timeless rituals, and regal couple portraits with artistic color tones.',
    srv2Title: '4K Cinematic Wedding Films',
    srv2Desc: 'Emotion-driven cinema with custom musical score, drone shots, and color grading.',
    srv3Title: 'Pre & Post Wedding Shoots',
    srv3Desc: 'Intimate storytelling shoots at luxury resorts, scenic beaches, and heritage sites.',
    srv4Title: 'Aerial Drone Cinematography',
    srv4Desc: 'Majestic aerial views of your venue, fireworks, and royal arrival processions.',
    srv5Title: 'Luxury Handcrafted Albums',
    srv5Desc: 'Velvet and leather-bound flush-mount heirloom albums made to last generations.',
    srv6Title: 'Live Guest Print & Photo Booth',
    srv6Desc: 'Instant magnet and print souvenirs for your guests directly at the reception.',

    galleryBadge: 'Our Masterpieces',
    galleryTitle: 'Frames of Real Emotion & Royal Splendor',
    tabAll: 'All Works',
    tabHolud: 'Haldi & Mehendi',
    tabWedding: 'Wedding & Ceremony',
    tabCinematic: 'Cinematic Romance',
    tabPortraits: 'Bridal & Portraits',
    tabReception: 'Reception & Family',

    packagesBadge: 'Transparent Pricing',
    packagesTitle: 'Handcrafted Packages Designed for Your Royal Day',
    popularBadge: 'Most Popular',
    perDay: 'per event',
    bookThisPkg: 'Book This Package',

    pkg1Name: 'Silver Grace',
    pkg1Desc: 'Ideal for intimate ceremonies and single-day wedding events.',
    pkg1Price: '৳ 35,000',
    pkg1F1: '1 Day Coverage (5-6 Hours)',
    pkg1F2: '2 Experienced Photographers (1 Candid + 1 Traditional)',
    pkg1F3: '1 Professional 4K Cinematographer',
    pkg1F4: 'Unlimited raw captures & 100 high-end retouched photos',
    pkg1F5: '3-5 Minute Cinematic Trailer & Edited Full Video',
    pkg1F6: 'High-speed cloud delivery (15 days)',

    pkg2Name: 'Royal Heritage',
    pkg2Desc: 'Our most sought-after full wedding celebration suite.',
    pkg2Price: '৳ 75,000',
    pkg2F1: '2 Days Coverage (Holud + Wedding or Wedding + Reception)',
    pkg2F2: '3 Senior Exclusive Photographers',
    pkg2F3: '2 Cinema Film Crew with gimbal & prime lenses',
    pkg2F4: 'Licensed 4K Aerial Drone Coverage included',
    pkg2F5: '1 Luxury Handcrafted Flush-Mount Album (12x24 inch)',
    pkg2F6: '5-7 Minute Dramatic Cinematic Film & Social Reels',
    pkg2F7: '1 Large Framed Canvas Portrait (20x30 inch)',

    pkg3Name: 'Imperial Platinum',
    pkg3Desc: 'The ultimate royal VIP package for grand luxury & destination weddings.',
    pkg3Price: '৳ 1,35,000',
    pkg3F1: 'Up to 3 Days Unlimited Coverage (Holud, Wedding & Reception)',
    pkg3F2: 'Executive Mega Crew led by Chief Director',
    pkg3F3: '4K Cinema Team + Same Day Edit (SDE) Teaser Video',
    pkg3F4: '4K Drone & Crane Aerial Production',
    pkg3F5: '2 Premium Italian Leather Heirloom Albums with customized box',
    pkg3F6: 'Complimentary Pre-Wedding or Post-Wedding Destination Shoot',
    pkg3F7: 'Instant Live Photo Print Booth (100 custom prints for guests)',

    calcBadge: 'Custom Quote Builder',
    calcTitle: 'Design Your Custom Wedding Coverage',
    calcDaysLabel: 'Number of Event Days:',
    calcTeamLabel: 'Crew & Director Tier:',
    calcTeamStandard: 'Standard Professional Team',
    calcTeamSenior: 'Senior Exclusive Team (+৳15,000)',
    calcTeamChief: 'Chief Director Signature Team (+৳35,000)',
    calcAddonsLabel: 'Select Extra Bespoke Services:',
    calcDrone: '4K Aerial Drone Coverage (+৳15,000)',
    calcSde: 'Same-Day Edit (SDE) Video Teaser (+৳20,000)',
    calcPreWed: 'Pre-Wedding Destination Shoot (+৳25,000)',
    calcAlbum: 'Luxury Leather Flush-Mount Album (+৳18,000)',
    calcBooth: 'Live Guest Photo Magnet Booth (+৳22,000)',
    calcEstimatedTotal: 'Estimated Total Investment:',
    calcBookBtn: 'Request Booking for This Custom Quote',

    reviewsBadge: 'Love Stories',
    reviewsTitle: 'Words from the Couples Who Trusted Us',

    faqBadge: 'Frequently Asked Questions',
    faqTitle: 'Everything You Need to Know Before Booking',
    faqQ2: 'How long does it take to deliver photos and videos?',
    faqA2_p1: '👑 <strong>Royal Luxury Packages (First 3 Mega Collections):</strong> For our luxury collections, all retouched photos are delivered within <strong>3 working days</strong>, and complete color-graded 4K cinematic films & trailers within <strong>15 working days</strong>.',
    faqA2_p2: '💎 <strong>Standard Packages (Packages A to G):</strong> All edited photos and video footages are delivered within <strong>30 to 40 working days</strong> via doorstep pen drive delivery or high-speed Google Drive link.',
    faqA2_p3: '☁️ <em>Cloud Backup Guarantee: All photo and video assets shared via Google Drive are safely preserved on our cloud for <strong>1 full year</strong>.</em>',
    faqQ3: 'Do you cover destination weddings outside Rangpur or internationally?',
    faqA3: 'Yes, absolutely! Wedding Affairs covers luxury destination weddings across Bangladesh—including <strong>Cox\'s Bazar, Chattogram, Sylhet, Jashore, Barishal, Kushtia, Bogura, Rajshahi, etc.</strong>—as well as international destinations such as <strong>India, Malaysia, Dubai (UAE), and Bangkok (Thailand)</strong>. Clients only need to arrange team travel and accommodations or include them in the official invoice.',
    faqQ4: 'Do we get all raw footages and unedited photographs?',
    faqA4: 'Yes! Across all our packages, full raw high-resolution images and uncut 4K video footages are provided via Google Drive or your supplied storage drive at no extra cost.',
    faqQ5: 'Is travel cost covered by you or the client?',
    faqA5: 'Transportation within Rangpur City Corporation is completely free. For locations outside Rangpur city, travel and logistics are calculated based on the distance from our studio (Poshchim Khasbag Tin Matha, Rangpur) and transparently billed in your official invoice. For destination weddings, clients arrange travel & accommodation or have it billed directly.',

    contactBadge: 'Reserve Your Date',
    contactTitle: 'Let Us Create Magic Together',
    contactP: 'Dates fill quickly during peak wedding season. Inquire now to secure your date with Wedding Affairs.',
    fldName: 'Couple / Client Name',
    fldPhone: 'Phone / WhatsApp Number',
    fldEmail: 'Email Address',
    fldDate: 'Tentative Event Date',
    fldVenue: 'Venue Name & City',
    fldPkg: 'Selected Package',
    fldShift: 'Select Event Shift (Day, Night or Double Shift)',
    fldMsg: 'Special Requests or Vision',
    sendInquiryBtn: 'Send Booking Inquiry',
    orWhatsApp: 'Chat Directly on WhatsApp',

    musicPlay: 'Play Music',
    musicPause: 'Pause Music'
  }
};

// --- Iconic English Wedding Love Songs Player (Viral & Trending) ---
const weddingPlaylist = [
  {
    title: 'Ed Sheeran - Perfect',
    artist: 'Ed Sheeran',
    badge: 'Viral Wedding Anthem',
    badgeBn: 'বিশ্বসেরা ওয়েডিং সং',
    src: 'audio/ed-sheeran-perfect.mp3'
  },
  {
    title: 'Christina Perri - A Thousand Years',
    artist: 'Christina Perri',
    badge: 'Iconic Wedding Vows',
    badgeBn: 'চিরন্তন ওয়েডিং লাভ সং',
    src: 'audio/a-thousand-years.mp3'
  }
];

let currentTrackIndex = 0;
let weddingAudio = null;
let currentVolume = 0.40;

function initWeddingAudio() {
  if (!weddingAudio) {
    weddingAudio = new Audio();
    weddingAudio.src = weddingPlaylist[currentTrackIndex].src;
    weddingAudio.loop = true;
    weddingAudio.volume = currentVolume;
    weddingAudio.preload = 'auto';

    weddingAudio.addEventListener('ended', () => {
      nextWeddingTrack();
    });
  }
}

function updateMusicUI(playing) {
  const soundWave = document.getElementById('sound-wave');
  const musicLabel = document.getElementById('music-label');
  const vinylDisc = document.getElementById('vinyl-disc');
  const songTitleEl = document.getElementById('current-song-title');

  if (songTitleEl) {
    songTitleEl.textContent = weddingPlaylist[currentTrackIndex].title;
  }

  if (playing) {
    if (soundWave) soundWave.classList.remove('paused');
    if (vinylDisc) vinylDisc.classList.add('animate-spin-slow');
    if (musicLabel) musicLabel.textContent = currentLang === 'bn' ? 'মিউজিক থামান' : 'Pause Music';
  } else {
    if (soundWave) soundWave.classList.add('paused');
    if (vinylDisc) vinylDisc.classList.remove('animate-spin-slow');
    if (musicLabel) musicLabel.textContent = currentLang === 'bn' ? 'মিউজিক চালান' : 'Play Music';
  }
}

function toggleAmbientMusic() {
  initWeddingAudio();

  if (isAudioPlaying) {
    weddingAudio.pause();
    isAudioPlaying = false;
    updateMusicUI(false);
  } else {
    weddingAudio.play().then(() => {
      isAudioPlaying = true;
      updateMusicUI(true);
    }).catch(err => {
      console.log('Play error:', err);
    });
  }
}

function nextWeddingTrack() {
  initWeddingAudio();
  currentTrackIndex = (currentTrackIndex + 1) % weddingPlaylist.length;
  const wasPlaying = isAudioPlaying;
  weddingAudio.src = weddingPlaylist[currentTrackIndex].src;
  weddingAudio.currentTime = 0;
  
  if (wasPlaying) {
    weddingAudio.play().then(() => {
      isAudioPlaying = true;
      updateMusicUI(true);
    }).catch(err => console.log(err));
  } else {
    updateMusicUI(false);
  }
}

function setAmbientVolume(val) {
  currentVolume = parseFloat(val);
  if (weddingAudio) {
    weddingAudio.volume = currentVolume;
  }
  const volDisplay = document.getElementById('music-vol-val');
  if (volDisplay) {
    volDisplay.textContent = Math.round(currentVolume * 100) + '%';
  }
}

// Automatic Playback Handler: Starts immediately on page load with fallback on first touch/click
function attemptAutoPlay() {
  initWeddingAudio();
  const playPromise = weddingAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isAudioPlaying = true;
      updateMusicUI(true);
    }).catch(() => {
      // Browser autoplay policy blocked cold autoplay: trigger on first user gesture anywhere
      const triggerPlayOnGesture = () => {
        if (!isAudioPlaying && weddingAudio) {
          weddingAudio.play().then(() => {
            isAudioPlaying = true;
            updateMusicUI(true);
          }).catch(e => console.log(e));
        }
        ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
          window.removeEventListener(evt, triggerPlayOnGesture);
        });
      };
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.addEventListener(evt, triggerPlayOnGesture, { passive: true });
      });
    });
  }
}

// --- Floating Golden Particles / Petals Canvas ---
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = 38;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03,
      isPetal: Math.random() > 0.65
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.beginPath();

      if (p.isPetal) {
        // Soft golden rose petal
        ctx.fillStyle = `rgba(225, 178, 120, ${p.opacity * 0.6})`;
        ctx.ellipse(p.x, p.y, p.size * 2, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Golden sparkle
        ctx.fillStyle = `rgba(243, 229, 171, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 8;
      }

      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// --- Render Gallery & Filtering ---
function renderGallery(filter = 'all') {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => {
        if (Array.isArray(item.category)) {
          return item.category.includes(filter);
        }
        return item.category === filter;
      });

  container.innerHTML = filtered.map((item, index) => {
    const title = currentLang === 'bn' ? item.titleBn : item.titleEn;
    const couple = currentLang === 'bn' ? item.coupleBn : item.coupleEn;
    const venue = currentLang === 'bn' ? item.venueBn : item.venueEn;

    return `
      <div class="gallery-card relative group rounded-2xl overflow-hidden cursor-pointer border border-amber-900/30 transition-all duration-500 hover:border-amber-400/60"
           onclick="openLightbox(${item.id})">
        <div class="gallery-img-container aspect-[4/5] w-full bg-stone-900 overflow-hidden">
          <img src="${item.img}" alt="${title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        </div>

        <!-- Studio Logo Watermark Tag -->
        <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-300 z-10 shadow-lg pointer-events-none">
          <img src="images/logo.png" alt="Wedding Affairs Logo" class="w-3.5 h-3.5 object-contain" />
          <span class="font-cinzel text-[9px] uppercase tracking-wider text-amber-200">Wedding Affairs</span>
        </div>
        
        <div class="gallery-overlay absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div class="transform translate-y-4 group-hover:translate-y-0 transition duration-300">
            <span class="inline-block text-xs uppercase tracking-widest text-amber-300/90 font-semibold mb-1">
              ${couple}
            </span>
            <h4 class="font-cormorant text-2xl font-bold text-white mb-1">${title}</h4>
            <p class="text-xs text-stone-300 flex items-center gap-1.5 font-light">
              <svg class="w-3.5 h-3.5 text-amber-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              ${venue}
            </p>
          </div>
        </div>

        <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
        </div>
      </div>
    `;
  }).join('');
}

function setupGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60');
        t.classList.add('text-stone-400', 'border-stone-800');
      });
      tab.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60');
      tab.classList.remove('text-stone-400', 'border-stone-800');
      const filter = tab.dataset.filter;
      renderGallery(filter);
    });
  });
}

// --- Lightbox Modal ---
function openLightbox(id) {
  const itemIndex = galleryItems.findIndex(i => i.id === id);
  if (itemIndex === -1) return;
  currentLightboxIndex = itemIndex;
  updateLightboxContent();

  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
  updateLightboxContent();
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = galleryItems[currentLightboxIndex];
  if (!item) return;

  const title = currentLang === 'bn' ? item.titleBn : item.titleEn;
  const couple = currentLang === 'bn' ? item.coupleBn : item.coupleEn;
  const venue = currentLang === 'bn' ? item.venueBn : item.venueEn;

  document.getElementById('lightbox-img').src = item.img;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-couple').textContent = couple;
  document.getElementById('lightbox-venue').textContent = venue;
}

// Keyboard shortcuts for Lightbox
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightbox-modal');
  if (!modal || !modal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightboxImage();
  if (e.key === 'ArrowLeft') prevLightboxImage();
});

// --- Dynamic Interactive Cost Calculator ---
function calculateCustomCost() {
  const days = parseInt(document.getElementById('calc-days').value) || 1;
  const teamTier = document.getElementById('calc-team').value;
  
  // Base cost per day
  let basePerDay = 30000;
  if (teamTier === 'senior') basePerDay = 45000;
  if (teamTier === 'chief') basePerDay = 65000;

  let total = basePerDay * days;

  // Add-ons
  const drone = document.getElementById('addon-drone').checked;
  const sde = document.getElementById('addon-sde').checked;
  const prewed = document.getElementById('addon-prewed').checked;
  const album = document.getElementById('addon-album').checked;
  const booth = document.getElementById('addon-booth').checked;

  if (drone) total += 15000;
  if (sde) total += 20000;
  if (prewed) total += 25000;
  if (album) total += 18000;
  if (booth) total += 22000;

  // Format with commas and Bangladeshi Taka sign
  const formatted = '৳ ' + total.toLocaleString('en-IN');
  const totalElem = document.getElementById('calc-total-display');
  if (totalElem) {
    totalElem.textContent = formatted;
    totalElem.classList.add('scale-105', 'text-amber-300');
    setTimeout(() => totalElem.classList.remove('scale-105'), 200);
  }
}

function applyCustomQuoteToForm() {
  const days = document.getElementById('calc-days').value;
  const teamTier = document.getElementById('calc-team').options[document.getElementById('calc-team').selectedIndex].text;
  const total = document.getElementById('calc-total-display').textContent;

  const pkgSelect = document.getElementById('inquiry-package');
  if (pkgSelect) {
    pkgSelect.value = 'Custom Bespoke Package';
  }

  const msgField = document.getElementById('inquiry-message');
  if (msgField) {
    msgField.value = `Custom Package Request: ${days} Day(s), ${teamTier}. Estimated Investment: ${total}.`;
  }

  handlePackageChangeInForm();

  // Smooth scroll to contact form
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// --- Package Rates & Pricing Multiplier Configuration ---
const packageRates = {
  // Royal Mega Collections (Multi-Day Royal Offerings - do NOT double)
  'The Golden Royale (২ দিন - ৳75,000)': { nameEn: 'The Golden Royale (2-Day Grandeur)', nameBn: 'The Golden Royale (২ দিন)', price: 75000, isRoyal: true },
  'The Imperial Crown (৩ দিন - ৳135,000)': { nameEn: 'The Imperial Crown (3-Day Grandeur)', nameBn: 'The Imperial Crown (৩ দিন)', price: 135000, isRoyal: true },
  'The Kohinoor Maharaja (ভিআইপি ডেস্টিনেশন - ৳195,000)': { nameEn: 'The Kohinoor Maharaja (VIP Destination)', nameBn: 'The Kohinoor Maharaja (ভিআইপি)', price: 195000, isRoyal: true },

  // Single Event Packages (Packages A - G) • 5 Hours Single Shift base price, doubles for double shift
  'Package A: Classic Aura (৳4,999)': { nameEn: 'Package A: Classic Aura', nameBn: 'প্যাকেজ A: ক্লাসিক অরা', price: 4999, isRoyal: false },
  'Package B: Cinematic Glance (৳4,999)': { nameEn: 'Package B: Cinematic Glance', nameBn: 'প্যাকেজ B: সিনেমাটিক গ্লান্স', price: 4999, isRoyal: false },
  'Package C: Grace Duo (৳12,000)': { nameEn: 'Package C: Grace Duo', nameBn: 'প্যাকেজ C: গ্রেস ডুও', price: 12000, isRoyal: false },
  'Package D: Elegance Premium (৳15,999)': { nameEn: 'Package D: Elegance Premium', nameBn: 'প্যাকেজ D: এলিগ্যান্স প্রিমিয়াম', price: 15999, isRoyal: false },
  'Package E: Royal Splendor (৳25,999)': { nameEn: 'Package E: Royal Splendor', nameBn: 'প্যাকেজ E: রয়্যাল স্প্লেন্ডার', price: 25999, isRoyal: false },
  'Package F: Majestic Masterpiece (৳35,999)': { nameEn: 'Package F: Majestic Masterpiece', nameBn: 'প্যাকেজ F: ম্যাজেস্টিক মাস্টারপিস', price: 35999, isRoyal: false },
  'Package G: Grand Sovereign (৳50,999)': { nameEn: 'Package G: Grand Sovereign', nameBn: 'প্যাকেজ G: গ্র্যান্ড সভরেন', price: 50999, isRoyal: false }
};

let activeShiftChoice = 'day'; // 'day' | 'night' | 'double'

function getSelectedPackageInfo() {
  const pkgSelect = document.getElementById('inquiry-package');
  const pkgVal = pkgSelect ? pkgSelect.value : 'Package A: Classic Aura (৳4,999)';

  // Try exact or prefix/key match
  for (const [key, info] of Object.entries(packageRates)) {
    if (pkgVal === key || pkgVal.includes(key.split(':')[0]) || key.startsWith(pkgVal.slice(0, 15))) {
      return { raw: pkgVal, key, ...info };
    }
  }

  // Handle custom bespoke quote
  if (pkgVal.includes('Custom Bespoke') || pkgVal.includes('কাস্টম')) {
    const totalDisplay = document.getElementById('calc-total-display');
    let customPrice = 35000;
    if (totalDisplay) {
      const match = totalDisplay.textContent.replace(/[^\d]/g, '');
      if (match) customPrice = parseInt(match, 10);
    }
    return {
      raw: pkgVal,
      key: 'Custom Bespoke Package',
      nameEn: 'Custom Bespoke Package',
      nameBn: 'কাস্টম কোটেশন প্যাকেজ',
      price: customPrice,
      isRoyal: false
    };
  }

  return {
    raw: pkgVal,
    key: 'Standard',
    nameEn: 'Standard Wedding Package',
    nameBn: 'স্ট্যান্ডার্ড প্যাকেজ',
    price: 4999,
    isRoyal: false
  };
}

// --- Shift Selection Management (3 Shifts Only: Day, Night, Double) ---
function setShiftChoice(choice) {
  let normalized = 'day';
  if (typeof choice === 'string') {
    const c = choice.toLowerCase();
    if (c === 'night' || c.includes('night') || c.includes('নাইট')) {
      normalized = 'night';
    } else if (c === 'double' || c.includes('double') || c.includes('ডাবল')) {
      normalized = 'double';
    } else {
      normalized = 'day';
    }
  }

  activeShiftChoice = normalized;

  // Update <select id="inquiry-shift"> dropdown
  const shiftSelect = document.getElementById('inquiry-shift');
  if (shiftSelect) {
    shiftSelect.value = normalized;
  }

  // Update quick pills visual state (Day, Night, Double)
  const pills = {
    day: document.getElementById('shift-pill-day'),
    night: document.getElementById('shift-pill-night'),
    double: document.getElementById('shift-pill-double')
  };

  const activeClasses = ['bg-amber-400/20', 'text-amber-300', 'border-amber-400/60', 'shadow', 'ring-1', 'ring-amber-400/40'];
  const inactiveClasses = ['bg-stone-900', 'text-stone-300', 'border-stone-700', 'hover:border-amber-400/50'];

  Object.keys(pills).forEach((k) => {
    const pill = pills[k];
    if (pill) {
      if (k === normalized) {
        inactiveClasses.forEach(cls => pill.classList.remove(cls));
        activeClasses.forEach(cls => pill.classList.add(cls));
      } else {
        activeClasses.forEach(cls => pill.classList.remove(cls));
        inactiveClasses.forEach(cls => pill.classList.add(cls));
      }
    }
  });

  updateShiftPricingDisplay();
}

function handleShiftSelectChange(val) {
  setShiftChoice(val);
}

// --- When Package Selection changes manually in form ---
function handlePackageChangeInForm() {
  updateShiftPricingDisplay();
}

// --- Live Dynamic Calculation Display ---
function updateShiftPricingDisplay() {
  const pkg = getSelectedPackageInfo();
  const descEl = document.getElementById('live-shift-desc');
  const totalEl = document.getElementById('live-shift-total');
  const badgeEl = document.getElementById('live-shift-badge');

  if (!descEl || !totalEl || !badgeEl) return;

  const isDouble = activeShiftChoice === 'double';
  const multiplier = (isDouble && !pkg.isRoyal) ? 2 : 1;
  const calculatedTotal = pkg.price * multiplier;

  const pkgTitle = currentLang === 'bn' ? (pkg.nameBn || pkg.raw) : (pkg.nameEn || pkg.raw);

  let shiftLabel = '';
  if (activeShiftChoice === 'day') {
    shiftLabel = currentLang === 'bn' ? '☀️ ডে শিফট (দুপুর ১২:০০ PM – বিকাল ৫:০০ PM • ৫ ঘণ্টা)' : '☀️ Day Shift (12:00 PM – 5:00 PM • 5 Hours)';
  } else if (activeShiftChoice === 'night') {
    shiftLabel = currentLang === 'bn' ? '🌙 নাইট শিফট (সন্ধ্যা ৬:০০ PM – রাত ১১:০০ PM • ৫ ঘণ্টা)' : '🌙 Night Shift (6:00 PM – 11:00 PM • 5 Hours)';
  } else {
    shiftLabel = currentLang === 'bn' ? '⚡ ডাবল শিফট (ফুল ডে • দুপুর ১২:০০ PM – রাত ১১:০০ PM)' : '⚡ Double Shift (Full Day • 12:00 PM – 11:00 PM)';
  }

  descEl.innerHTML = `<span class="text-amber-300 font-semibold">${pkgTitle}</span> • <span class="text-stone-300">${shiftLabel}</span>`;
  totalEl.textContent = `৳ ${calculatedTotal.toLocaleString('en-US')}`;

  if (pkg.isRoyal) {
    badgeEl.innerHTML = currentLang === 'bn'
      ? `<span class="text-amber-300 font-semibold">👑 রয়্যাল মেগা কালেকশন (ফিক্সড রেট)</span>`
      : `<span class="text-amber-300 font-semibold">👑 Royal Mega Collection (Fixed Rate)</span>`;
  } else if (isDouble) {
    badgeEl.innerHTML = currentLang === 'bn'
      ? `<span class="text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/50">⚡ দ্বিগুণ মূল্য: ৳${pkg.price.toLocaleString('en-US')} × ২ = ৳${calculatedTotal.toLocaleString('en-US')}</span>`
      : `<span class="text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/50">⚡ 2x Multiplier: ৳${pkg.price.toLocaleString('en-US')} × 2 = ৳${calculatedTotal.toLocaleString('en-US')}</span>`;
  } else {
    badgeEl.innerHTML = currentLang === 'bn'
      ? `<span class="text-emerald-400 font-medium">১x সিঙ্গেল শিফট রেট (৫ ঘণ্টা)</span>`
      : `<span class="text-emerald-400 font-medium">1x Single Shift Rate (5 Hours)</span>`;
  }
}

// --- Pre-fill package & shift into booking form ---
function selectPackageWithShift(packageName, shiftChoice) {
  selectPackageForBooking(packageName);
  if (shiftChoice) {
    setShiftChoice(shiftChoice);
  } else {
    updateShiftPricingDisplay();
  }
}

function selectPackageForBooking(packageName) {
  const pkgSelect = document.getElementById('inquiry-package');
  if (pkgSelect) {
    let matched = false;
    for (let i = 0; i < pkgSelect.options.length; i++) {
      const optVal = pkgSelect.options[i].value;
      if (optVal === packageName || optVal.includes(packageName.split(':')[0]) || optVal.startsWith(packageName.slice(0, 15))) {
        pkgSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      pkgSelect.value = packageName;
    }
    handlePackageChangeInForm();
  }
  const contactSec = document.getElementById('contact');
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: 'smooth' });
    const formBox = document.getElementById('contact-form-container');
    if (formBox) {
      formBox.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => formBox.classList.remove('ring-2', 'ring-amber-400'), 1500);
    }
  }
}

// --- Check Date Quick Availability ---
function checkDateAvailability(e) {
  e.preventDefault();
  const dateVal = document.getElementById('quick-date').value;
  const shiftSelect = document.getElementById('quick-shift');
  const shiftVal = shiftSelect ? shiftSelect.value : '☀️ ডে শিফট (১২:০০ PM – ৫:০০ PM)';
  const cityVal = document.getElementById('quick-location').value;
  const eventVal = document.getElementById('quick-event').value;

  if (!dateVal) {
    alert(currentLang === 'bn' ? 'দয়া করে আপনার বিয়ের সম্ভাব্য তারিখটি নির্বাচন করুন।' : 'Please select your tentative wedding date.');
    return;
  }

  const alertModal = document.getElementById('avail-modal');
  const alertText = document.getElementById('avail-modal-text');

  if (currentLang === 'bn') {
    alertText.innerHTML = `
      <div class="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
        <span>🎉</span> <span>সুখবর! আপনার কাঙ্ক্ষিত তারিখ ও শিফট খালি আছে!</span>
      </div>
      <div class="text-stone-300 text-sm space-y-1 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
        <p><strong>তারিখ:</strong> <span class="text-white">${dateVal}</span></p>
        <p><strong>শিফট:</strong> <span class="text-amber-300 font-medium">${shiftVal}</span></p>
        <p><strong>ভেন্যু/শহর:</strong> <span class="text-white">${cityVal || 'রংপুর'}</span></p>
        <p><strong>ইভেন্ট:</strong> <span class="text-white">${eventVal}</span></p>
      </div>
      <p class="text-xs text-amber-200/80 mt-3">এই শিফটে আমাদের সিগনেচার টিম নিশ্চিত করতে নিচের বুকিং ফর্মটি সাবমিট করুন।</p>
    `;
  } else {
    alertText.innerHTML = `
      <div class="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
        <span>🎉</span> <span>Wonderful news! Your date and shift are available!</span>
      </div>
      <div class="text-stone-300 text-sm space-y-1 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
        <p><strong>Date:</strong> <span class="text-white">${dateVal}</span></p>
        <p><strong>Shift:</strong> <span class="text-amber-300 font-medium">${shiftVal}</span></p>
        <p><strong>Venue/City:</strong> <span class="text-white">${cityVal || 'Rangpur'}</span></p>
        <p><strong>Event:</strong> <span class="text-white">${eventVal}</span></p>
      </div>
      <p class="text-xs text-amber-200/80 mt-3">Please submit the booking form below to secure our signature crew for this shift.</p>
    `;
  }

  // Pre-fill date & shift in main contact form
  const mainDate = document.getElementById('inquiry-date');
  if (mainDate) mainDate.value = dateVal;

  const mainVenue = document.getElementById('inquiry-venue');
  if (mainVenue && cityVal) mainVenue.value = cityVal;

  if (shiftVal.includes('ডে শিফট')) {
    setShiftChoice('day');
  } else if (shiftVal.includes('নাইট শিফট')) {
    setShiftChoice('night');
  } else if (shiftVal.includes('ডাবল শিফট')) {
    setShiftChoice('double');
  } else {
    setShiftChoice('day');
  }

  alertModal.classList.remove('hidden');
}

function closeAvailModal() {
  document.getElementById('avail-modal').classList.add('hidden');
}

// --- Inquiry Form Submission & Direct WhatsApp Integration ---
function handleInquirySubmit(e) {
  e.preventDefault();

  const name = document.getElementById('inquiry-name').value.trim();
  const phone = document.getElementById('inquiry-phone').value.trim();
  const email = document.getElementById('inquiry-email').value.trim();
  const date = document.getElementById('inquiry-date').value;
  const venue = document.getElementById('inquiry-venue').value.trim();
  const notes = document.getElementById('inquiry-message').value.trim();

  if (!name || !phone) {
    alert(currentLang === 'bn' ? 'দয়া করে আপনার নাম এবং ফোন নম্বর প্রদান করুন।' : 'Please enter your name and phone number.');
    return;
  }

  const pkg = getSelectedPackageInfo();
  const isDouble = activeShiftChoice === 'double';
  const multiplier = (isDouble && !pkg.isRoyal) ? 2 : 1;
  const calculatedTotal = pkg.price * multiplier;

  let shiftLabel = '';
  let breakdownText = '';

  if (activeShiftChoice === 'day') {
    shiftLabel = '☀️ ডে শিফট: দুপুর ১২:০০ PM – বিকাল ৫:০০ PM (১টি শিফট • ৫ ঘণ্টা)';
    breakdownText = `৳${pkg.price.toLocaleString('en-US')} × 1 (Single Shift Rate • 5 Hours) = ৳${calculatedTotal.toLocaleString('en-US')}`;
  } else if (activeShiftChoice === 'night') {
    shiftLabel = '🌙 নাইট শিফট: সন্ধ্যা ৬:০০ PM – রাত ১১:০০ PM (১টি শিফট • ৫ ঘণ্টা)';
    breakdownText = `৳${pkg.price.toLocaleString('en-US')} × 1 (Single Shift Rate • 5 Hours) = ৳${calculatedTotal.toLocaleString('en-US')}`;
  } else {
    shiftLabel = '⚡ ডাবল শিফট (ফুল ডে): দুপুর ১২:০০ PM – রাত ১১:০০ PM (২টি শিফট • দ্বিগুণ মূল্য)';
    breakdownText = pkg.isRoyal
      ? `৳${pkg.price.toLocaleString('en-US')} (Royal Mega Collection Fixed Rate)`
      : `৳${pkg.price.toLocaleString('en-US')} × 2 (Double Shift / Full Day Coverage) = ৳${calculatedTotal.toLocaleString('en-US')}`;
  }

  // Format WhatsApp Message with explicit pricing breakdown and shift calculation
  const formattedMsg =
    `*New Wedding Booking Inquiry - Wedding Affairs*%0A%0A` +
    `*Client:* ${encodeURIComponent(name)}%0A` +
    `*Phone:* ${encodeURIComponent(phone)}%0A` +
    `*Email:* ${encodeURIComponent(email || 'N/A')}%0A` +
    `*Event Date:* ${encodeURIComponent(date || 'TBD')}%0A` +
    `*Venue & City:* ${encodeURIComponent(venue || 'TBD')}%0A` +
    `*Selected Package:* ${encodeURIComponent(pkg.raw)}%0A` +
    `*Coverage Shift:* ${encodeURIComponent(shiftLabel)}%0A` +
    `*Shift Pricing Breakdown:* ${encodeURIComponent(breakdownText)}%0A` +
    `*Total Estimated Amount:* ৳${encodeURIComponent(calculatedTotal.toLocaleString('en-US'))}%0A` +
    `*Special Notes:* ${encodeURIComponent(notes || 'None')}`;

  const studioWhatsAppNumber = '8801772337400'; // Studio WhatsApp (+880 1772-337400)
  const waUrl = `https://wa.me/${studioWhatsAppNumber}?text=${formattedMsg}`;

  // Success Modal
  const successModal = document.getElementById('success-modal');
  const detailsBox = document.getElementById('success-modal-details');

  if (detailsBox) {
    detailsBox.innerHTML = `
      <div class="space-y-2 text-sm text-stone-300">
        <div class="flex justify-between border-b border-stone-800 pb-1.5">
          <span class="text-stone-400">নাম:</span>
          <span class="text-white font-semibold">${name}</span>
        </div>
        <div class="flex justify-between border-b border-stone-800 pb-1.5">
          <span class="text-stone-400">ফোন:</span>
          <span class="text-white font-semibold">${phone}</span>
        </div>
        <div class="flex justify-between border-b border-stone-800 pb-1.5">
          <span class="text-stone-400">তারিখ:</span>
          <span class="text-white">${date || 'নির্ধারিত হয়নি'}</span>
        </div>
        <div class="flex justify-between border-b border-stone-800 pb-1.5">
          <span class="text-stone-400">শিফট:</span>
          <span class="text-amber-300 font-medium">${activeShiftChoice === 'double' ? '⚡ ডাবল শিফট (ফুল ডে)' : activeShiftChoice === 'night' ? '🌙 নাইট শিফট (৫ ঘণ্টা)' : '☀️ ডে শিফট (৫ ঘণ্টা)'}</span>
        </div>
        <div class="flex justify-between border-b border-stone-800 pb-1.5">
          <span class="text-stone-400">প্যাকেজ:</span>
          <span class="text-amber-200 font-medium text-right max-w-[220px] truncate">${pkg.raw}</span>
        </div>
        <div class="p-3 rounded-xl bg-black/60 border border-amber-500/40 mt-2 space-y-1">
          <div class="flex justify-between text-xs text-stone-300">
            <span>হিসাব ব্রেকডাউন:</span>
            <span class="font-mono text-amber-300 text-right">${breakdownText}</span>
          </div>
          <div class="flex justify-between text-base font-bold text-amber-300 pt-1.5 border-t border-stone-800">
            <span>আনুমানিক মোট:</span>
            <span class="font-cormorant text-2xl font-bold">৳ ${calculatedTotal.toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>
    `;
  }

  const directWaBtn = document.getElementById('whatsapp-direct-btn');
  if (directWaBtn) {
    directWaBtn.href = waUrl;
  }

  if (successModal) {
    successModal.classList.remove('hidden');
  }

  // Reset form and reset shift to 'day'
  document.getElementById('inquiry-form').reset();
  setShiftChoice('day');
}

function closeSuccessModal() {
  document.getElementById('success-modal').classList.add('hidden');
}

// --- Language Toggle Logic ---
function switchLanguage(lang) {
  currentLang = lang;
  const dict = i18n[lang];

  // Update text content with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update inputs with placeholder translations
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Update active state of language buttons
  const bnBtn = document.getElementById('lang-bn');
  const enBtn = document.getElementById('lang-en');
  if (bnBtn && enBtn) {
    if (lang === 'bn') {
      bnBtn.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
      bnBtn.classList.remove('text-stone-400', 'border-transparent');
      enBtn.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
      enBtn.classList.add('text-stone-400', 'border-transparent');
    } else {
      enBtn.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
      enBtn.classList.remove('text-stone-400', 'border-transparent');
      bnBtn.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/40');
      bnBtn.classList.add('text-stone-400', 'border-transparent');
    }
  }

  // Re-render gallery with new language
  const activeTab = document.querySelector('.gallery-tab.bg-amber-400\\/20');
  const currentFilter = activeTab ? activeTab.dataset.filter : 'all';
  renderGallery(currentFilter);

  // Recalculate cost labels if any
  calculateCustomCost();

  // Update dynamic shift pricing display
  updateShiftPricingDisplay();
}

// --- FAQ Accordion ---
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-content').classList.add('hidden');
        i.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-content').classList.remove('hidden');
        item.querySelector('.faq-icon').style.transform = 'rotate(180deg)';
      }
    });
  });
}

// --- Navbar Mobile Menu & Sticky Blur ---
function setupNavbar() {
  const nav = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('glass-nav', 'py-3');
      nav.classList.remove('py-5');
    } else {
      nav.classList.remove('glass-nav', 'py-3');
      nav.classList.add('py-5');
    }
  });

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// --- Package Filter Tabs ---
function setupPackageTabs() {
  const tabs = document.querySelectorAll('.package-filter-tab');
  const cards = document.querySelectorAll('.package-card-item');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60', 'shadow-lg');
        t.classList.add('text-stone-400', 'border-stone-800');
      });
      tab.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60', 'shadow-lg');
      tab.classList.remove('text-stone-400', 'border-stone-800');

      const filter = tab.dataset.pkgFilter;
      cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// --- Team Filter Tabs & Artist Booking ---
function setupTeamTabs() {
  const tabs = document.querySelectorAll('.team-filter-tab');
  const cards = document.querySelectorAll('.team-card-item');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60', 'shadow-lg');
        t.classList.add('text-stone-400', 'border-stone-800');
      });
      tab.classList.add('bg-amber-400/20', 'text-amber-300', 'border-amber-400/60', 'shadow-lg');
      tab.classList.remove('text-stone-400', 'border-stone-800');

      const filter = tab.dataset.teamFilter;
      cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function bookArtist(name, role) {
  const contactSec = document.getElementById('contact');
  if (!contactSec) return;

  const notesField = document.getElementById('inquiry-message');
  if (notesField) {
    const existing = notesField.value.trim();
    const artistTag = `[নির্বাচিত আর্টিস্ট: ${name} (${role})]`;
    if (!existing.includes(artistTag)) {
      notesField.value = existing ? `${existing}\n${artistTag}` : `${artistTag} - আমি এই আর্টিস্টের কাভারেজ আমার অনুষ্ঠানে নিশ্চিত করতে চাই।`;
    }
  }

  contactSec.scrollIntoView({ behavior: 'smooth' });

  // Highlight form
  const formBox = document.getElementById('contact-form-container');
  if (formBox) {
    formBox.classList.add('ring-2', 'ring-amber-400');
    setTimeout(() => formBox.classList.remove('ring-2', 'ring-amber-400'), 2200);
  }

  showArtistToast(name, role);
}

function showArtistToast(name, role) {
  let toast = document.getElementById('artist-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'artist-toast';
    toast.className = 'fixed bottom-24 right-6 z-50 bg-stone-900/95 border border-amber-400 text-stone-100 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl transition-all duration-300 transform translate-y-10 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-lg">✓</div>
    <div>
      <h5 class="text-xs font-bold text-amber-300">আর্টিস্ট নির্বাচন করা হয়েছে!</h5>
      <p class="text-[11px] text-stone-300 font-medium">${name} • ${role}</p>
    </div>
  `;

  toast.classList.remove('translate-y-10', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 4500);
}

// --- Initialize Everything on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  setupGalleryTabs();
  setupPackageTabs();
  setupTeamTabs();
  setupFaqAccordion();
  setupNavbar();
  calculateCustomCost();

  // Initialize in English by default as requested
  switchLanguage('en');
  setShiftChoice('day');

  // Attempt automatic wedding song playback on page open
  attemptAutoPlay();

  // Set min date for date inputs to today
  const today = new Date().toISOString().split('T')[0];
  const qDate = document.getElementById('quick-date');
  const iDate = document.getElementById('inquiry-date');
  if (qDate) qDate.min = today;
  if (iDate) iDate.min = today;

  // Language switcher listeners
  document.getElementById('lang-bn')?.addEventListener('click', () => switchLanguage('bn'));
  document.getElementById('lang-en')?.addEventListener('click', () => switchLanguage('en'));

  // Music toggle listener
  document.getElementById('music-toggle-btn')?.addEventListener('click', toggleAmbientMusic);
  document.getElementById('music-floating-btn')?.addEventListener('click', toggleAmbientMusic);

  // Volume slider listener
  const volSlider = document.getElementById('ambient-volume-slider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => setAmbientVolume(e.target.value));
  }

  // Form listeners
  document.getElementById('quick-avail-form')?.addEventListener('submit', checkDateAvailability);
  document.getElementById('inquiry-form')?.addEventListener('submit', handleInquirySubmit);

  // Calculator listeners
  document.getElementById('calc-days')?.addEventListener('input', calculateCustomCost);
  document.getElementById('calc-team')?.addEventListener('change', calculateCustomCost);
  document.getElementById('addon-drone')?.addEventListener('change', calculateCustomCost);
  document.getElementById('addon-sde')?.addEventListener('change', calculateCustomCost);
  document.getElementById('addon-prewed')?.addEventListener('change', calculateCustomCost);
  document.getElementById('addon-album')?.addEventListener('change', calculateCustomCost);
  document.getElementById('addon-booth')?.addEventListener('change', calculateCustomCost);

  // Check if an artist was selected from team.html
  const storedArtist = sessionStorage.getItem('selectedArtist');
  if (storedArtist) {
    const notesField = document.getElementById('inquiry-message');
    if (notesField) {
      notesField.value = storedArtist;
      sessionStorage.removeItem('selectedArtist');
      setTimeout(() => {
        const contactSec = document.getElementById('contact');
        contactSec?.scrollIntoView({ behavior: 'smooth' });
        const formBox = document.getElementById('contact-form-container');
        if (formBox) {
          formBox.classList.add('ring-2', 'ring-amber-400');
          setTimeout(() => formBox.classList.remove('ring-2', 'ring-amber-400'), 2500);
        }
      }, 400);
    }
  }
});

