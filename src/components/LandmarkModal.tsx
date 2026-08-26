import React, { useState } from 'react';
import { MapPin, X, Check, Mic, Send } from 'lucide-react';
import { LanguageCode } from '../types';
import { getT } from '../data/translations';

interface LandmarkModalProps {
  onClose: () => void;
  onSendLandmark: (landmark: string) => void;
  language: LanguageCode;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  onClose,
  onSendLandmark,
  language,
}) => {
  const [selectedLandmark, setSelectedLandmark] = useState('');
  const [customText, setCustomText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const t = getT(language);

  const presetLandmarks = [
    { en: 'Near Dhampur Primary School & Banyan Tree', hi: 'प्राथमिक विद्यालय एवं बरगद के पेड़ के पास' },
    { en: 'Opposite Dhampur Gram Panchayat Bhavan', hi: 'ग्राम पंचायत भवन के ठीक सामने' },
    { en: 'Behind Ram Mandir / Main Chauraha', hi: 'राम मंदिर / मुख्य चौराहे के पीछे वाली गली' },
    { en: 'Near Tube-well & Yellow Gate House', hi: 'ट्यूबवेल और पीले गेट वाले मकान के पास' },
  ];

  const handleSend = () => {
    const textToSend = customText.trim() || selectedLandmark || presetLandmarks[0].en;
    onSendLandmark(textToSend);
    setSentSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#ffb961]/40 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
          <div className="flex items-center gap-2 text-[#ffb961]">
            <MapPin className="w-5 h-5" />
            <h3 className="font-serif-heading text-lg font-bold text-[#EAF7F2]">
              {language === 'hi' ? 'गांव का पहचान स्थल' : 'Rural Landmark Guide'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#93B7AE]">
          {language === 'hi'
            ? 'एम्बुलेंस चालक को आपके घर तक सटीक पहुँचने के लिए मुख्य पहचान स्थल चुनें या बोलें:'
            : 'Select or record a prominent village landmark to help the 108 driver find your house fast:'}
        </p>

        {/* Preset village landmarks */}
        <div className="space-y-2">
          {presetLandmarks.map((lm, idx) => {
            const isSelected = selectedLandmark === lm.en;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedLandmark(lm.en);
                  setCustomText(language === 'hi' ? lm.hi : lm.en);
                }}
                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffb961]/20 border-[#ffb961] text-[#EAF7F2] font-semibold'
                    : 'bg-[#13221f] border-[#eaf7f2]/10 text-[#bcc9c5] hover:border-[#ffb961]/30'
                }`}
              >
                <span>{language === 'hi' ? lm.hi : lm.en}</span>
                {isSelected && <Check className="w-4 h-4 text-[#ffb961]" />}
              </button>
            );
          })}
        </div>

        {/* Custom text / voice input */}
        <div className="space-y-2 pt-1">
          <label className="text-[11px] font-semibold text-[#6cd9c4] block">
            {language === 'hi' ? 'या अपना पता/स्थल लिखें या बोलें:' : 'Or describe specific direction:'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. गली नं. 2, पानी की टंकी के पास' : 'e.g. Lane 2, near water tank...'}
              className="w-full bg-[#13221f] border border-[#eaf7f2]/20 rounded-xl px-3 py-2.5 text-xs text-[#EAF7F2] placeholder-[#93B7AE]/50 focus:outline-none focus:border-[#6cd9c4] pr-10"
            />
            <button
              onClick={() => {
                setIsRecording(!isRecording);
                if (!isRecording) {
                  setCustomText(
                    language === 'hi'
                      ? 'ग्राम पंचायत भवन के पीछे, पीला गेट'
                      : 'Behind Panchayat office, yellow gate'
                  );
                }
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isRecording ? 'bg-[#FF6E56] text-[#050F0D] animate-pulse' : 'text-[#6cd9c4] hover:bg-[#eaf7f2]/10'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={sentSuccess}
          className="w-full bg-[#ffb961] hover:bg-[#f5aa4d] text-[#2b1700] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md active:scale-98 cursor-pointer"
        >
          {sentSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>{language === 'hi' ? 'पहचान स्थल चालक को भेजा गया!' : 'Landmark Sent to Driver!'}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'चालक के जीपीएस में भेजें' : 'Send to Driver GPS'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
