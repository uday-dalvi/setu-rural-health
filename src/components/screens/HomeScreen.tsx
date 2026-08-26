import React from 'react';
import {
  UserProfile,
  AmbulanceDispatch,
  HospitalFacility,
  FirstAidGuide,
  LanguageCode,
} from '../../types';
import { getT } from '../../data/translations';
import { AmbulanceTracker } from '../AmbulanceTracker';
import {
  Stethoscope,
  FileText,
  Building2,
  ChevronRight,
  Asterisk,
  CheckCircle2,
  Activity,
  Heart,
} from 'lucide-react';

interface HomeScreenProps {
  currentUser: UserProfile;
  activeDispatch: AmbulanceDispatch | null;
  facilities: HospitalFacility[];
  firstAidGuides: FirstAidGuide[];
  onTriggerSos: () => void;
  onOpenSelfTriage: () => void;
  onOpenScanRx: () => void;
  onCallDriver: () => void;
  onShareLandmark: () => void;
  onCancelDispatch: () => void;
  onSelectFacility: (fac: HospitalFacility) => void;
  onNavigateToHospitals: () => void;
  onSelectFirstAid: (guide: FirstAidGuide) => void;
  language: LanguageCode;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  activeDispatch,
  facilities,
  firstAidGuides,
  onTriggerSos,
  onOpenSelfTriage,
  onOpenScanRx,
  onCallDriver,
  onShareLandmark,
  onCancelDispatch,
  onSelectFacility,
  onNavigateToHospitals,
  onSelectFirstAid,
  language,
}) => {
  const t = getT(language);

  return (
    <div className="space-y-4 pb-4">
      {/* Welcome & Connectivity Bar */}
      <div className="flex justify-between items-end mb-2 pt-1">
        <div>
          <h2 className="font-serif-heading text-[20px] font-bold text-[#EAF7F2] tracking-tight">
            {t.namaste}, {currentUser.name}
          </h2>
          <p className="text-xs text-[#93B7AE] mt-0.5">
            {t.village}: {currentUser.village}, {currentUser.district}
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="bg-[#eaf7f2]/[0.06] border border-[#eaf7f2]/15 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4ADE94] shadow-[0_0_8px_rgba(74,222,148,0.7)] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#EAF7F2] tracking-wide">{t.syncOk}</span>
        </div>
      </div>

      {/* Emergency Actions Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* SOS Button (Spans full 2 columns) */}
        <button
          id="btn-emergency-sos"
          onClick={onTriggerSos}
          className="col-span-2 bg-[#FF6E56] text-[#050F0D] rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 shadow-[0_4px_25px_rgba(255,110,86,0.35)] pulse-danger relative overflow-hidden group min-h-[120px] transition-transform active:scale-[0.98] cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-300 opacity-0 group-active:opacity-100"></div>

          {/* Asterisk / Emergency icon */}
          <Asterisk className="w-9 h-9 stroke-[3] text-[#050F0D]" />

          <span className="font-serif-heading text-[18px] tracking-wide font-black uppercase">
            {t.emergencySosTitle}
          </span>
          <span className="text-[11px] font-bold text-[#050F0D]/80">
            {t.emergencySosSub}
          </span>
        </button>

        {/* Self Triage Action */}
        <button
          id="btn-self-triage"
          onClick={onOpenSelfTriage}
          className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.14] backdrop-blur-md border border-[#eaf7f2]/15 rounded-2xl p-3.5 flex flex-col items-start gap-2.5 transition-all min-h-[96px] text-left cursor-pointer group active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2fa491]/25 border border-[#6cd9c4]/30 flex items-center justify-center text-[#6cd9c4] group-hover:scale-105 transition-transform">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#EAF7F2] block group-hover:text-[#6cd9c4]">
              {t.selfTriageTitle}
            </span>
            <span className="text-[10px] text-[#93B7AE]">
              {t.selfTriageSub}
            </span>
          </div>
        </button>

        {/* Scan Rx Action */}
        <button
          id="btn-scan-rx"
          onClick={onOpenScanRx}
          className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.14] backdrop-blur-md border border-[#eaf7f2]/15 rounded-2xl p-3.5 flex flex-col items-start gap-2.5 transition-all min-h-[96px] text-left cursor-pointer group active:scale-95 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#ffb961]/25 border border-[#ffb961]/30 flex items-center justify-center text-[#ffb961] group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#EAF7F2] block group-hover:text-[#ffb961]">
              {t.scanRxTitle}
            </span>
            <span className="text-[10px] text-[#93B7AE]">
              {t.scanRxSub}
            </span>
          </div>
        </button>
      </div>

      {/* Active Ambulance Tracking HUD (Shown when dispatched) */}
      {activeDispatch && (
        <div className="pt-1">
          <AmbulanceTracker
            dispatch={activeDispatch}
            onCallDriver={onCallDriver}
            onShareLandmark={onShareLandmark}
            onCancelDispatch={onCancelDispatch}
            language={language}
          />
        </div>
      )}

      {/* Nearest Facilities Quick Preview */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-serif-heading text-[16.5px] font-bold text-[#EAF7F2]">
            {t.nearestFacilities}
          </h3>
          <button
            onClick={onNavigateToHospitals}
            className="text-xs font-bold text-[#6cd9c4] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {facilities.slice(0, 2).map((fac) => (
            <div
              key={fac.id}
              onClick={() => onSelectFacility(fac)}
              className="bg-[#13221f] rounded-2xl border border-[#eaf7f2]/10 p-3.5 flex items-center justify-between hover:border-[#6cd9c4]/40 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f1e1b] border border-[#eaf7f2]/10 flex items-center justify-center text-[#6cd9c4] group-hover:border-[#6cd9c4]/50 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-[#EAF7F2] group-hover:text-[#6cd9c4]">
                      {fac.name}
                    </h4>
                    {fac.icuBedsAvailable > 0 && (
                      <span className="text-[9px] font-bold bg-[#4ADE94]/20 text-[#4ADE94] px-1.5 py-0.5 rounded border border-[#4ADE94]/30">
                        {fac.icuBedsAvailable} {t.icuBeds}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#93B7AE]">
                    {fac.type} • {fac.distanceKm} {t.kmAway}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#6cd9c4] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {t.dispatchAmbulanceHere}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline First-Aid Instructions Quick Banner */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-serif-heading text-[16px] font-bold text-[#EAF7F2] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#ffb961]" />
            <span>{t.emergencyFirstAid}</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {firstAidGuides.slice(0, 2).map((guide) => (
            <button
              key={guide.id}
              onClick={() => onSelectFirstAid(guide)}
              className="bg-[#13221f] hover:bg-[#1d2d2a] border border-[#eaf7f2]/10 rounded-2xl p-3 text-left transition-all cursor-pointer group space-y-1.5"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb961] bg-[#ffb961]/10 px-2 py-0.5 rounded-md inline-block">
                {guide.category}
              </span>
              <h4 className="font-bold text-xs text-[#EAF7F2] group-hover:text-[#6cd9c4] line-clamp-1">
                {language === 'hi' ? guide.hindiTitle : guide.title}
              </h4>
              <p className="text-[10px] text-[#93B7AE] line-clamp-1">
                {guide.steps.length} {t.lifeSavingSteps}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
