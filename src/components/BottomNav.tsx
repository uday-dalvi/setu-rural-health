import React from 'react';
import { ScreenTab, LanguageCode } from '../types';
import { getT } from '../data/translations';
import { Home, Pill, Stethoscope, Building2, Asterisk } from 'lucide-react';

interface BottomNavProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  language: LanguageCode;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  language,
}) => {
  const t = getT(language);

  const tabs: {
    id: ScreenTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isSos?: boolean;
  }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'meds', label: t.navMeds, icon: Pill },
    { id: 'doctors', label: t.navDoctors, icon: Stethoscope },
    { id: 'hospitals', label: t.navHospitals, icon: Building2 },
    { id: 'sos', label: t.navSos, icon: Asterisk, isSos: true },
  ];

  return (
    <nav
      id="bottom-nav"
      className="bg-[#0f1e1b]/95 backdrop-blur-2xl fixed bottom-0 w-full max-w-[480px] z-50 rounded-t-2xl border-t border-[#eaf7f2]/15 shadow-[0_-4px_25px_rgba(0,0,0,0.6)] flex justify-around items-center px-3 py-2 transition-all"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isSos) {
          return (
            <button
              key={tab.id}
              id={`nav-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 relative cursor-pointer ${
                isActive
                  ? 'bg-[#FF6E56]/25 text-[#FF6E56] font-bold scale-105 shadow-[0_0_12px_rgba(255,110,86,0.35)]'
                  : 'text-[#FF6E56] hover:bg-[#eaf7f2]/[0.06] opacity-90'
              }`}
            >
              <span className="absolute inset-0 bg-[#FF6E56]/10 rounded-xl blur-sm pointer-events-none"></span>
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-semibold mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#2fa491]/25 text-[#6cd9c4] font-bold scale-105 border border-[#6cd9c4]/30 shadow-[0_0_12px_rgba(108,217,196,0.25)]'
                : 'text-[#93B7AE] hover:text-[#d4e6e1] hover:bg-[#eaf7f2]/[0.06]'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : ''}`} />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
