import React, { useState } from 'react';
import {
  FileText,
  X,
  Camera,
  CheckCircle,
  Sparkles,
  Volume2,
  IndianRupee,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Medicine, LanguageCode } from '../types';
import { getT } from '../data/translations';

interface ScanRxModalProps {
  onClose: () => void;
  onAddMedicines: (newMeds: Medicine[]) => void;
  language: LanguageCode;
}

export const ScanRxModal: React.FC<ScanRxModalProps> = ({
  onClose,
  onAddMedicines,
  language,
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'analyzed'>('idle');
  const [speakingMed, setSpeakingMed] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const t = getT(language);

  const sampleScannedMeds: Medicine[] = [
    {
      id: 'scanned_1',
      name: 'Glycomet 500mg',
      genericName: 'Metformin Hydrochloride 500mg',
      dosage: '1 Tablet',
      timing: ['morning', 'night'],
      instruction: 'After Food',
      purpose: 'Blood Sugar Control (Diabetes)',
      prescribedBy: 'Dr. Arvind Sharma (CHC)',
      remainingPills: 30,
      totalPills: 30,
      takenToday: { morning: false, night: false },
      marketPrice: 65,
      janAushadhiPrice: 12,
      inStockAtVillagePharmacy: true,
    },
    {
      id: 'scanned_2',
      name: 'Telma 40mg',
      genericName: 'Telmisartan 40mg',
      dosage: '1 Tablet',
      timing: ['morning'],
      instruction: 'After Food',
      purpose: 'Blood Pressure Control',
      prescribedBy: 'Dr. Arvind Sharma (CHC)',
      remainingPills: 30,
      totalPills: 30,
      takenToday: { morning: false },
      marketPrice: 110,
      janAushadhiPrice: 18,
      inStockAtVillagePharmacy: true,
    },
    {
      id: 'scanned_3',
      name: 'Pan 40',
      genericName: 'Pantoprazole 40mg',
      dosage: '1 Capsule',
      timing: ['morning'],
      instruction: 'Before Food',
      purpose: 'Gastric Acidity & Gas',
      prescribedBy: 'Dr. Arvind Sharma (CHC)',
      remainingPills: 15,
      totalPills: 15,
      takenToday: { morning: false },
      marketPrice: 95,
      janAushadhiPrice: 16,
      inStockAtVillagePharmacy: true,
    },
  ];

  const handleStartScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('analyzed');
    }, 2200);
  };

  const handleSaveToSchedule = () => {
    onAddMedicines(sampleScannedMeds);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const playVoiceInstruction = (medName: string, hindiDesc: string) => {
    setSpeakingMed(medName);
    setTimeout(() => {
      setSpeakingMed(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#ffb961]/40 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto hide-scroll">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
          <div className="flex items-center gap-2 text-[#ffb961]">
            <FileText className="w-5 h-5" />
            <h3 className="font-serif-heading text-lg font-bold text-[#EAF7F2]">
              {t.scanRxTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {scanState === 'idle' && (
          <div className="space-y-4 text-center">
            {/* Viewfinder area */}
            <div
              onClick={handleStartScan}
              className="border-2 border-dashed border-[#6cd9c4]/50 rounded-2xl p-8 bg-[#13221f]/60 hover:bg-[#13221f] transition-all cursor-pointer group flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-[#ffb961]/20 group-hover:scale-110 text-[#ffb961] flex items-center justify-center transition-transform">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#EAF7F2]">
                  {language === 'hi' ? 'डॉक्टर का पर्चा फोटो लें या अपलोड करें' : 'Capture or Upload Doctor\'s Prescription'}
                </p>
                <p className="text-xs text-[#93B7AE] mt-1">
                  {language === 'hi'
                    ? 'AI हाथ से लिखी पर्ची पढ़कर खुराक व समय बताएगा'
                    : 'AI automatically detects handwritten medicines, timings & cheap generic alternatives'}
                </p>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#6cd9c4] text-[#00382f] shadow-sm">
                {language === 'hi' ? 'फोटो खींचें / स्कैन शुरू करें' : 'Tap to Start Scan'}
              </span>
            </div>

            {/* Benefits Banner */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs">
              <div className="bg-[#13221f] p-2.5 rounded-xl border border-[#eaf7f2]/10 flex items-start gap-2">
                <IndianRupee className="w-4 h-4 text-[#4ADE94] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#bcc9c5]">
                  {language === 'hi' ? 'जन औषधि से 75% तक बचत' : 'Up to 75% Jan Aushadhi generic savings'}
                </span>
              </div>
              <div className="bg-[#13221f] p-2.5 rounded-xl border border-[#eaf7f2]/10 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-[#ffb961] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#bcc9c5]">
                  {language === 'hi' ? 'दवा लेने का समय बोलकर समझाएगा' : 'Voice explanation in your language'}
                </span>
              </div>
            </div>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="space-y-6 py-8 text-center">
            <div className="relative w-40 h-48 mx-auto rounded-xl overflow-hidden border-2 border-[#6cd9c4] bg-[#13221f]">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80"
                alt="Prescription"
                className="w-full h-full object-cover opacity-60"
              />
              {/* Laser scanning bar */}
              <div className="absolute inset-x-0 h-1 bg-[#6cd9c4] shadow-[0_0_15px_#6cd9c4] animate-bounce"></div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#6cd9c4]">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{language === 'hi' ? 'पर्चे का विश्लेषण हो रहा है...' : 'AI Analyzing Prescription...'}</span>
              </div>
              <p className="text-xs text-[#93B7AE]">
                {language === 'hi' ? 'दवाओं के नाम व खुराक पहचानी जा रही है' : 'Extracting dosage, schedules & generic alternatives'}
              </p>
            </div>
          </div>
        )}

        {scanState === 'analyzed' && (
          <div className="space-y-4">
            {/* Scanned Summary Banner */}
            <div className="bg-[#2fa491]/20 border border-[#6cd9c4]/40 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#6cd9c4]" />
                <div>
                  <h4 className="font-bold text-xs text-[#EAF7F2]">
                    {language === 'hi' ? '3 दवाइयाँ सफलतापूर्वक पहचानी गईं' : '3 Medicines Successfully Extracted'}
                  </h4>
                  <p className="text-[10px] text-[#93B7AE]">Dr. Arvind Sharma • Dhampur CHC</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-[#4ADE94]/20 text-[#4ADE94] px-2 py-0.5 rounded">
                Verified OCR
              </span>
            </div>

            {/* Extracted medicines list */}
            <div className="space-y-2.5">
              {sampleScannedMeds.map((med) => {
                const savings = med.marketPrice - med.janAushadhiPrice;
                return (
                  <div
                    key={med.id}
                    className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-xs text-[#EAF7F2]">{med.name}</h5>
                        <p className="text-[11px] text-[#6cd9c4] font-medium">{med.genericName}</p>
                        <p className="text-[10px] text-[#93B7AE]">{med.purpose}</p>
                      </div>
                      <button
                        onClick={() => playVoiceInstruction(med.name, med.instruction)}
                        className="w-7 h-7 rounded-lg bg-[#eaf7f2]/[0.08] hover:bg-[#6cd9c4] hover:text-[#00382f] text-[#6cd9c4] flex items-center justify-center transition-colors cursor-pointer"
                        title="Listen to dosage timing"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {speakingMed === med.name && (
                      <div className="bg-[#00382f] text-[#6cd9c4] text-[11px] p-2 rounded-lg font-medium animate-in fade-in flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>
                          {med.name}: {med.dosage} ({med.instruction})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-[#eaf7f2]/10 text-[11px]">
                      <span className="text-[#bcc9c5]">
                        {language === 'hi' ? 'समय:' : 'Schedule:'} <strong>{med.timing.join(' + ')} ({med.instruction})</strong>
                      </span>
                      <span className="text-[#4ADE94] font-bold">
                        {language === 'hi' ? `₹${savings} बचत (जन औषधि)` : `Save ₹${savings}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Monthly Savings Card */}
            <div className="bg-[#4ADE94]/10 border border-[#4ADE94]/30 p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="text-[#d4e6e1] font-medium">
                {language === 'hi' ? 'कुल मासिक बचत (जन औषधि केन्द्र):' : 'Total Jan Aushadhi Monthly Savings:'}
              </span>
              <strong className="text-base font-bold text-[#4ADE94]">₹214 / Month</strong>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveToSchedule}
              disabled={savedSuccess}
              className="w-full bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>{language === 'hi' ? 'दवाइयों की सूची में जोड़ा गया!' : 'Added to Daily Medicine Schedule!'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{language === 'hi' ? 'मेरी दैनिक दवा सूची में जोड़ें' : 'Save to My Medicine Schedule'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
