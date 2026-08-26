import React, { useState } from 'react';
import {
  Asterisk,
  PhoneCall,
  Radio,
  ShieldAlert,
  Users,
  Check,
  ChevronRight,
  AlertTriangle,
  X,
} from 'lucide-react';
import { UserProfile, FirstAidGuide, LanguageCode } from '../../types';
import { getT } from '../../data/translations';

interface SosScreenProps {
  currentUser: UserProfile;
  firstAidGuides: FirstAidGuide[];
  onTriggerSos: () => void;
  language: LanguageCode;
}

export const SosScreen: React.FC<SosScreenProps> = ({
  currentUser,
  firstAidGuides,
  onTriggerSos,
  language,
}) => {
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [activeGuide, setActiveGuide] = useState<FirstAidGuide | null>(null);
  const t = getT(language);

  const emergencyNumbers = [
    { number: '108', title: '108 Ambulance Emergency', color: '#FF6E56', isMain: true },
    { number: '112', title: '112 Police & Disaster SOS', color: '#6cd9c4' },
    { number: '102', title: '102 Maternal & Child Helpline', color: '#ffb961' },
    { number: '1075', title: '1075 National Health Helpline', color: '#4ADE94' },
  ];

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Title & Status */}
      <div className="text-center pt-1 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6E56]/20 text-[#FF6E56] border border-[#FF6E56]/40 text-xs font-bold shadow-[0_0_12px_rgba(255,110,86,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#FF6E56] animate-ping"></span>
          <span>{t.emergencyMode}</span>
        </div>
        <h2 className="font-serif-heading text-2xl font-bold text-[#EAF7F2]">
          {t.emergencySosTitle}
        </h2>
        <p className="text-xs text-[#93B7AE]">
          {t.emergencySosSub}
        </p>
      </div>

      {/* Main Massive 108 Button */}
      <button
        onClick={onTriggerSos}
        className="w-full bg-[#FF6E56] text-[#050F0D] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-[0_6px_35px_rgba(255,110,86,0.5)] pulse-danger relative overflow-hidden group cursor-pointer transition-transform active:scale-[0.98]"
      >
        <div className="w-16 h-16 rounded-full bg-[#050F0D]/15 flex items-center justify-center">
          <Asterisk className="w-10 h-10 stroke-[3] text-[#050F0D]" />
        </div>
        <span className="font-serif-heading text-2xl font-black tracking-wide">
          {t.dispatch108BigBtn}
        </span>
        <span className="text-xs font-bold text-[#050F0D]/90">
          {t.dispatchAutoGps}
        </span>
      </button>

      {/* Family & ASHA Broadcast SMS Button */}
      <div className="bg-[#13221f] border border-[#eaf7f2]/10 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6cd9c4]">
            <Radio className="w-4 h-4 text-[#6cd9c4] animate-pulse" />
            <span>{t.familyBroadcastTitle}</span>
          </div>
          <span className="text-[10px] text-[#93B7AE]">2 Contacts Linked</span>
        </div>

        <p className="text-xs text-[#bcc9c5]">
          {language === 'hi'
            ? `एक क्लिक में ${currentUser.emergencyContact.name} और ${currentUser.ashaWorker.name} को आपका जीपीएस व मेडिकल प्रोफाइल भेजें।`
            : `Instantly alerts ${currentUser.emergencyContact.name} & ASHA worker with live GPS & health profile.`}
        </p>

        <button
          onClick={handleBroadcast}
          className="w-full bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#6cd9c4]/30 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-[#EAF7F2] transition-all cursor-pointer"
        >
          {broadcastSent ? (
            <>
              <Check className="w-4 h-4 text-[#4ADE94]" />
              <span className="text-[#4ADE94]">{t.broadcastSentSuccess}</span>
            </>
          ) : (
            <>
              <Users className="w-4 h-4 text-[#6cd9c4]" />
              <span>{t.broadcastSosAlert}</span>
            </>
          )}
        </button>
      </div>

      {/* Speed Dial Numbers */}
      <div className="space-y-2">
        <h3 className="font-serif-heading text-sm font-bold text-[#EAF7F2]">
          {t.nationalHelplines}
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {emergencyNumbers.map((em) => (
            <a
              key={em.number}
              href={`tel:${em.number}`}
              onClick={(e) => {
                if (em.number === '108') {
                  e.preventDefault();
                  onTriggerSos();
                }
              }}
              className="bg-[#13221f] hover:bg-[#1d2d2a] border border-[#eaf7f2]/10 rounded-2xl p-3 flex flex-col justify-between space-y-2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="font-serif-heading text-xl font-bold" style={{ color: em.color }}>
                  {em.number}
                </span>
                <PhoneCall className="w-4 h-4 text-[#93B7AE] group-hover:text-[#6cd9c4]" />
              </div>
              <p className="text-[11px] text-[#bcc9c5] font-medium leading-tight">
                {em.title}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Offline First-Aid Instructions */}
      <div className="space-y-2.5 pt-2">
        <h3 className="font-serif-heading text-sm font-bold text-[#EAF7F2] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ffb961]" />
          <span>{t.firstAidWhileWaiting}</span>
        </h3>

        <div className="space-y-2">
          {firstAidGuides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className="w-full bg-[#13221f] hover:bg-[#1d2d2a] border border-[#eaf7f2]/10 rounded-2xl p-3 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffb961]/20 text-[#ffb961] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#EAF7F2] group-hover:text-[#6cd9c4]">
                    {language === 'hi' ? guide.hindiTitle : guide.title}
                  </h4>
                  <p className="text-[10px] text-[#93B7AE]">
                    {guide.steps.length} {t.lifeSavingSteps} • {guide.category}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#93B7AE] group-hover:text-[#6cd9c4]" />
            </button>
          ))}
        </div>
      </div>

      {/* Guide Detail Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0f1e1b] border border-[#ffb961]/40 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto hide-scroll">
            <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
              <div className="flex items-center gap-2 text-[#ffb961]">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-serif-heading text-base font-bold text-[#EAF7F2]">
                  {language === 'hi' ? activeGuide.hindiTitle : activeGuide.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warning callout */}
            <div className="bg-[#FF6E56]/15 border border-[#FF6E56]/40 p-3 rounded-xl flex items-start gap-2 text-xs text-[#FF6E56]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span><strong>Warning:</strong> {activeGuide.warning}</span>
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-2.5">
              {activeGuide.steps.map((step, idx) => (
                <div key={idx} className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6cd9c4]/20 text-[#6cd9c4] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-[#d4e6e1] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveGuide(null)}
              className="w-full bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold py-2.5 rounded-xl text-xs cursor-pointer"
            >
              {t.closeGuide}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
