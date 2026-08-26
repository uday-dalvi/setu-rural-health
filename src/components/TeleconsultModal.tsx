import React, { useState, useEffect } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  FileText,
} from 'lucide-react';
import { Doctor, UserProfile, LanguageCode } from '../types';
import { getT } from '../data/translations';

interface TeleconsultModalProps {
  doctor: Doctor;
  currentUser: UserProfile;
  onClose: () => void;
  language: LanguageCode;
}

export const TeleconsultModal: React.FC<TeleconsultModalProps> = ({
  doctor,
  currentUser,
  onClose,
  language,
}) => {
  const [callState, setCallState] = useState<'connecting' | 'active'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'notes'>('video');
  const t = getT(language);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallState('active');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'active') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#6cd9c4]/40 rounded-3xl w-full max-w-md h-[88vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top bar with doctor status */}
        <div className="bg-[#050F0D]/90 px-4 py-3 border-b border-[#eaf7f2]/10 flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2fa491]/20 border border-[#6cd9c4] flex items-center justify-center text-[#6cd9c4] text-xs font-bold">
              Dr
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#EAF7F2]">{doctor.name}</h4>
              <p className="text-[10px] text-[#6cd9c4]">
                {doctor.specialty} • {callState === 'active' ? formatTimer(callDuration) : 'Connecting...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4ADE94]/20 text-[#4ADE94] font-semibold border border-[#4ADE94]/30">
              e-Sanjeevani Live
            </span>
          </div>
        </div>

        {/* Video Stage / Notes Area */}
        <div className="flex-1 relative bg-[#050F0D] overflow-hidden flex flex-col">
          {activeTab === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-[#071915]">
              {/* Doctor Remote Stream Simulation */}
              <div className="w-full h-full relative flex items-center justify-center">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050F0D] via-transparent to-black/40"></div>

                {/* Vitals HUD overlay */}
                <div className="absolute top-3 left-3 bg-[#050F0D]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#6cd9c4]/30 text-[11px] space-y-0.5">
                  <div className="text-[#93B7AE]">
                    Patient: <strong className="text-[#EAF7F2]">{currentUser.name} ({currentUser.age}y, {currentUser.gender})</strong>
                  </div>
                  <div className="text-[#6cd9c4]">
                    BP: <strong>130/85 mmHg</strong> • SpO2: <strong>98%</strong>
                  </div>
                </div>

                {/* Connecting overlay */}
                {callState === 'connecting' && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full border-3 border-[#6cd9c4] border-t-transparent animate-spin"></div>
                    <p className="text-xs font-bold text-[#6cd9c4]">
                      Connecting to Doctor Room...
                    </p>
                  </div>
                )}

                {/* Doctor speaking subtitle simulation */}
                {callState === 'active' && (
                  <div className="absolute bottom-4 inset-x-4 bg-[#0f1e1b]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#eaf7f2]/15 text-xs text-[#d4e6e1] shadow-lg">
                    <p className="font-semibold text-[#6cd9c4] text-[10px] uppercase tracking-wider mb-0.5">
                      Live Teleconsultation:
                    </p>
                    <p>
                      {language === 'hi'
                        ? '"नमस्ते राजेश जी, आपकी शुगर और बीपी की रिपोर्ट देख रहा हूँ। सुबह की दवा नियमित रूप से लेते रहें।"'
                        : '"Namaste, I am reviewing your blood pressure reading. Please continue taking your morning tablet after food."'}
                    </p>
                  </div>
                )}
              </div>

              {/* Patient PIP (Picture in picture) */}
              <div className="absolute top-3 right-3 w-24 h-32 rounded-xl overflow-hidden border-2 border-[#6cd9c4] shadow-lg bg-[#13221f]">
                {isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-[#93B7AE]">
                    Camera Off
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-1 left-1 bg-black/60 px-1 py-0.2 rounded text-[9px] text-white">
                  You
                </div>
              </div>
            </div>
          ) : (
            /* Digital Prescription / Doctor Advice Notes */
            <div className="p-4 space-y-3 bg-[#0f1e1b] h-full overflow-y-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6cd9c4]">
                <FileText className="w-4 h-4" />
                <span>Live Digital e-Prescription</span>
              </div>
              <div className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 space-y-2 text-xs">
                <p className="text-[#93B7AE]">Diagnosis: <strong className="text-[#EAF7F2]">Routine Hypertension Follow-up</strong></p>
                <div className="border-t border-[#eaf7f2]/10 pt-2 space-y-1.5">
                  <p className="font-semibold text-[#6cd9c4]">• Continue Telma 40mg (1 Tab OD in Morning)</p>
                  <p className="font-semibold text-[#6cd9c4]">• Glycomet 500mg (1 Tab BD with Meals)</p>
                  <p className="text-[#bcc9c5]">• Walk 25 mins daily, reduce salt intake</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab switch bar: Video vs Doctor's Note */}
        <div className="bg-[#050F0D] border-t border-[#eaf7f2]/10 px-4 py-2 flex justify-between items-center text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'video' ? 'bg-[#2fa491]/20 text-[#6cd9c4] font-bold' : 'text-[#93B7AE]'
            }`}
          >
            Video Screen
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'notes' ? 'bg-[#2fa491]/20 text-[#6cd9c4] font-bold' : 'text-[#93B7AE]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Doctor Notes & Rx</span>
          </button>
        </div>

        {/* Bottom Call Controls */}
        <div className="bg-[#050F0D] px-6 py-4 border-t border-[#eaf7f2]/10 flex items-center justify-around">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isAudioMuted ? 'bg-[#FF6E56]/20 border-[#FF6E56] text-[#FF6E56]' : 'bg-[#13221f] border-[#eaf7f2]/20 text-[#d4e6e1]'
            }`}
          >
            {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-[#FF6E56] hover:bg-[#ff573d] text-[#050F0D] flex items-center justify-center shadow-[0_0_20px_rgba(255,110,86,0.5)] transition-all transform active:scale-90 cursor-pointer"
          >
            <PhoneOff className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isVideoOff ? 'bg-[#FF6E56]/20 border-[#FF6E56] text-[#FF6E56]' : 'bg-[#13221f] border-[#eaf7f2]/20 text-[#d4e6e1]'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
