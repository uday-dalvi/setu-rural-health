import React, { useState } from 'react';
import {
  Stethoscope,
  X,
  AlertTriangle,
  Heart,
  Flame,
  Bug,
  Activity,
  Baby,
  ShieldAlert,
  CheckCircle,
  PhoneCall,
  Video,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { getT } from '../data/translations';

interface SelfTriageModalProps {
  onClose: () => void;
  onTriggerSos: () => void;
  onStartDoctorCall: () => void;
  language: LanguageCode;
}

interface SymptomOption {
  id: string;
  nameEn: string;
  nameHi: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  isEmergencyDefault?: boolean;
}

export const SelfTriageModal: React.FC<SelfTriageModalProps> = ({
  onClose,
  onTriggerSos,
  onStartDoctorCall,
  language,
}) => {
  const [step, setStep] = useState<'category' | 'questions' | 'result'>('category');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomOption | null>(null);
  const [redFlagsChecked, setRedFlagsChecked] = useState<string[]>([]);
  const t = getT(language);

  const symptoms: SymptomOption[] = [
    {
      id: 'chest_pain',
      nameEn: 'Chest Pain / Breathlessness',
      nameHi: 'सीने में दर्द / सांस लेने में तकलीफ',
      category: 'cardiac',
      icon: Heart,
      isEmergencyDefault: true,
    },
    {
      id: 'fever_chills',
      nameEn: 'High Fever & Shivering (Dengue/Malaria)',
      nameHi: 'तेज बुखार और कंपकंपी (डेंगू/मलेरिया)',
      category: 'infection',
      icon: Flame,
    },
    {
      id: 'snake_bite',
      nameEn: 'Snakebite or Scorpion Sting',
      nameHi: 'सांप या बिच्छू का काटना',
      category: 'toxic',
      icon: Bug,
      isEmergencyDefault: true,
    },
    {
      id: 'trauma_injury',
      nameEn: 'Head Injury / Heavy Bleeding',
      nameHi: 'सिर में चोट / गहरा घाव / खून बहना',
      category: 'trauma',
      icon: ShieldAlert,
      isEmergencyDefault: true,
    },
    {
      id: 'stomach_vomit',
      nameEn: 'Severe Vomiting & Dehydration',
      nameHi: 'लगातार उल्टी / दस्त / निर्जलीकरण',
      category: 'gi',
      icon: Activity,
    },
    {
      id: 'pregnancy_labor',
      nameEn: 'Pregnancy Labor Pains / Complication',
      nameHi: 'गर्भावस्था प्रसव पीड़ा / जटिलता',
      category: 'maternal',
      icon: Baby,
    },
  ];

  const getRedFlags = (symId: string) => {
    switch (symId) {
      case 'chest_pain':
        return [
          { id: 'rf1', en: 'Pain radiating to left arm, neck, or jaw', hi: 'दर्द बाएं हाथ, गर्दन या जबड़े में फैल रहा है' },
          { id: 'rf2', en: 'Cold sweating, nausea, or dizziness', hi: 'ठंडा पसीना आना, चक्कर या घबराहट' },
          { id: 'rf3', en: 'Difficulty speaking or blue lips/nails', hi: 'बोलने में परेशानी या होंठ नीले पड़ना' },
        ];
      case 'snake_bite':
        return [
          { id: 'rf1', en: 'Fang marks visible with rapid swelling', hi: 'दांत के दो निशान और तेजी से सूजन' },
          { id: 'rf2', en: 'Drooping eyelids, slurred speech, or drowsiness', hi: 'पलकें गिरना, आवाज लड़खड़ाना, बेहोशी' },
          { id: 'rf3', en: 'Bleeding from gums or bite site', hi: 'मसूड़ों या घाव से खून आना' },
        ];
      case 'fever_chills':
        return [
          { id: 'rf1', en: 'Fever above 103°F with extreme weakness', hi: '103°F से अधिक तेज बुखार और अत्यधिक कमजोरी' },
          { id: 'rf2', en: 'Red rashes or bleeding spots on skin', hi: 'त्वचा पर लाल चकत्ते या दाने' },
          { id: 'rf3', en: 'Confusion or patient unable to stay awake', hi: 'मरीज का होश खोना या न पहचानना' },
        ];
      default:
        return [
          { id: 'rf1', en: 'Patient is losing consciousness or fainting', hi: 'मरीज बेहोश हो रहा है या चक्कर खाकर गिरना' },
          { id: 'rf2', en: 'Severe uncontrolled pain (>8/10)', hi: 'असहनीय असहज दर्द' },
          { id: 'rf3', en: 'Persistent vomiting for >12 hours', hi: '12 घंटे से लगातार उल्टी' },
        ];
    }
  };

  const handleSelectSymptom = (sym: SymptomOption) => {
    setSelectedSymptom(sym);
    setRedFlagsChecked([]);
    setStep('questions');
  };

  const isEmergency =
    selectedSymptom?.isEmergencyDefault || redFlagsChecked.length >= 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f1e1b] border border-[#2fa491]/40 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto hide-scroll">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#eaf7f2]/10">
          <div className="flex items-center gap-2 text-[#6cd9c4]">
            <Stethoscope className="w-5 h-5" />
            <h3 className="font-serif-heading text-lg font-bold text-[#EAF7F2]">
              {t.selfTriageTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf7f2]/[0.08] flex items-center justify-center text-[#93B7AE] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 'category' && (
          <div className="space-y-3">
            <p className="text-xs text-[#93B7AE]">
              {language === 'hi'
                ? 'मरीज की मुख्य परेशानी या लक्षण चुनें:'
                : 'What primary symptom or health emergency is being experienced?'}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {symptoms.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSymptom(s)}
                    className="w-full bg-[#13221f] hover:bg-[#2fa491]/15 border border-[#eaf7f2]/10 hover:border-[#6cd9c4]/50 rounded-xl p-3 flex items-center gap-3 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2fa491]/20 group-hover:bg-[#6cd9c4] text-[#6cd9c4] group-hover:text-[#00382f] flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#EAF7F2] group-hover:text-[#6cd9c4]">
                        {language === 'hi' ? s.nameHi : s.nameEn}
                      </h4>
                      <p className="text-[10px] text-[#93B7AE]">
                        {s.isEmergencyDefault ? '⚠️ High Priority' : 'Routine / Urgent Care'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: QUESTIONS & RED FLAGS */}
        {step === 'questions' && selectedSymptom && (
          <div className="space-y-4">
            <div className="bg-[#13221f] p-3 rounded-xl border border-[#6cd9c4]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <selectedSymptom.icon className="w-5 h-5 text-[#6cd9c4]" />
                <span className="font-bold text-xs text-[#EAF7F2]">
                  {language === 'hi' ? selectedSymptom.nameHi : selectedSymptom.nameEn}
                </span>
              </div>
              <button
                onClick={() => setStep('category')}
                className="text-[11px] text-[#6cd9c4] hover:underline cursor-pointer"
              >
                {language === 'hi' ? 'बदलें' : 'Change'}
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#ffb961]">
                {language === 'hi'
                  ? 'क्या मरीज में इनमें से कोई गंभीर चेतावनी संकेत (खतरे के लक्षण) हैं?'
                  : 'Does the patient have any of these critical warning signs?'}
              </p>

              {getRedFlags(selectedSymptom.id).map((rf) => {
                const isChecked = redFlagsChecked.includes(rf.id);
                return (
                  <label
                    key={rf.id}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#FF6E56]/15 border-[#FF6E56] text-[#EAF7F2]'
                        : 'bg-[#13221f] border-[#eaf7f2]/10 text-[#bcc9c5]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (isChecked) {
                          setRedFlagsChecked(redFlagsChecked.filter((id) => id !== rf.id));
                        } else {
                          setRedFlagsChecked([...redFlagsChecked, rf.id]);
                        }
                      }}
                      className="mt-0.5 rounded text-[#FF6E56] focus:ring-[#FF6E56]"
                    />
                    <span className="text-xs font-medium leading-tight">
                      {language === 'hi' ? rf.hi : rf.en}
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              onClick={() => setStep('result')}
              className="w-full bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold py-3 rounded-xl text-xs transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {language === 'hi' ? 'ट्रायज परिणाम देखें' : 'Calculate Urgency & Recommendations'}
            </button>
          </div>
        )}

        {/* STEP 3: RESULT & IMMEDIATE ACTION */}
        {step === 'result' && (
          <div className="space-y-4">
            {isEmergency ? (
              <div className="bg-[#FF6E56]/15 border-2 border-[#FF6E56] p-4 rounded-2xl space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6E56] text-[#050F0D] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,110,86,0.6)]">
                  <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-serif-heading text-lg font-bold text-[#FF6E56]">
                    {language === 'hi' ? '🚨 आपातकालीन स्थिति (लाल श्रेणी)' : '🚨 EMERGENCY ALERT (RED)'}
                  </h4>
                  <p className="text-xs text-[#d4e6e1] mt-1">
                    {language === 'hi'
                      ? 'लक्षण गंभीर हैं। बिना देरी किए 108 एम्बुलेंस बुलाएं या तुरंत निकटतम सीएचसी अस्पताल ले जाएं।'
                      : 'High-risk clinical indicators detected. Immediate 108 ambulance dispatch and hospital emergency transfer recommended.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerSos();
                    }}
                    className="w-full bg-[#FF6E56] hover:bg-[#ff573d] text-[#050F0D] font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,110,86,0.4)] text-xs cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.dispatch108BigBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onStartDoctorCall();
                    }}
                    className="w-full bg-[#eaf7f2]/10 hover:bg-[#eaf7f2]/20 text-[#EAF7F2] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-[#6cd9c4]" />
                    <span>{t.consultNow}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#4ADE94]/10 border-2 border-[#4ADE94]/40 p-4 rounded-2xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#4ADE94]/20 text-[#4ADE94] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h4 className="font-serif-heading text-base font-bold text-[#4ADE94]">
                    {language === 'hi' ? 'मध्यम / गैर-आपातकालीन (पीली श्रेणी)' : 'URGENT / ROUTINE CARE (YELLOW)'}
                  </h4>
                  <p className="text-xs text-[#d4e6e1] mt-1">
                    {language === 'hi'
                      ? 'गंभीर आपातकालीन खतरे के संकेत नहीं हैं। ई-संजीवनी डॉक्टर से मुफ्त परामर्श लें या दवाइयां जांचें।'
                      : 'No immediate red flags. We recommend a free e-Sanjeevani doctor video consultation for official prescription.'}
                  </p>
                </div>

                <div className="bg-[#13221f] p-3 rounded-xl border border-[#eaf7f2]/10 text-xs space-y-1.5 text-[#bcc9c5]">
                  <p>• <strong>{language === 'hi' ? 'घरेलू देखभाल:' : 'Home Care:'}</strong> भरपूर पानी और ओआरएस घोल पिएं।</p>
                  <p>• <strong>{language === 'hi' ? 'दवा:' : 'OTC Guidance:'}</strong> आवश्यकतानुसार पैरासिटामोल 500mg ले सकते हैं।</p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onStartDoctorCall();
                  }}
                  className="w-full bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>{t.consultNow}</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setStep('category')}
              className="w-full text-center text-xs text-[#93B7AE] hover:underline cursor-pointer"
            >
              {language === 'hi' ? 'फिर से जांच करें' : 'Check another symptom'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
