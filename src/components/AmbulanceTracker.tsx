import React, { useEffect, useState } from 'react';
import { AmbulanceDispatch, LanguageCode } from '../types';
import { getT } from '../data/translations';
import { Navigation, Phone, MapPin, CheckCircle, Shield } from 'lucide-react';

interface AmbulanceTrackerProps {
  dispatch: AmbulanceDispatch;
  onCallDriver: () => void;
  onShareLandmark: () => void;
  onCancelDispatch: () => void;
  language: LanguageCode;
}

export const AmbulanceTracker: React.FC<AmbulanceTrackerProps> = ({
  dispatch,
  onCallDriver,
  onShareLandmark,
  onCancelDispatch,
  language,
}) => {
  const [eta, setEta] = useState(dispatch.etaMinutes);
  const [markerPos, setMarkerPos] = useState({ x: 270, y: 40 });
  const [progress, setProgress] = useState(dispatch.progressPercent);
  const t = getT(language);

  // Dynamic simulation of moving ambulance
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev >= 95 ? 95 : prev + 3;
        return next;
      });

      setEta((prev) => (prev > 1 ? Math.max(1, prev - 0.2) : 1));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  // Calculate coordinates along curve
  useEffect(() => {
    const ratio = progress / 100;
    const currentX = 270 - ratio * 230;
    const currentY = 40 + Math.sin(ratio * Math.PI) * 50 + ratio * 70;
    setMarkerPos({ x: currentX, y: currentY });
  }, [progress]);

  const displayEta = Math.ceil(eta);

  return (
    <div
      id="active-tracking-card"
      className="bg-[#1d2d2a] rounded-2xl border border-[#6cd9c4]/40 overflow-hidden relative shadow-[0_0_25px_rgba(108,217,196,0.15)] animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Map Viewport */}
      <div className="h-44 w-full relative map-bg border-b border-[#eaf7f2]/15 overflow-hidden">
        {/* GPS Active Badge */}
        <div className="absolute top-2.5 right-2.5 bg-[#050F0D]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[#6cd9c4] text-[11px] font-bold border border-[#6cd9c4]/30 flex items-center gap-1.5 z-20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#6cd9c4] animate-ping"></span>
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.liveGpsArriving}</span>
        </div>

        {/* Dispatch Tag */}
        <div className="absolute top-2.5 left-2.5 bg-[#FF6E56]/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[#FF6E56] text-[11px] font-bold border border-[#FF6E56]/40 flex items-center gap-1.5 z-20">
          <Shield className="w-3.5 h-3.5" />
          <span>108 EMERGENCY</span>
        </div>

        {/* Simulated Route SVG */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {/* Base Road */}
          <path
            d="M 270 40 Q 180 30 140 85 T 35 125"
            fill="none"
            stroke="rgba(234, 247, 242, 0.15)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Animated Route Line */}
          <path
            d="M 270 40 Q 180 30 140 85 T 35 125"
            fill="none"
            stroke="#6cd9c4"
            strokeDasharray="8 6"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </svg>

        {/* User Patient Location (Amber Beacon) */}
        <div
          className="absolute w-6 h-6 -ml-3 -mt-3 bg-[#ffb961] rounded-full border-2 border-[#050F0D] shadow-[0_0_15px_rgba(255,185,97,0.9)] z-20 flex items-center justify-center"
          style={{ left: '35px', top: '125px' }}
        >
          <div className="w-2 h-2 bg-[#050F0D] rounded-full"></div>
          <span className="absolute -bottom-5 text-[10px] font-bold text-[#ffb961] bg-[#050F0D]/90 px-1.5 py-0.2 rounded whitespace-nowrap">
            {language === 'hi' ? 'आपका स्थान' : 'Your Home'}
          </span>
        </div>

        {/* Moving Ambulance Marker */}
        <div
          id="amb-marker"
          className="absolute w-9 h-9 -ml-4.5 -mt-4.5 bg-[#6cd9c4] rounded-full border-2 border-[#050F0D] flex items-center justify-center shadow-[0_0_20px_rgba(108,217,196,0.9)] z-30 transition-all duration-700 ease-out"
          style={{ left: `${markerPos.x}px`, top: `${markerPos.y}px` }}
        >
          <svg className="w-5 h-5 text-[#00382f]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
            <circle cx="7.5" cy="14.5" r="1.5" />
            <circle cx="16.5" cy="14.5" r="1.5" />
          </svg>
        </div>

        {/* Speed / Landmark HUD Pill */}
        <div className="absolute bottom-2 right-2.5 bg-[#050F0D]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#bcc9c5] border border-[#eaf7f2]/10 z-20">
          52 km/h • {dispatch.currentLocation.landmark}
        </div>
      </div>

      {/* HUD Details */}
      <div className="p-4 space-y-3.5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif-heading text-[17px] font-bold text-[#6cd9c4] flex items-center gap-2">
              {t.dispatch108Active}
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6cd9c4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6cd9c4]"></span>
              </span>
            </h3>
            <p className="text-xs text-[#d4e6e1] font-medium mt-0.5">
              {dispatch.type} • <span className="text-[#6cd9c4] font-mono font-bold">{dispatch.vehicleNumber}</span>
            </p>
            <p className="text-[11px] text-[#93B7AE]">
              {t.driver}: <strong className="text-[#d4e6e1]">{dispatch.driverName}</strong> (⭐ {dispatch.driverRating})
            </p>
          </div>
          <div className="text-right bg-[#13221f] px-3 py-1.5 rounded-xl border border-[#6cd9c4]/20">
            <span className="font-serif-heading text-2xl font-bold text-[#EAF7F2] block leading-tight">
              {displayEta} <span className="text-xs font-sans text-[#6cd9c4]">{t.mins}</span>
            </span>
            <span className="text-[10px] text-[#93B7AE]">{t.eta}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onCallDriver}
            className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#eaf7f2]/20 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-[#EAF7F2] font-semibold text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#4ADE94]" />
            <span>{t.callDriver}</span>
          </button>

          <button
            onClick={onShareLandmark}
            className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#eaf7f2]/20 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-[#EAF7F2] font-semibold text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <MapPin className="w-4 h-4 text-[#ffb961]" />
            <span>{t.sendLandmark}</span>
          </button>
        </div>

        {/* Destination Facility Indicator & Cancel */}
        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#eaf7f2]/10 text-[#93B7AE]">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#6cd9c4]" />
            <span>
              {language === 'hi' ? 'गंतव्य:' : 'Destination:'} <strong className="text-[#d4e6e1]">{dispatch.destinationFacility}</strong>
            </span>
          </div>
          <button
            onClick={onCancelDispatch}
            className="text-[#FF6E56] hover:underline cursor-pointer font-medium"
          >
            {t.cancelRequest}
          </button>
        </div>
      </div>
    </div>
  );
};
