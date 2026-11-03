import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DESIGNATED_ADMIN_EMAIL,
  DEFAULT_BRANDING,
  DEFAULT_PRIVACY_POLICY,
  DEFAULT_TERMS,
  INITIAL_COMING_SOON,
  INITIAL_DRAMAS,
  INITIAL_PRIVATE_VOUCHERS,
  INITIAL_TOP_VIEWERS,
  DEFAULT_MEMBERSHIP_PLANS,
  DEFAULT_COIN_PACKAGES,
  DEFAULT_PUBLIC_DISCOUNT,
  DEFAULT_PAGE_LAYOUTS,
  DEFAULT_ADMIN_SETTINGS,
  DEFAULT_EPISODE_UNLOCK_COINS
} from "../data/initialData";
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  generateUserId
} from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Branding Settings
  const [branding, setBranding] = useState(() =>
    loadFromStorage(STORAGE_KEYS.BRANDING, DEFAULT_BRANDING)
  );

  // 2. Dramas / Series Catalog
  const [dramas, setDramas] = useState(() =>
    loadFromStorage(STORAGE_KEYS.DRAMAS, INITIAL_DRAMAS)
  );

  // 3. Coming Soon Series (Managed directly in Creator Studio)
  const [comingSoon, setComingSoon] = useState(() =>
    loadFromStorage(STORAGE_KEYS.COMING_SOON, INITIAL_COMING_SOON)
  );

  // 4. User Authentication & Profile
  const [user, setUser] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.USER, null);
    if (saved) return saved;
    return {
      id: generateUserId(),
      email: "",
      name: "Guest Explorer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      isLoggedIn: false,
      isVip: false,
      vipPlan: null, // "Weekly" | "Monthly" | "Yearly"
      vipExpiresAt: null,
      coins: 150,
      referralCode: "SNAP-" + Math.floor(1000 + Math.random() * 9000),
      referralCount: 2,
      followingCount: 6,
      language: "en",
      episodesWatchedCount: 0,
      dailyCheckInStreak: 3,
      lastCheckInDate: null
    };
  });

  // Check strict role-based access: Admin ONLY if user.email === DESIGNATED_ADMIN_EMAIL
  const isAdmin = Boolean(
    user?.isLoggedIn &&
    user?.email?.trim().toLowerCase() === DESIGNATED_ADMIN_EMAIL.toLowerCase()
  );

  // 5. Monetization: Membership Plans, Coin Packages, Public Discounts & Private Vouchers
  const [membershipPlans, setMembershipPlans] = useState(() =>
    loadFromStorage(STORAGE_KEYS.MEMBERSHIP_PLANS, DEFAULT_MEMBERSHIP_PLANS)
  );

  const [coinPackages, setCoinPackages] = useState(() =>
    loadFromStorage(STORAGE_KEYS.COIN_PACKAGES, DEFAULT_COIN_PACKAGES)
  );

  const [publicDiscount, setPublicDiscount] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PUBLIC_DISCOUNT, DEFAULT_PUBLIC_DISCOUNT)
  );

  const [vouchers, setVouchers] = useState(() =>
    loadFromStorage(STORAGE_KEYS.VOUCHERS, INITIAL_PRIVATE_VOUCHERS)
  );

  // 6. Page Layout Editor Settings (Home, For You, My List, Profile)
  const [pageLayouts, setPageLayouts] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PAGE_LAYOUTS, DEFAULT_PAGE_LAYOUTS)
  );

  // 7. My List (Favorites, History, Reminders, Following, Saved)
  const [myList, setMyList] = useState(() =>
    loadFromStorage(STORAGE_KEYS.MY_LIST, {
      favorites: ["drama-1", "drama-3"],
      saved: ["drama-2"],
      following: ["drama-1", "drama-4"],
      history: [
        { dramaId: "drama-1", episodeNumber: 4, watchedAt: "2026-10-25" },
        { dramaId: "drama-2", episodeNumber: 2, watchedAt: "2026-10-24" }
      ],
      reminders: ["cs-1"]
    })
  );

  // 8. Privacy Policy & Terms
  const [privacyPolicy, setPrivacyPolicy] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PRIVACY_POLICY, DEFAULT_PRIVACY_POLICY)
  );

  const [terms, setTerms] = useState(() =>
    loadFromStorage(STORAGE_KEYS.TERMS, DEFAULT_TERMS)
  );

  // 9. Weekly Top Viewers
  const [topViewers, setTopViewers] = useState(() =>
    loadFromStorage(STORAGE_KEYS.TOP_VIEWERS, INITIAL_TOP_VIEWERS)
  );

  // 10. General Admin Settings: Exactly Two Dedicated API Keys (Stored Securely)
  const [adminSettings, setAdminSettings] = useState(() =>
    loadFromStorage(STORAGE_KEYS.ADMIN_SETTINGS, DEFAULT_ADMIN_SETTINGS)
  );

  // 11. Permanently Unlocked Episodes via Coins (15 Coins / Episode)
  const [unlockedEpisodes, setUnlockedEpisodes] = useState(() =>
    loadFromStorage(STORAGE_KEYS.UNLOCKED_EPISODES, {})
  );

  // 11. Notifications
  const [notifications, setNotifications] = useState(() =>
    loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: "notif-1",
        title: "Welcome to Drama Hub!",
        message: "Enjoy Episode 1 to 10 completely free! Upgrade to VIP for unlimited access.",
        time: "Just now",
        read: false
      },
      {
        id: "notif-2",
        title: "Flash Sale 50% Discount",
        message: "Weekly, Monthly & Yearly memberships are now 50% off for a limited time.",
        time: "1 hour ago",
        read: false
      }
    ])
  );

  // UI state
  const [activeModal, setActiveModal] = useState(null); // 'auth' | 'vip' | 'about' | 'support' | 'privacy' | 'terms' | 'coins' | null
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Auto-sync state to localStorage
  useEffect(() => saveToStorage(STORAGE_KEYS.BRANDING, branding), [branding]);
  useEffect(() => saveToStorage(STORAGE_KEYS.DRAMAS, dramas), [dramas]);
  useEffect(() => saveToStorage(STORAGE_KEYS.COMING_SOON, comingSoon), [comingSoon]);
  useEffect(() => saveToStorage(STORAGE_KEYS.USER, user), [user]);
  useEffect(() => saveToStorage(STORAGE_KEYS.MY_LIST, myList), [myList]);
  useEffect(() => saveToStorage(STORAGE_KEYS.PRIVACY_POLICY, privacyPolicy), [privacyPolicy]);
  useEffect(() => saveToStorage(STORAGE_KEYS.TERMS, terms), [terms]);
  useEffect(() => saveToStorage(STORAGE_KEYS.VOUCHERS, vouchers), [vouchers]);
  useEffect(() => saveToStorage(STORAGE_KEYS.TOP_VIEWERS, topViewers), [topViewers]);
  useEffect(() => saveToStorage(STORAGE_KEYS.ADMIN_SETTINGS, adminSettings), [adminSettings]);
  useEffect(() => saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveToStorage(STORAGE_KEYS.MEMBERSHIP_PLANS, membershipPlans), [membershipPlans]);
  useEffect(() => saveToStorage(STORAGE_KEYS.COIN_PACKAGES, coinPackages), [coinPackages]);
  useEffect(() => saveToStorage(STORAGE_KEYS.PUBLIC_DISCOUNT, publicDiscount), [publicDiscount]);
  useEffect(() => saveToStorage(STORAGE_KEYS.PAGE_LAYOUTS, pageLayouts), [pageLayouts]);
  useEffect(() => saveToStorage(STORAGE_KEYS.UNLOCKED_EPISODES, unlockedEpisodes), [unlockedEpisodes]);

  // Toast trigger helper
  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Notification helper
  const addNotification = (title, message) => {
    const newNotif = {
      id: "notif-" + Date.now(),
      title,
      message,
      time: "Just now",
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`📢 ${title}: ${message}`, "success");
  };

  // Automated Login via OTP Verification
  const loginWithOtp = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const assignedId = user.id && user.id.startsWith("SR-") ? user.id : generateUserId();
    const isEmailAdmin = cleanEmail === DESIGNATED_ADMIN_EMAIL.toLowerCase();

    setUser((prev) => ({
      ...prev,
      id: assignedId,
      email: cleanEmail,
      name: isEmailAdmin ? "Master Administrator" : cleanEmail.split("@")[0],
      isLoggedIn: true
    }));

    if (isEmailAdmin) {
      setIsAdminMode(true);
      showToast(`Master Admin verified (${cleanEmail})! Direct access to Drama Hub Admin granted.`, "success");
    } else {
      showToast(`Welcome ${cleanEmail.split("@")[0]}! User ID: ${assignedId}`, "success");
    }

    setActiveModal(null);
  };

  const logout = () => {
    setUser({
      id: generateUserId(),
      email: "",
      name: "Guest Explorer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      isLoggedIn: false,
      isVip: false,
      vipPlan: null,
      vipExpiresAt: null,
      coins: 100,
      referralCode: "SNAP-" + Math.floor(1000 + Math.random() * 9000),
      referralCount: 0,
      followingCount: 0,
      language: "en",
      episodesWatchedCount: 0,
      dailyCheckInStreak: 0,
      lastCheckInDate: null
    });
    setIsAdminMode(false);
    showToast("Signed out successfully.", "info");
  };

  // Discount Calculation Helper with Non-Stacking Rule:
  // "Users can use either a Public Discount OR apply a Private Voucher Key. They cannot be combined.
  // If a valid Voucher Key is applied, it overrides/disables any active public discount."
  const calculateEffectivePrice = (originalPrice, voucherCode = null) => {
    const cleanVoucher = voucherCode ? voucherCode.trim().toUpperCase() : null;
    let appliedVoucher = null;

    if (cleanVoucher) {
      appliedVoucher = vouchers.find((v) => v.code === cleanVoucher);
    }

    // Rule: Voucher overrides public discount
    if (appliedVoucher) {
      const discountPercent = appliedVoucher.discountPercent;
      const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
      return {
        price: Number(finalPrice.toFixed(2)),
        discountPercent,
        type: "voucher",
        voucherCode: appliedVoucher.code,
        label: `Private Voucher: ${appliedVoucher.code} (${discountPercent}% OFF, Public Discount Overridden)`
      };
    }

    // Otherwise apply Public Discount if enabled
    if (publicDiscount && publicDiscount.enabled) {
      const discountPercent = publicDiscount.value;
      const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
      return {
        price: Number(finalPrice.toFixed(2)),
        discountPercent,
        type: "public",
        label: `Public Discount Applied: ${publicDiscount.label} (${discountPercent}% OFF)`
      };
    }

    // No discount
    return {
      price: originalPrice,
      discountPercent: 0,
      type: "none",
      label: "Standard Price"
    };
  };

  // Membership Activation
  const activateMembership = (tier = "Monthly", appliedVoucherCode = null) => {
    const targetPlan = membershipPlans.find((p) => p.id === tier) || membershipPlans[1];
    const pricing = calculateEffectivePrice(targetPlan.price, appliedVoucherCode);

    const expiry = new Date();
    if (tier === "Weekly") {
      expiry.setDate(expiry.getDate() + 7);
    } else if (tier === "Yearly") {
      expiry.setDate(expiry.getDate() + 365);
    } else {
      expiry.setDate(expiry.getDate() + 30);
    }

    const expiryStr = expiry.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    setUser((prev) => ({
      ...prev,
      isVip: true,
      vipPlan: tier,
      vipExpiresAt: expiryStr,
      coins: prev.coins + (tier === "Yearly" ? 1000 : 500)
    }));

    addNotification(
      `👑 ${tier} VIP Membership Live!`,
      `Your subscription is active until ${expiryStr}. Price billed: $${pricing.price}. All Episode 11+ unlocked!`
    );

    showToast(`VIP Membership (${tier}) Activated! All episodes unlocked.`, "success");
    setActiveModal(null);
  };

  // Coin Purchase Handler
  const purchaseCoinPackage = (packageId, appliedVoucherCode = null) => {
    const pack = coinPackages.find((p) => p.id === packageId);
    if (!pack) return;

    const pricing = calculateEffectivePrice(pack.price, appliedVoucherCode);
    const totalCoinsAdded = pack.coins + (pack.bonus || 0);

    setUser((prev) => ({
      ...prev,
      coins: prev.coins + totalCoinsAdded
    }));

    addNotification(
      `🪙 +${totalCoinsAdded} Coins Purchased!`,
      `Successfully added ${pack.coins} Coins (+${pack.bonus} bonus) for $${pricing.price}.`
    );

    showToast(`Purchased +${totalCoinsAdded} Coins! New balance: ${user.coins + totalCoinsAdded} Coins.`, "success");
    setActiveModal(null);
  };

  // Watch count tracker (Episode 5 login trigger rule)
  const trackEpisodeWatch = (dramaId, episodeNumber) => {
    setUser((prev) => {
      const nextCount = (prev.episodesWatchedCount || 0) + 1;
      return { ...prev, episodesWatchedCount: nextCount };
    });

    setMyList((prev) => {
      const filtered = prev.history.filter((h) => h.dramaId !== dramaId);
      return {
        ...prev,
        history: [{ dramaId, episodeNumber, watchedAt: new Date().toISOString() }, ...filtered]
      };
    });

    // Episode 5 login trigger rule: If user is watching Episode 5 of any drama and is NOT logged in, trigger signup/login!
    if (episodeNumber === 5 && !user.isLoggedIn) {
      setTimeout(() => {
        setActiveModal("auth");
        showToast("You've unlocked Episode 5! Sign up now to save your progress & claim 100 Free Coins.", "info");
      }, 1000);
    }
  };

  // Toggle Reminder on Coming Soon
  const toggleReminder = (seriesId) => {
    const isReminded = myList.reminders.includes(seriesId);

    setMyList((prev) => ({
      ...prev,
      reminders: isReminded
        ? prev.reminders.filter((id) => id !== seriesId)
        : [...prev.reminders, seriesId]
    }));

    setComingSoon((prev) =>
      prev.map((item) => {
        if (item.id === seriesId) {
          const newCount = isReminded ? item.subscriberRemindersCount - 1 : item.subscriberRemindersCount + 1;
          return { ...item, reminded: !isReminded, subscriberRemindersCount: newCount };
        }
        return item;
      })
    );

    const target = comingSoon.find((c) => c.id === seriesId);
    if (!isReminded) {
      showToast(`🔔 Reminder set for "${target?.title || "Upcoming Series"}". We'll notify you on release!`, "success");
    } else {
      showToast(`Reminder removed for "${target?.title || "Upcoming Series"}".`, "info");
    }
  };

  // Push notification trigger for Coming Soon release (invoked from Creator Studio)
  const sendPushNotificationForRelease = (seriesId) => {
    const series = comingSoon.find((c) => c.id === seriesId);
    if (!series) return;
    const subscriberCount = series.subscriberRemindersCount || 1420;
    addNotification(
      `🎉 Now Streaming: ${series.title}`,
      `The anticipated drama "${series.title}" is officially live on Drama Hub! Watch Episode 1 now.`
    );
    showToast(`Instant push notification delivered to ${subscriberCount.toLocaleString()} users who set reminders!`, "success");
  };

  // Daily Check-in Streak Rewards
  const claimDailyReward = () => {
    const rewardCoins = pageLayouts.profile.dailyRewardAmount || 50;
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + rewardCoins,
      dailyCheckInStreak: (prev.dailyCheckInStreak || 0) + 1,
      lastCheckInDate: new Date().toDateString()
    }));
    showToast(`🎉 Daily Check-in Claimed! +${rewardCoins} Coins added to your wallet.`, "success");
  };

  // Favorites & Saved (exclusively managed in My List)
  const toggleFavorite = (dramaId) => {
    const exists = myList.favorites.includes(dramaId);
    setMyList((prev) => ({
      ...prev,
      favorites: exists ? prev.favorites.filter((id) => id !== dramaId) : [...prev.favorites, dramaId]
    }));
    showToast(exists ? "Removed from Favorites" : "Added to Favorites ❤️", "info");
  };

  const toggleSaved = (dramaId) => {
    const exists = myList.saved.includes(dramaId);
    setMyList((prev) => ({
      ...prev,
      saved: exists ? prev.saved.filter((id) => id !== dramaId) : [...prev.saved, dramaId]
    }));
    showToast(exists ? "Removed from Saved" : "Saved to My List 📑", "info");
  };

  const toggleFollowing = (dramaId) => {
    const exists = myList.following.includes(dramaId);
    setMyList((prev) => ({
      ...prev,
      following: exists ? prev.following.filter((id) => id !== dramaId) : [...prev.following, dramaId]
    }));
    setUser((prev) => ({
      ...prev,
      followingCount: exists ? Math.max(0, prev.followingCount - 1) : prev.followingCount + 1
    }));
    showToast(exists ? "Unfollowed series" : "Following series! Updates will appear in your feed.", "info");
  };

  // Video Management & Deletions
  const deleteDrama = (id) => {
    setDramas((prev) => prev.filter((d) => d.id !== id));
    showToast("Drama series deleted successfully.", "info");
  };

  const bulkDeleteDramas = (ids) => {
    setDramas((prev) => prev.filter((d) => !ids.includes(d.id)));
    showToast(`${ids.length} drama series deleted in bulk.`, "info");
  };

  // Coin Episode Unlock Rules:
  // - Episodes 1-10 are 100% free for all users.
  // - Episode 11+ is unlocked for active VIP members.
  // - Non-VIP users can spend 15 coins to permanently unlock Episode 11+.
  const isEpisodeUnlocked = (dramaId, episodeNumber) => {
    if (episodeNumber <= 10) return true;
    if (user?.isVip) return true;
    const key = `${dramaId}_${episodeNumber}`;
    return Boolean(unlockedEpisodes && unlockedEpisodes[key]);
  };

  const unlockEpisodeWithCoins = (dramaId, episodeNumber) => {
    if (isEpisodeUnlocked(dramaId, episodeNumber)) {
      return true;
    }
    const cost = DEFAULT_EPISODE_UNLOCK_COINS || 15;
    if ((user?.coins || 0) < cost) {
      showToast(`Insufficient coins! You need ${cost} coins to unlock Episode ${episodeNumber}.`, "error");
      setActiveModal("coins");
      return false;
    }

    // Deduct coins and record unlock
    setUser((prev) => ({
      ...prev,
      coins: Math.max(0, (prev.coins || 0) - cost)
    }));

    const key = `${dramaId}_${episodeNumber}`;
    setUnlockedEpisodes((prev) => ({
      ...prev,
      [key]: {
        dramaId,
        episodeNumber,
        unlockedAt: new Date().toISOString(),
        coinsSpent: cost
      }
    }));

    showToast(`🎉 Episode ${episodeNumber} permanently unlocked for ${cost} Coins!`, "success");
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        branding,
        setBranding,
        dramas,
        setDramas,
        deleteDrama,
        bulkDeleteDramas,
        comingSoon,
        setComingSoon,
        toggleReminder,
        sendPushNotificationForRelease,
        user,
        setUser,
        isAdmin,
        isAdminMode,
        setIsAdminMode,
        loginWithOtp,
        logout,
        membershipPlans,
        setMembershipPlans,
        coinPackages,
        setCoinPackages,
        publicDiscount,
        setPublicDiscount,
        vouchers,
        setVouchers,
        calculateEffectivePrice,
        activateMembership,
        purchaseCoinPackage,
        pageLayouts,
        setPageLayouts,
        trackEpisodeWatch,
        claimDailyReward,
        myList,
        toggleFavorite,
        toggleSaved,
        toggleFollowing,
        privacyPolicy,
        setPrivacyPolicy,
        terms,
        setTerms,
        topViewers,
        setTopViewers,
        adminSettings,
        setAdminSettings,
        unlockedEpisodes,
        setUnlockedEpisodes,
        isEpisodeUnlocked,
        unlockEpisodeWithCoins,
        DEFAULT_EPISODE_UNLOCK_COINS,
        notifications,
        addNotification,
        activeModal,
        setActiveModal,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedLanguage,
        setSelectedLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
