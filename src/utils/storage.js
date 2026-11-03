// Storage utility with localStorage sync
export const STORAGE_KEYS = {
  BRANDING: "snapreel_branding",
  DRAMAS: "snapreel_dramas",
  COMING_SOON: "snapreel_coming_soon",
  USER: "snapreel_current_user",
  USERS_LIST: "snapreel_users_list",
  MY_LIST: "snapreel_my_list",
  PRIVACY_POLICY: "snapreel_privacy_policy",
  TERMS: "snapreel_terms",
  VOUCHERS: "snapreel_vouchers",
  TOP_VIEWERS: "snapreel_top_viewers",
  ADMIN_SETTINGS: "snapreel_admin_settings",
  NOTIFICATIONS: "snapreel_notifications",
  MEMBERSHIP_PLANS: "snapreel_membership_plans",
  COIN_PACKAGES: "snapreel_coin_packages",
  PUBLIC_DISCOUNT: "snapreel_public_discount",
  PAGE_LAYOUTS: "snapreel_page_layouts",
  UNLOCKED_EPISODES: "snapreel_unlocked_episodes"
};

export function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// Generate random 8-digit user ID
export function generateUserId() {
  const num = Math.floor(10000000 + Math.random() * 90000000);
  return `SR-${num}`;
}

// Format duration and numbers
export function formatViews(num) {
  if (typeof num === "string") return num;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}
