import React, { useState } from 'react';
import { UserProfile, LanguageCode, ThemeMode } from '../types';
import { INDIAN_LANGUAGES, getT } from '../data/translations';
import {
  Users,
  X,
  Check,
  ShieldCheck,
  Heart,
  Globe2,
  Moon,
  Sun,
  Sparkles,
  Contrast,
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile;
  allProfiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onOpenAsha: () => void;
  language: LanguageCode;
  onOpenLanguageModal: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  allProfiles,
  onSelectProfile,
  onOpenAsha,
  language,
  onOpenLanguageModal,
  theme,
  onToggleTheme,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const t = getT(language);

  const currentLangObj =
    INDIAN_LANGUAGES.find((l) => l.code === language) || INDIAN_LANGUAGES[0];

  return (
    <>
      <header
        id="app-header"
        className="bg-[#03110e]/90 backdrop-blur-xl border-b border-[#eaf7f2]/10 shadow-sm sticky top-0 z-40 w-full px-3.5 h-16 flex justify-between items-center transition-all"
      >
        {/* Left: Profile avatar button & Language Selector */}
        <div className="flex items-center gap-2">
          <button
            id="btn-switch-profile"
            aria-label="Switch Profile"
            onClick={() => setShowProfileModal(true)}
            className="w-9 h-9 rounded-full bg-[#eaf7f2]/[0.06] border border-[#eaf7f2]/20 flex items-center justify-center overflow-hidden flex-shrink-0 relative hover:ring-2 hover:ring-[#6cd9c4] transition-all cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ADE94] rounded-full ring-1 ring-[#03110e]"></span>
          </button>

          {/* Translation Button for All Indian Languages */}
          <button
            id="btn-language-select"
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] text-[#6cd9c4] border border-[#6cd9c4]/30 transition-all active:scale-95 cursor-pointer"
            title="Translate to Indian Languages (भाषा अनुवाद)"
          >
            <Globe2 className="w-3.5 h-3.5 text-[#6cd9c4]" />
            <span>{currentLangObj.nativeName}</span>
          </button>
        </div>

        {/* Center: Brand Logo & Title */}
        <div className="flex-1 flex justify-center items-center px-1">
          <div className="flex items-center gap-1.5 cursor-pointer">
            {/* Setu Health Arch Bridge Logo Icon */}
            <svg
              className="w-6 h-6 text-[#6cd9c4] drop-shadow-[0_0_8px_rgba(108,217,196,0.6)] shrink-0"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Arch Bridge */}
              <path
                d="M18 78C18 48 32 30 50 30C68 30 82 48 82 78"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M12 78H24M76 78H88"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Central Medical Cross */}
              <circle cx="50" cy="40" r="18" fill="#050F0D" stroke="currentColor" strokeWidth="6" />
              <path
                d="M50 30V50M40 40H60"
                stroke="#6cd9c4"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="font-serif-heading text-[17px] tracking-wider font-bold text-[#6cd9c4] drop-shadow-[0_0_12px_rgba(108,217,196,0.3)] truncate">
              {t.brandTitle}
            </h1>
          </div>
        </div>

        {/* Right: Theme Switcher & ASHA Worker Connector */}
        <div className="flex items-center gap-1.5">
          {/* Night / Dark / Light Mode Switch Button */}
          <button
            id="btn-toggle-theme"
            aria-label="Toggle Night/Dark/Light Mode"
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-xl bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#eaf7f2]/15 flex items-center justify-center text-[#6cd9c4] hover:text-[#4ADE94] transition-all cursor-pointer active:scale-95"
            title={
              theme === 'night'
                ? 'Night Mode (Emerald) -> Click for Midnight Dark'
                : theme === 'dark'
                ? 'Midnight Dark -> Click for Sunlight Day Mode'
                : 'Sunlight Day Mode -> Click for Night Mode'
            }
          >
            {theme === 'night' && <Moon className="w-4 h-4 text-[#6cd9c4]" />}
            {theme === 'dark' && <Contrast className="w-4 h-4 text-[#a7f3d0]" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-[#f59e0b]" />}
          </button>

          {/* ASHA Connector */}
          <button
            id="btn-asha-worker"
            aria-label="Community Health Worker"
            onClick={onOpenAsha}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#bcc9c5] hover:text-[#6cd9c4] bg-[#eaf7f2]/[0.06] hover:bg-[#eaf7f2]/[0.12] border border-[#eaf7f2]/10 transition-colors relative cursor-pointer"
            title={t.connectAsha}
          >
            <Users className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ffb961] rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Profile Switcher Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0f1e1b] border border-[#eaf7f2]/20 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#6cd9c4]" />
                <h3 className="font-serif-heading text-lg font-bold text-[#d4e6e1]">
                  {t.familyProfiles}
                </h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#93B7AE]">{t.switchProfilePrompt}</p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto hide-scroll">
              {allProfiles.map((p) => {
                const isSelected = p.id === currentUser.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProfile(p);
                      setShowProfileModal(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2fa491]/20 border-[#6cd9c4] ring-1 ring-[#6cd9c4]/50'
                        : 'bg-[#13221f] border-[#eaf7f2]/10 hover:border-[#6cd9c4]/40'
                    }`}
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#eaf7f2]/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#EAF7F2] truncate">{p.name}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#1d2d2a] text-[#6cd9c4] font-semibold">
                          {p.bloodGroup}
                        </span>
                      </div>
                      <p className="text-xs text-[#93B7AE]">
                        {p.age} yrs • {p.village}
                      </p>
                      {p.chronicConditions.length > 0 && (
                        <p className="text-[10px] text-[#ffb961] truncate mt-0.5">
                          {p.chronicConditions.join(', ')}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#6cd9c4] text-[#00382f] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#eaf7f2]/10 flex items-center justify-between text-xs text-[#93B7AE]">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#FF6E56]" />
                ABHA ID: <strong className="text-[#d4e6e1]">{currentUser.abhaId}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
