import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { INDIAN_LANGUAGES, getT } from '../data/translations';
import { Globe2, Search, Check, X, Sparkles, MapPin } from 'lucide-react';

interface LanguageModalProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLanguage,
  onSelectLanguage,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const t = getT(currentLanguage);

  const filteredLanguages = INDIAN_LANGUAGES.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#6cd9c4]/30 rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2fa491]/20 border border-[#6cd9c4] flex items-center justify-center text-[#6cd9c4]">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-heading text-base font-bold text-[#EAF7F2]">
                {t.selectLanguage}
              </h3>
              <p className="text-[10px] text-[#93B7AE]">13 Indian Languages Supported</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchLanguage}
            className="w-full bg-[#13221f] border border-[#eaf7f2]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#EAF7F2] placeholder-[#93B7AE]/50 focus:outline-none focus:border-[#6cd9c4] pl-9"
          />
          <Search className="w-4 h-4 text-[#93B7AE] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick Regional Suggestions */}
        <div className="shrink-0 flex items-center gap-1.5 overflow-x-auto hide-scroll pb-1 text-[11px]">
          <span className="text-[#93B7AE] text-[10px] shrink-0">Popular:</span>
          {['hi', 'en', 'bn', 'te', 'mr', 'ta'].map((code) => {
            const lang = INDIAN_LANGUAGES.find((l) => l.code === code);
            if (!lang) return null;
            return (
              <button
                key={code}
                onClick={() => {
                  onSelectLanguage(code as LanguageCode);
                  onClose();
                }}
                className={`px-2 py-0.5 rounded-lg border text-[11px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                  currentLanguage === code
                    ? 'bg-[#2fa491] text-[#00382f] border-[#2fa491] font-bold'
                    : 'bg-[#13221f] border-[#eaf7f2]/10 text-[#93B7AE] hover:border-[#6cd9c4]/40'
                }`}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>

        {/* List of Languages */}
        <div className="space-y-2 overflow-y-auto hide-scroll flex-1 pr-1">
          {filteredLanguages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2fa491]/20 border-[#6cd9c4] ring-1 ring-[#6cd9c4]/40 shadow-sm'
                    : 'bg-[#13221f] border-[#eaf7f2]/10 hover:border-[#6cd9c4]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                      isSelected
                        ? 'bg-[#2fa491] text-[#00332b] border-[#6cd9c4]'
                        : 'bg-[#1d2d2a] text-[#6cd9c4] border-[#eaf7f2]/10'
                    }`}
                  >
                    {lang.flagOrScript}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#EAF7F2]">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-[#93B7AE]">({lang.name})</span>
                    </div>
                    <p className="text-[11px] text-[#bcc9c5] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#6cd9c4] shrink-0" />
                      {lang.region}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#6cd9c4] text-[#00382f] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <span className="text-[11px] font-semibold text-[#93B7AE]/60">Select</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#eaf7f2]/10 text-center shrink-0">
          <p className="text-[10px] text-[#93B7AE]">
            Voice & text accessibility compliant with Digital India Health Mission
          </p>
        </div>
      </div>
    </div>
  );
};
