import React, { useState } from 'react';
import { Phone, MessageSquare, X, HeartHandshake, Check, AlertCircle } from 'lucide-react';
import { UserProfile, LanguageCode } from '../types';
import { getT } from '../data/translations';

interface AshaWorkerModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  language: LanguageCode;
}

export const AshaWorkerModal: React.FC<AshaWorkerModalProps> = ({
  currentUser,
  onClose,
  language,
}) => {
  const [showCallAlert, setShowCallAlert] = useState(false);
  const [quickAlertSent, setQuickAlertSent] = useState(false);
  const t = getT(language);

  const handleQuickAlert = () => {
    setQuickAlertSent(true);
    setTimeout(() => {
      setQuickAlertSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#6cd9c4]/30 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
          <div className="flex items-center gap-2 text-[#6cd9c4]">
            <HeartHandshake className="w-5 h-5" />
            <h3 className="font-serif-heading text-lg font-bold text-[#EAF7F2]">
              {t.ashaWorkerBadge}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ASHA Profile Card */}
        <div className="bg-[#13221f] p-4 rounded-xl border border-[#eaf7f2]/10 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#2fa491]/20 border-2 border-[#6cd9c4] flex items-center justify-center text-xl font-bold text-[#6cd9c4] shrink-0">
            MD
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-[#EAF7F2]">{currentUser.ashaWorker.name}</h4>
            <p className="text-xs text-[#6cd9c4] font-medium">{currentUser.ashaWorker.ward}</p>
            <p className="text-[11px] text-[#93B7AE] mt-0.5">
              {t.villageHealthWorker} • 24x7
            </p>
          </div>
        </div>

        {/* Quick Emergency Assistance Alert */}
        <div className="bg-[#FF6E56]/10 border border-[#FF6E56]/30 p-3 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF6E56]">
            <AlertCircle className="w-4 h-4" />
            <span>
              {language === 'hi' ? 'आपातकालीन घरेलू सहायता' : 'Emergency Home Visit Alert'}
            </span>
          </div>
          <p className="text-[11px] text-[#bcc9c5]">
            {language === 'hi'
              ? 'आशा दीदी को तुरंत सूचित करें कि आपके घर किसी की तबियत बिगड़ी है।'
              : 'Alert ASHA worker immediately to arrive at your home with first-aid & pulse oximeter.'}
          </p>
          <button
            onClick={handleQuickAlert}
            className="w-full bg-[#FF6E56] hover:bg-[#ff573d] text-[#050F0D] text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
          >
            {quickAlertSent ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'hi' ? 'आशा दीदी को सूचना भेजी गई!' : 'SOS Alert Sent to ASHA!'}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'घर आने के लिए संदेश भेजें' : 'Request Urgent Home Visit'}</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setShowCallAlert(true)}
            className="bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>{t.call}</span>
          </button>

          <button
            onClick={() => {
              window.location.href = `sms:${currentUser.ashaWorker.phone}?body=Namaste ASHA didi, I need health assistance at ${currentUser.village}`;
            }}
            className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#eaf7f2]/20 text-[#EAF7F2] font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#6cd9c4]" />
            <span>Message</span>
          </button>
        </div>

        {showCallAlert && (
          <div className="p-3 bg-[#13221f] rounded-xl border border-[#4ADE94]/40 text-xs text-center space-y-2 animate-in fade-in">
            <p className="text-[#4ADE94] font-semibold">
              Dialing: {currentUser.ashaWorker.phone}
            </p>
            <button
              onClick={() => setShowCallAlert(false)}
              className="text-[11px] text-[#93B7AE] hover:underline cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
