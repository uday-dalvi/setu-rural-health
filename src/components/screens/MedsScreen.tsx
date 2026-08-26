import React, { useState } from 'react';
import { Medicine, Prescription, LanguageCode } from '../../types';
import { getT } from '../../data/translations';
import {
  Pill,
  CheckCircle2,
  Circle,
  Plus,
  Volume2,
  Store,
  TrendingDown,
} from 'lucide-react';

interface MedsScreenProps {
  medicines: Medicine[];
  prescriptions: Prescription[];
  onToggleTaken: (medId: string, slot: 'morning' | 'afternoon' | 'evening' | 'night') => void;
  onOpenScanRx: () => void;
  language: LanguageCode;
}

export const MedsScreen: React.FC<MedsScreenProps> = ({
  medicines,
  prescriptions,
  onToggleTaken,
  onOpenScanRx,
  language,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'savings' | 'wallet'>('schedule');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const t = getT(language);

  const totalMarketPrice = medicines.reduce((sum, m) => sum + m.marketPrice, 0);
  const totalJanAushadhiPrice = medicines.reduce((sum, m) => sum + m.janAushadhiPrice, 0);
  const totalMonthlySavings = (totalMarketPrice - totalJanAushadhiPrice) * 2;

  const handleSpeak = (med: Medicine) => {
    setSpeakingId(med.id);
    setTimeout(() => {
      setSpeakingId(null);
    }, 2800);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Title & SubTab Switcher */}
      <div className="flex justify-between items-center pt-1">
        <div>
          <h2 className="font-serif-heading text-[20px] font-bold text-[#EAF7F2]">
            {t.todaysMeds}
          </h2>
          <p className="text-xs text-[#93B7AE]">
            {t.medsScheduleSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenScanRx}
          className="bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.scanNewPrescription}</span>
        </button>
      </div>

      {/* Sub tabs navigation */}
      <div className="bg-[#13221f] p-1 rounded-xl border border-[#eaf7f2]/10 flex gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('schedule')}
          className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
            activeSubTab === 'schedule'
              ? 'bg-[#2fa491]/25 text-[#6cd9c4] border border-[#6cd9c4]/30 shadow-sm'
              : 'text-[#93B7AE] hover:text-[#d4e6e1]'
          }`}
        >
          {t.todaysMeds}
        </button>
        <button
          onClick={() => setActiveSubTab('savings')}
          className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
            activeSubTab === 'savings'
              ? 'bg-[#4ADE94]/20 text-[#4ADE94] border border-[#4ADE94]/30 shadow-sm'
              : 'text-[#93B7AE] hover:text-[#d4e6e1]'
          }`}
        >
          {t.janAushadhiSaving}
        </button>
        <button
          onClick={() => setActiveSubTab('wallet')}
          className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
            activeSubTab === 'wallet'
              ? 'bg-[#ffb961]/20 text-[#ffb961] border border-[#ffb961]/30 shadow-sm'
              : 'text-[#93B7AE] hover:text-[#d4e6e1]'
          }`}
        >
          {t.prescriptionsRecord}
        </button>
      </div>

      {/* SUBTAB 1: DAILY SCHEDULE */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-3">
          {/* Progress Tracker Card */}
          <div className="bg-gradient-to-r from-[#1d2d2a] to-[#13221f] p-3.5 rounded-2xl border border-[#6cd9c4]/30 flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6cd9c4]">
                {language === 'hi' ? 'दैनिक अनुपालन' : 'Daily Adherence'}
              </span>
              <h4 className="font-serif-heading text-lg font-bold text-[#EAF7F2]">
                3 / 4 {language === 'hi' ? 'खुराक ली गई' : 'Doses Taken'}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-full border-3 border-[#4ADE94] flex items-center justify-center font-bold text-xs text-[#4ADE94] bg-[#4ADE94]/10 shadow-[0_0_10px_rgba(74,222,148,0.3)]">
              75%
            </div>
          </div>

          {/* Medicines Checklist */}
          <div className="space-y-2.5">
            {medicines.map((med) => {
              const isMorningTaken = !!med.takenToday.morning;
              const isNightTaken = !!med.takenToday.night;

              return (
                <div
                  key={med.id}
                  className="bg-[#13221f] rounded-2xl border border-[#eaf7f2]/10 p-3.5 space-y-2.5 hover:border-[#6cd9c4]/30 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#2fa491]/20 text-[#6cd9c4] flex items-center justify-center shrink-0 mt-0.5">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#EAF7F2]">{med.name}</h4>
                        <p className="text-[11px] text-[#6cd9c4] font-medium">{med.genericName}</p>
                        <p className="text-[10px] text-[#93B7AE]">{med.purpose}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(med)}
                      className="w-7 h-7 rounded-lg bg-[#eaf7f2]/[0.08] hover:bg-[#6cd9c4] hover:text-[#00382f] text-[#6cd9c4] flex items-center justify-center transition-colors cursor-pointer"
                      title="Listen dosage instruction"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {speakingId === med.id && (
                    <div className="bg-[#00382f] text-[#6cd9c4] text-[11px] p-2 rounded-lg font-medium animate-in fade-in flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      <span>
                        {med.name}: {med.dosage} ({med.instruction})
                      </span>
                    </div>
                  )}

                  {/* Timing slots checkbox toggles */}
                  <div className="flex gap-2 pt-1 border-t border-[#eaf7f2]/10">
                    {med.timing.includes('morning') && (
                      <button
                        onClick={() => onToggleTaken(med.id, 'morning')}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isMorningTaken
                            ? 'bg-[#4ADE94]/20 border-[#4ADE94] text-[#4ADE94]'
                            : 'bg-[#0f1e1b] border-[#eaf7f2]/15 text-[#93B7AE] hover:border-[#6cd9c4]'
                        }`}
                      >
                        {isMorningTaken ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>{t.morning}</span>
                      </button>
                    )}

                    {med.timing.includes('night') && (
                      <button
                        onClick={() => onToggleTaken(med.id, 'night')}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isNightTaken
                            ? 'bg-[#4ADE94]/20 border-[#4ADE94] text-[#4ADE94]'
                            : 'bg-[#0f1e1b] border-[#eaf7f2]/15 text-[#93B7AE] hover:border-[#6cd9c4]'
                        }`}
                      >
                        {isNightTaken ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>{t.night}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: JAN AUSHADHI GENERIC SAVINGS */}
      {activeSubTab === 'savings' && (
        <div className="space-y-3">
          {/* Savings Highlight Card */}
          <div className="bg-[#4ADE94]/15 border-2 border-[#4ADE94]/40 p-4 rounded-2xl space-y-2 text-center">
            <TrendingDown className="w-7 h-7 text-[#4ADE94] mx-auto" />
            <h3 className="font-serif-heading text-lg font-bold text-[#4ADE94]">
              {t.janAushadhiSaving}
            </h3>
            <p className="text-xs text-[#d4e6e1]">
              {language === 'hi'
                ? 'ब्रांडेड दवाओं की जगह सरकारी जन औषधि जेनेरिक दवाएं लेकर आप हर महीने बचा रहे हैं:'
                : 'Switching to government-certified Jan Aushadhi generic salts saves:'}
            </p>
            <div className="bg-[#13221f] py-2 px-4 rounded-xl inline-block border border-[#4ADE94]/30 mt-1">
              <span className="font-serif-heading text-2xl font-black text-[#4ADE94]">
                ₹{totalMonthlySavings} / {language === 'hi' ? 'माह' : 'Month'}
              </span>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-[#EAF7F2]">
              {t.marketPrice} vs {t.govtPrice} (10 Tabs):
            </h4>

            {medicines.map((m) => {
              const diff = m.marketPrice - m.janAushadhiPrice;
              const percentSaved = Math.round((diff / m.marketPrice) * 100);

              return (
                <div
                  key={m.id}
                  className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#EAF7F2]">{m.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4ADE94]/20 text-[#4ADE94]">
                      {percentSaved}% OFF
                    </span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-[#eaf7f2]/10">
                    <span className="text-[#93B7AE]">
                      {t.marketPrice}: <del>₹{m.marketPrice}</del>
                    </span>
                    <span className="text-[#6cd9c4] font-bold">
                      {t.govtPrice}: ₹{m.janAushadhiPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nearest Jan Aushadhi Kendra */}
          <div className="bg-[#1d2d2a] p-3 rounded-xl border border-[#6cd9c4]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#6cd9c4]" />
              <div>
                <p className="font-bold text-[#EAF7F2]">Dhampur Jan Aushadhi Kendra</p>
                <p className="text-[10px] text-[#93B7AE]">Near CHC Hospital Gate • 2.4 km</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#4ADE94] bg-[#4ADE94]/20 px-2 py-1 rounded">
              Open Now
            </span>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PRESCRIPTION WALLET */}
      {activeSubTab === 'wallet' && (
        <div className="space-y-3">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-[#13221f] p-4 rounded-2xl border border-[#eaf7f2]/10 space-y-3 shadow-sm"
            >
              <div className="flex justify-between items-start pb-2 border-b border-[#eaf7f2]/10">
                <div>
                  <h4 className="font-bold text-xs text-[#EAF7F2]">{rx.doctorName}</h4>
                  <p className="text-[11px] text-[#6cd9c4]">{rx.doctorSpecialty}</p>
                  <p className="text-[10px] text-[#93B7AE]">{rx.facility}</p>
                </div>
                <span className="text-[10px] font-semibold bg-[#1d2d2a] text-[#bcc9c5] px-2 py-1 rounded-lg">
                  {rx.date}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-[#93B7AE]">
                  Diagnosis: <strong className="text-[#EAF7F2]">{rx.diagnosis}</strong>
                </p>

                <div className="space-y-1 pt-1">
                  {rx.medicines.map((m, idx) => (
                    <div key={idx} className="bg-[#0f1e1b] p-2 rounded-lg text-[11px] space-y-0.5">
                      <p className="font-bold text-[#6cd9c4]">{m.name} ({m.dosage})</p>
                      <p className="text-[#93B7AE]">{m.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-[#ffb961] italic">
                Advice: "{rx.adviceNotes}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
