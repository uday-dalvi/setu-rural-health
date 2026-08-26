import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, ShieldCheck } from 'lucide-react';
import { AmbulanceDispatch, LanguageCode } from '../types';
import { getT } from '../data/translations';

interface CallDriverModalProps {
  dispatch: AmbulanceDispatch;
  onClose: () => void;
  language: LanguageCode;
}

export const CallDriverModal: React.FC<CallDriverModalProps> = ({
  dispatch,
  onClose,
  language,
}) => {
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const t = getT(language);

  useEffect(() => {
    const ringTimer = setTimeout(() => {
      setCallState('connected');
    }, 2000);

    return () => clearTimeout(ringTimer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#6cd9c4]/30 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient calling glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#6cd9c4]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#6cd9c4] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>108 EMERGENCY HOTLINE</span>
        </div>

        {/* Driver Avatar */}
        <div className="relative mx-auto w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-[#1d2d2a] border-2 border-[#6cd9c4] p-1 flex items-center justify-center overflow-hidden mx-auto shadow-[0_0_20px_rgba(108,217,196,0.3)]">
            <div className="w-full h-full rounded-full bg-[#00382f] flex items-center justify-center text-3xl font-bold text-[#6cd9c4]">
              RK
            </div>
          </div>
          {callState === 'ringing' && (
            <span className="absolute inset-0 rounded-full border-2 border-[#6cd9c4] animate-ping opacity-75"></span>
          )}
        </div>

        <div>
          <h3 className="font-serif-heading text-xl font-bold text-[#EAF7F2]">{dispatch.driverName}</h3>
          <p className="text-xs text-[#6cd9c4] font-mono mt-0.5">{dispatch.vehicleNumber}</p>
          <p className="text-xs text-[#93B7AE] mt-1">
            {callState === 'ringing'
              ? (language === 'hi' ? 'घंटी बज रही है...' : 'Ringing 108 Emergency Ambulance...')
              : `${language === 'hi' ? 'कॉल जारी है' : 'Connected'} • ${formatTime(seconds)}`}
          </p>
        </div>

        {/* Audio conversation transcript simulation */}
        {callState === 'connected' && (
          <div className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 text-left text-xs space-y-2">
            <div className="flex gap-2 items-start">
              <span className="text-[#6cd9c4] font-bold shrink-0">Driver:</span>
              <p className="text-[#d4e6e1]">
                {language === 'hi'
                  ? '"हाँ राजेश जी, मैं मुख्य सड़क पार कर चुका हूँ। बस 5 मिनट में आपके घर पहुँच रहा हूँ।"'
                  : '"Hello, I have crossed the main road and will reach your location in about 5 minutes."'}
              </p>
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isMuted
                ? 'bg-[#FF6E56]/20 border-[#FF6E56] text-[#FF6E56]'
                : 'bg-[#1d2d2a] border-[#eaf7f2]/20 text-[#d4e6e1] hover:bg-[#eaf7f2]/10'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-[#FF6E56] hover:bg-[#ff573d] text-[#050F0D] flex items-center justify-center shadow-[0_0_25px_rgba(255,110,86,0.6)] transition-all transform active:scale-90 cursor-pointer"
          >
            <PhoneOff className="w-7 h-7 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
