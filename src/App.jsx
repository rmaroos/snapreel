import React, { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import NotificationToast from "./components/NotificationToast";
import AuthModal from "./components/AuthModal";
import VipModal from "./components/VipModal";
import AboutUsModal from "./components/AboutUsModal";
import SupportFeedbackModal from "./components/SupportFeedbackModal";
import LegalDocModal from "./components/LegalDocModal";
import CoinBuyModal from "./components/CoinBuyModal";

import HomePage from "./pages/HomePage";
import ForYouPage from "./pages/ForYouPage";
import MembershipPage from "./pages/MembershipPage";
import ProfilePage from "./pages/ProfilePage";
import MyListPage from "./pages/MyListPage";
import DramaDetailPage from "./pages/DramaDetailPage";

import AdminPanel from "./pages/admin/AdminPanel";
import { useApp } from "./context/AppContext";

export default function App() {
  const { activeModal, setActiveModal, isAdminMode, setIsAdminMode } = useApp();

  const [currentTab, setCurrentTab] = useState("home"); // "home" | "foryou" | "member" | "mylist" | "profile" | "detail"
  const [selectedDrama, setSelectedDrama] = useState(null);

  // When user clicks a drama card
  const handleSelectDrama = (drama) => {
    setSelectedDrama(drama);
    setCurrentTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Play a specific episode from detail view
  const handlePlayEpisodeFromDetail = (episodeNumber) => {
    setCurrentTab("foryou");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      
      {/* Global Notification Toast */}
      <NotificationToast />

      {/* Render Admin Mode if logged in as Admin */}
      {isAdminMode ? (
        <AdminPanel onExitAdmin={() => setIsAdminMode(false)} />
      ) : (
        <>
          {/* Main Top Header - Public has ZERO admin buttons */}
          <Header
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          {/* Main View Area */}
          <main className="flex-1">
            {currentTab === "home" && (
              <HomePage onSelectDrama={handleSelectDrama} />
            )}

            {currentTab === "foryou" && (
              <ForYouPage
                selectedDrama={selectedDrama}
                onSelectDrama={handleSelectDrama}
              />
            )}

            {currentTab === "member" && (
              <MembershipPage />
            )}

            {currentTab === "mylist" && (
              <MyListPage onSelectDrama={handleSelectDrama} />
            )}

            {currentTab === "profile" && (
              <ProfilePage setCurrentTab={setCurrentTab} />
            )}

            {currentTab === "detail" && (
              <DramaDetailPage
                drama={selectedDrama}
                onBack={() => setCurrentTab("home")}
                onPlayEpisode={handlePlayEpisodeFromDetail}
              />
            )}
          </main>

          {/* Platform Footer - Public has ZERO admin buttons */}
          <Footer />

          {/* Mobile & Desktop Bottom Navigation Bar */}
          <BottomNav
            currentTab={currentTab === "detail" ? "home" : currentTab}
            setCurrentTab={setCurrentTab}
          />

          {/* Modals */}
          {/* 1. OTP Verification Sign In Modal */}
          <AuthModal
            isOpen={activeModal === "auth"}
            onClose={() => setActiveModal(null)}
          />

          {/* 2. VIP Membership Upgrade Modal */}
          <VipModal
            isOpen={activeModal === "vip"}
            onClose={() => setActiveModal(null)}
          />

          {/* 3. About Us Modal */}
          <AboutUsModal
            isOpen={activeModal === "about"}
            onClose={() => setActiveModal(null)}
          />

          {/* 4. Support & Feedback Modal */}
          <SupportFeedbackModal
            isOpen={activeModal === "support" || activeModal === "feedback"}
            onClose={() => setActiveModal(null)}
          />

          {/* 5. Privacy Policy Modal */}
          <LegalDocModal
            isOpen={activeModal === "privacy"}
            onClose={() => setActiveModal(null)}
            docType="privacy"
          />

          {/* 6. Terms & Conditions Modal */}
          <LegalDocModal
            isOpen={activeModal === "terms"}
            onClose={() => setActiveModal(null)}
            docType="terms"
          />

          {/* 7. Coin Buying Modal */}
          <CoinBuyModal
            isOpen={activeModal === "coins"}
            onClose={() => setActiveModal(null)}
          />
        </>
      )}
    </div>
  );
}
