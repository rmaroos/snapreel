// Snap Reel Initial Seed Data & Default Settings

export const DESIGNATED_ADMIN_EMAIL = "snapreel2008@gmail.com";

export const DEFAULT_BRANDING = {
  appName: "Snap Reel",
  subtitle: "Unlimited Short Dramas",
  logoUrl: "/logo.jpg",
  logoHeight: 46,
  logoGlow: true,
  primaryColor: "#ff007f", // Vibrant magenta/pink
  secondaryColor: "#e50914", // Crimson red
  tagline: "Unlimited Short Dramas & Exclusive Reels with Sinhala & Tamil Subtitles",
  supportEmail: "support@snapreel.com",
  supportPhone: "+94 77 928 4120",
  whatsappNumber: "+94779284120",
  telegramHandle: "@snapreel_official",
  aboutUsTitle: "About Snap Reel",
  aboutUsContent: `Welcome to Snap Reel, the premier destination for high-octane, emotionally gripping short-form drama series. Designed for mobile-first binge-watching, we bring bite-sized cinema straight to your screen with episodes under 2 minutes each.

Our mission is to bring global storytelling with authentic localization, offering English voice tracks paired with studio-grade Sinhala and Tamil subtitles rendered with maximum readability. Whether you crave billionaire romance, heart-stopping revenge, martial arts reincarnation, or modern fantasy, Snap Reel delivers non-stop twists and turns anytime, anywhere.`,
  bannerAnnouncement: "🔥 Flash Sale: Get 50% OFF Weekly, Monthly & Yearly VIP! Unlock All Episodes 11+",
  bannerActive: true,
};

// Exactly two dedicated API keys for Admin
export const DEFAULT_ADMIN_SETTINGS = {
  paymentGatewayApiKey: "pk_live_snapreel_gateway_sec_99482103",
  aiProApiKey: "ai_pro_live_snapreel_engine_88492018_si_ta"
};

// Default episode unlock pricing (15 Coins)
export const DEFAULT_EPISODE_UNLOCK_COINS = 15;

// Monetization: Membership plans (Weekly, Monthly, Yearly)
export const DEFAULT_MEMBERSHIP_PLANS = [
  {
    id: "Weekly",
    name: "Weekly VIP Pass",
    price: 4.99,
    originalPrice: 9.99,
    billingCycle: "7 Days",
    badge: "Flexible",
    description: "Ideal for a weekend binge marathon",
    features: [
      "Unlock Episode 11+ on all ongoing series",
      "Studio AI Sinhala & Tamil subtitles",
      "Full HD 1080p video resolution selector",
      "Download episodes for offline playback",
      "No video watermarks or embedded ads"
    ]
  },
  {
    id: "Monthly",
    name: "Monthly VIP Elite",
    price: 14.99,
    originalPrice: 29.99,
    billingCycle: "30 Days",
    badge: "🔥 Best Value",
    description: "Our most popular VIP streaming tier",
    features: [
      "All Weekly VIP perks included",
      "Instant access to 200+ drama library",
      "Unlimited 1080p / 720p offline downloads",
      "Early premiere access to Coming Soon series",
      "Priority customer support channel"
    ]
  },
  {
    id: "Yearly",
    name: "Annual VIP All-Access",
    price: 99.99,
    originalPrice: 199.99,
    billingCycle: "365 Days",
    badge: "👑 Maximum Savings",
    description: "Complete 1-year unlimited drama access",
    features: [
      "All Monthly Elite privileges for 12 months",
      "Massive annual savings over monthly billing",
      "Unlimited VIP streaming & offline downloads",
      "Exclusive creator gifts & 1,000 bonus coins",
      "Multi-device concurrent streaming"
    ]
  }
];

// Coin Buying System Packages
export const DEFAULT_COIN_PACKAGES = [
  { id: "coin-20", coins: 20, price: 1.99, bonus: 0, tag: "Starter" },
  { id: "coin-50", coins: 50, price: 3.99, bonus: 5, tag: "Popular" },
  { id: "coin-100", coins: 100, price: 6.99, bonus: 15, tag: "🔥 Best Value" },
  { id: "coin-250", coins: 250, price: 14.99, bonus: 40, tag: "Binge Pack" },
  { id: "coin-500", coins: 500, price: 24.99, bonus: 100, tag: "Ultimate" }
];

// Public Discounts Module (Admin managed, available to ANY user unless overridden by private voucher)
export const DEFAULT_PUBLIC_DISCOUNT = {
  enabled: true,
  type: "percentage", // "percentage" or "flat"
  value: 50, // 50%
  label: "50% Global Flash Sale",
  bannerText: "⚡ Limited-Time Public Discount: 50% OFF All Memberships & Coin Packs!"
};

// Page Layout and content configurations for Admin Layout Editor
export const DEFAULT_PAGE_LAYOUTS = {
  home: {
    heroEnabled: true,
    comingSoonEnabled: true,
    categoriesEnabled: true,
    dramaGridColumns: 6,
    announcementEnabled: true
  },
  foryou: {
    autoAdvance: true,
    enable2xGesture: true,
    defaultSubtitleLang: "si",
    showQualitySelector: true,
    showDownloadButton: true
  },
  mylist: {
    enabledTabs: ["favorites", "history", "reminders", "following", "saved"],
    showQuickResume: true
  },
  profile: {
    showReferralModule: true,
    referralRewardAmount: 100,
    showDailyCheckIn: true,
    dailyRewardAmount: 50,
    showAboutUsModal: true,
    showSupportModal: true
  }
};

export const DEFAULT_PRIVACY_POLICY = [
  {
    id: "priv-1",
    title: "1. Strict User Data Encryption",
    content: "All personal information collected by Drama Hub / Snap Reel—including email addresses, unique User IDs, watch history, and device telemetry—is encrypted using industry-standard AES-256 bit encryption at rest and TLS 1.3 in transit. We prioritize absolute protection against unauthorized access."
  },
  {
    id: "priv-2",
    title: "2. Non-Sharing & Confidentiality Guarantee",
    content: "We maintain a strict zero-leakage pledge. We do not sell, rent, monetize, or disclose your personal contact information, browsing habits, or account data to third-party advertisers or brokers under any circumstances."
  },
  {
    id: "priv-3",
    title: "3. Secure SSL Payment & Card Processing",
    content: "All financial transactions, subscription billings, coin purchases, and voucher redemptions are routed through Level-1 PCI-DSS compliant payment gateways protected by 2048-bit SSL certification. We never store raw credit card numbers or CVV codes on our servers."
  },
  {
    id: "priv-4",
    title: "4. Account Anonymity & Unique User IDs",
    content: "Every user account is automatically assigned an 8-digit randomized unique identifier upon OTP verification. Your activity across the platform is tied strictly to this internal ID to preserve identity confidentiality."
  },
  {
    id: "priv-5",
    title: "5. Cookies & Local Cache Policy",
    content: "We use essential local session storage strictly for maintaining seamless authentication, caching video subtitle preferences (Sinhala/Tamil/English), and remembering your last played episode timestamps."
  },
  {
    id: "priv-6",
    title: "6. User Rights & Data Deletion",
    content: "You retain full control over your profile data. At any time, you may request complete deletion of your account, watch logs, and coin balances through our Help & Support portal or directly contacting support@snapreel.com."
  }
];

export const DEFAULT_TERMS = [
  {
    id: "term-1",
    title: "1. Acceptance of Terms & OTT Service Scope",
    content: "By creating an account or accessing any short drama video content on Drama Hub / Snap Reel, you agree to be bound by these Terms & Conditions and our Privacy Policy. We reserve the right to modify these terms with prompt notice on the site."
  },
  {
    id: "term-2",
    title: "2. Episode Unlock Rule & Subscription Tiers",
    content: "Episodes 1 through 10 of all featured short-drama series are available free of charge. Access to Episode 11 and onward requires an active VIP Membership (Weekly, Monthly, or Yearly tier). Non-members are restricted from accessing VIP episodes and offline video downloads."
  },
  {
    id: "term-3",
    title: "3. Non-Distribution of Copyrighted Content",
    content: "All video content, audio scores, Sinhala/Tamil subtitles, visual graphics, and branding assets on Drama Hub are protected by intellectual property laws. Recording, ripping, scraping, republishing, or redistributing our content on YouTube, TikTok, or other channels without explicit licensing is strictly prohibited and subject to legal action."
  },
  {
    id: "term-4",
    title: "4. Automated Subscription Billing & Cancellation",
    content: "Subscriptions automatically grant immediate VIP access upon confirmation. You may cancel auto-renewals at any time from your Profile settings before the start of the subsequent billing cycle."
  },
  {
    id: "term-5",
    title: "5. Community Guidelines & Code of Conduct",
    content: "Users must not engage in fraudulent behavior, abuse the referral bonus system, utilize automated bots, or upload harmful code. We reserve the right to terminate accounts found violating community safety."
  }
];

export const INITIAL_COMING_SOON = [
  {
    id: "cs-1",
    title: "Crown of Deceit: The Billionaire's Double",
    releaseDate: "Nov 02, 2026",
    daysLeft: 7,
    category: "Revenge / Billionaire",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    synopsis: "Swapped at birth, an undercover agent steps into the lavish life of a ruthless heiress to bring down a corrupt syndicate.",
    reminded: false,
    subscriberRemindersCount: 3840
  },
  {
    id: "cs-2",
    title: "Return of the Martial Immortal",
    releaseDate: "Nov 08, 2026",
    daysLeft: 13,
    category: "Urban Fantasy / Action",
    poster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    synopsis: "After 500 years of cultivation in another realm, he returns as a humble bodyguard to protect his daughter and conquer the city.",
    reminded: false,
    subscriberRemindersCount: 5120
  },
  {
    id: "cs-3",
    title: "Whispers in the Rain: Reborn for You",
    releaseDate: "Nov 15, 2026",
    daysLeft: 20,
    category: "Romance / Melodrama",
    poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    synopsis: "Betrayed on her wedding day, she wakes up five years in the past with one vow: protect the man who gave his life for her.",
    reminded: false,
    subscriberRemindersCount: 2980
  },
  {
    id: "cs-4",
    title: "Cyber Dynasty: The Last Heir",
    releaseDate: "Nov 22, 2026",
    daysLeft: 27,
    category: "Anime / Sci-Fi / Action",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    synopsis: "In Neo-Colombo 2099, a rogue cyborg inherits the neural core of the world's most feared tech emperor.",
    reminded: false,
    subscriberRemindersCount: 4410
  }
];

export const INITIAL_DRAMAS = [
  {
    id: "drama-1",
    title: "The CEO's Secret Heiress",
    slug: "ceos-secret-heiress",
    category: "Popular",
    genre: "Billionaire Romance",
    rating: 4.9,
    views: "18.4M",
    likes: "942K",
    tags: ["Trending", "Billionaire", "Sweet Revenge"],
    badge: "🔥 Top #1",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    totalEpisodes: 30,
    hasWatermark: true,
    watermarkCleaned: false,
    description: "Mocked as a penniless country girl by her fiancé and his elitist mother, Maya is discarded. Little do they know she is the sole heiress to the nation's wealthiest conglomerate—and she has just taken over his company.",
    cast: ["Sarah Jenkins as Maya Vance", "Ethan Cross as CEO Alexander Vance"],
    subtitles: {
      en: [
        { start: 1, end: 4, text: "You think a penniless girl like you can step into our family?" },
        { start: 5, end: 9, text: "Sign the breakup contract now, or you'll leave with nothing." },
        { start: 10, end: 14, text: "Take your ring back. Tomorrow, you'll regret every word." },
        { start: 15, end: 20, text: "Welcome back, President Maya. The board awaits your orders." }
      ],
      si: [
        { start: 1, end: 4, text: "නුඹ වැනි හිඟන කෙල්ලෙකුට අපේ පෙළපතට ඇතුළු විය හැකි යැයි සිතුවාද?" },
        { start: 5, end: 9, text: "දැන්ම ගිවිසුමට අත්සන් කරන්න, නැත්නම් නුඹට කිසිවක් ඉතිරි නොවනු ඇත." },
        { start: 10, end: 14, text: "ඔබේ මුදුව ආපසු ගන්න. හෙට වන විට ඔබේ සෑම වචනයක් ගැනම ඔබ පසුතැවෙනු ඇත." },
        { start: 15, end: 20, text: "නැවත සාදරයෙන් පිළිගනිමු මායා සභාපතිනියනි. අධ්‍යක්ෂ මණ්ඩලය ඔබේ අණ බලාපොරොත්තුවෙන් සිටී." }
      ],
      ta: [
        { start: 1, end: 4, text: "உன்னைப் போன்ற ஒரு ஏழைப் பெண் எங்கள் குடும்பத்திற்குள் நுழைய முடியுமா என்று நினைக்கிறாயா?" },
        { start: 5, end: 9, text: "இப்போதே பிரிவினை ஒப்பந்தத்தில் கையெழுத்திடு, இல்லையேல் ஒன்றுமில்லாமல் போவாய்." },
        { start: 10, end: 14, text: "உன் மோதிரத்தை திரும்ப எடுத்துக்கொள். நாளை நீ பேசிய ஒவ்வொரு வார்த்தைக்கும் வருந்துவாய்." },
        { start: 15, end: 20, text: "மீண்டும் வருக தலைவர் மாயா. இயக்குநர் குழு உங்கள் கட்டளைக்காக காத்திருக்கிறது." }
      ]
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-her-smartphone-in-bed-41139-large.mp4",
    episodes: Array.from({ length: 25 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "The Broken Engagement" : i === 4 ? "The Truth Unveiled" : i === 10 ? "The Boardroom Clash (VIP)" : `Part ${i + 1}`}`,
      duration: "1:45",
      isFree: i < 10,
      views: `${(18.4 - i * 0.5).toFixed(1)}M`,
      thumbnail: `https://images.unsplash.com/photo-${1534528741775 + i}?auto=format&fit=crop&w=400&q=80`
    }))
  },
  {
    id: "drama-2",
    title: "Revenge of the Abandoned Bride",
    slug: "revenge-abandoned-bride",
    category: "New",
    genre: "Sweet Revenge",
    rating: 4.8,
    views: "12.1M",
    likes: "680K",
    tags: ["New", "Sweet Revenge", "Plot Twist"],
    badge: "⭐ Hot New",
    poster: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    totalEpisodes: 35,
    hasWatermark: true,
    watermarkCleaned: false,
    description: "Framed and expelled by her adoptive sister, Evelyn returns five years later with her three genius triplets and the backing of the mysterious Crown Syndicate.",
    cast: ["Elena Rose as Evelyn", "Damian Stone as Lord Ashton"],
    subtitles: {
      en: [
        { start: 1, end: 4, text: "Five years ago, you took everything from me." },
        { start: 5, end: 9, text: "Now I've bought every single asset your family owns." },
        { start: 10, end: 14, text: "Who said my children don't have a father?" },
        { start: 15, end: 20, text: "Mommy, Daddy just arrived with fifty armored guards!" }
      ],
      si: [
        { start: 1, end: 4, text: "වසර පහකට පෙර, ඔබ මගෙන් සියල්ල උදුරා ගත්තා." },
        { start: 5, end: 9, text: "දැන් මම ඔබේ පවුල සතු සෑම වත්කමක්ම මිලදී ගෙන අවසන්." },
        { start: 10, end: 14, text: "මගේ දරුවන්ට පියෙක් නෑ කියලා කවුද කිව්වේ?" },
        { start: 15, end: 20, text: "අම්මේ, තාත්තා ආරක්ෂක නිලධාරීන් පනස් දෙනෙකු සමඟ දැන් පැමිණියා!" }
      ],
      ta: [
        { start: 1, end: 4, text: "ஐந்து ஆண்டுகளுக்கு முன்பு, என்னிடமிருந்து எல்லாவற்றையும் பறித்தீர்கள்." },
        { start: 5, end: 9, text: "இப்போது உங்கள் குடும்பத்திற்கு சொந்தமான அனைத்து சொத்துக்களையும் நான் வாங்கிவிட்டேன்." },
        { start: 10, end: 14, text: "என் குழந்தைகளுக்கு தந்தை இல்லை என்று யார் சொன்னது?" },
        { start: 15, end: 20, text: "அம்மா, அப்பா ஐம்பது பாதுகாப்பு அதிகாரிகளுடன் வந்துவிட்டார்!" }
      ]
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40432-large.mp4",
    episodes: Array.from({ length: 24 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "Rainy Night Betrayal" : i === 9 ? "Triple Threat" : `Chapter ${i + 1}`}`,
      duration: "1:52",
      isFree: i < 10,
      views: `${(12.1 - i * 0.4).toFixed(1)}M`,
      thumbnail: `https://images.unsplash.com/photo-${1524504388940 + i}?auto=format&fit=crop&w=400&q=80`
    }))
  },
  {
    id: "drama-3",
    title: "Dragon God Returns to Metropolis",
    slug: "dragon-god-returns",
    category: "Rankings",
    genre: "Urban Action & Rebirth",
    rating: 4.95,
    views: "24.7M",
    likes: "1.2M",
    tags: ["Must Watch", "Overpowered", "Action"],
    badge: "👑 King of Action",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    totalEpisodes: 40,
    hasWatermark: true,
    watermarkCleaned: false,
    description: "The Supreme Dragon God returns from the Northern Warzone to protect his childhood sweetheart. Anyone who dares bully her will face the wrath of a hundred thousand soldiers.",
    cast: ["Lucas Vance as Ryan Kane", "Chloe Bennett as Lisa"],
    subtitles: {
      en: [
        { start: 1, end: 4, text: "How dare a street beggar step into our five-star manor?" },
        { start: 5, end: 9, text: "Kneel down and apologize to Young Master Zhao!" },
        { start: 10, end: 14, text: "The Dragon Medallion... Good heavens, you are the Supreme Commander!" },
        { start: 15, end: 20, text: "Ten thousand warriors stand ready at your single nod, Sir!" }
      ],
      si: [
        { start: 1, end: 4, text: "වීදි හිඟන්නෙකු අපේ තරු පහේ මන්දිරයට පය තැබීමට එඩිතර වූයේ කෙසේද?" },
        { start: 5, end: 9, text: "දණගසා ෂාවෝ තරුණ ස්වාමියාගෙන් සමාව ඉල්ලන්න!" },
        { start: 10, end: 14, text: "ඩ්‍රැගන් පදක්කම... දෙවියනේ, ඔබයි උත්තරීතර සේනාධිනායකයා!" },
        { start: 15, end: 20, text: "ඔබගේ එක අණකට දස දහසක් සෙබළුන් සූදානම්, සර්!" }
      ],
      ta: [
        { start: 1, end: 4, text: "ஒரு தெரு பிச்சைக்காரன் எங்கள் ஐந்து நட்சத்திர மாளிகையில் நுழைய எப்படி துணிந்தான்?" },
        { start: 10, end: 14, text: "டிராகன் பதக்கம்... கடவுளே, நீங்கள்தான் உச்ச தளபதியா!" },
        { start: 15, end: 20, text: "உங்கள் ஒரு கட்டளைக்காக பத்தாயிரம் வீரர்கள் தயாராக உள்ளனர், ஐயா!" }
      ]
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-41274-large.mp4",
    episodes: Array.from({ length: 30 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "The Slap That Shook the City" : `Battle ${i + 1}`}`,
      duration: "1:38",
      isFree: i < 10,
      views: `${(24.7 - i * 0.6).toFixed(1)}M`,
      thumbnail: `https://images.unsplash.com/photo-${1507003211169 + i}?auto=format&fit=crop&w=400&q=80`
    }))
  },
  {
    id: "drama-4",
    title: "My Secret Agent Husband",
    slug: "secret-agent-husband",
    category: "Categories",
    genre: "Romantic Comedy & Thriller",
    rating: 4.7,
    views: "9.8M",
    likes: "490K",
    tags: ["Romance", "Secret Identity", "Comedy"],
    badge: "💖 Cute & Deadly",
    poster: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
    totalEpisodes: 28,
    hasWatermark: true,
    watermarkCleaned: false,
    description: "She thought her sweet, stay-at-home husband was just a timid freelance writer. Until she was taken hostage at a gala and watched him dismantle 12 armed assassins with a butter knife.",
    cast: ["Leo Wang as Sean", "Amelia Brooks as Nicole"],
    subtitles: {
      en: [
        { start: 1, end: 4, text: "Honey, did you remember to buy milk on the way home?" },
        { start: 5, end: 9, text: "Drop your weapons. You have three seconds to leave my wife alone." }
      ],
      si: [
        { start: 1, end: 4, text: "රත්තරන්, ගෙදර එනකොට කිරි පැකට්ටුවක් ගේන්න මතක් වුණාද?" },
        { start: 5, end: 9, text: "ආයුධ බිම දමන්න. මගේ බිරිඳ අත්හැර යන්න ඔබට ඇත්තේ තත්පර තුනයි." }
      ],
      ta: [
        { start: 1, end: 4, text: "அன்பே, வீட்டிற்கு வரும் வழியில் பால் வாங்க நினைவிருந்ததா?" },
        { start: 5, end: 9, text: "ஆயுதங்களை கீழே போடுங்கள். என் மனைவியை விட்டுச் செல்ல உங்களுக்கு மூன்று வினாடிகள் உள்ளன." }
      ]
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-at-sunset-41484-large.mp4",
    episodes: Array.from({ length: 20 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "Undercover Domestic" : `Mission ${i + 1}`}`,
      duration: "1:40",
      isFree: i < 10,
      views: `${(9.8 - i * 0.3).toFixed(1)}M`,
      thumbnail: `https://images.unsplash.com/photo-${1492562080023 + i}?auto=format&fit=crop&w=400&q=80`
    }))
  },
  {
    id: "drama-5",
    title: "Demon Slayer: Soul Blade Chronicles",
    slug: "soul-blade-chronicles",
    category: "Anime",
    genre: "Anime / Fantasy / Shonen",
    rating: 4.92,
    views: "15.3M",
    likes: "870K",
    tags: ["Anime", "Supernatural", "Exclusive"],
    badge: "🔥 Anime Hit",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    totalEpisodes: 32,
    hasWatermark: false,
    watermarkCleaned: true,
    description: "When the demon eclipse darkens the sky over the imperial capital, a rogue spirit swordsman awakens the ancient crimson dragon mark.",
    cast: ["Voice: Kenji Sato", "Voice: Aoi Tanaka"],
    subtitles: {
      en: [
        { start: 1, end: 4, text: "The crimson seal is breaking! Run for the mountains!" }
      ],
      si: [
        { start: 1, end: 4, text: "රතු මුද්‍රාව කැඩී යයි! කඳුකරය දෙසට දුවන්න!" }
      ],
      ta: [
        { start: 1, end: 4, text: "சிவப்பு முத்திரை உடைகிறது! மலைகளை நோக்கி ஓடுங்கள்!" }
      ]
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-glowing-sphere-in-a-dark-room-41712-large.mp4",
    episodes: Array.from({ length: 22 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "Awakening of the Seal" : `Awakening ${i + 1}`}`,
      duration: "2:05",
      isFree: i < 10,
      views: `${(15.3 - i * 0.4).toFixed(1)}M`,
      thumbnail: `https://images.unsplash.com/photo-${1578632767115 + i}?auto=format&fit=crop&w=400&q=80`
    }))
  }
];

// Private Voucher Keys (Hidden in database from public, non-stackable with public discount)
export const INITIAL_PRIVATE_VOUCHERS = [
  { code: "VIPFREE2026", discountPercent: 100, validUntil: "2026-11-30", usesLeft: 88, label: "100% Free VIP All-Access" },
  { code: "SNAP50", discountPercent: 50, validUntil: "2026-12-31", usesLeft: 420, label: "50% Off Any Subscription" },
  { code: "REEL20", discountPercent: 20, validUntil: "2026-12-31", usesLeft: 1200, label: "20% Discount Key" },
  { code: "CREATOR99", discountPercent: 99, validUntil: "2026-12-31", usesLeft: 25, label: "Exclusive Creator Pass" }
];

export const INITIAL_TOP_VIEWERS = [
  { id: "SR-91823401", name: "Amila Jayasinghe", hoursWatched: 48.5, episodesWatched: 412, badge: "🥇 Weekly Champion", plan: "Monthly VIP", rewardSent: true },
  { id: "SR-77301928", name: "Kavindu Perera", hoursWatched: 42.1, episodesWatched: 368, badge: "🥈 Silver Binger", plan: "Weekly VIP", rewardSent: false },
  { id: "SR-66291840", name: "Tharushi Silva", hoursWatched: 39.8, episodesWatched: 340, badge: "🥉 Bronze Binger", plan: "Monthly VIP", rewardSent: false },
  { id: "SR-55102948", name: "Dinesh Fernando", hoursWatched: 35.2, episodesWatched: 295, badge: "⭐ Top 5 Fan", plan: "Weekly VIP", rewardSent: false }
];
