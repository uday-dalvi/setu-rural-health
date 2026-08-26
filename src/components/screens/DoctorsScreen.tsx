import React, { useState } from 'react';
import { Doctor, UserProfile, LanguageCode } from '../../types';
import { getT } from '../../data/translations';
import {
  Video,
  Phone,
  Star,
  Search,
} from 'lucide-react';

interface DoctorsScreenProps {
  doctors: Doctor[];
  currentUser: UserProfile;
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenAsha: () => void;
  language: LanguageCode;
}

export const DoctorsScreen: React.FC<DoctorsScreenProps> = ({
  doctors,
  currentUser,
  onSelectDoctor,
  onOpenAsha,
  language,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const t = getT(language);

  const specialties = ['All', 'General', 'Cardiology', 'Pediatrics', 'OB-GYN'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      (selectedSpecialty === 'General' && doc.specialty.includes('General')) ||
      (selectedSpecialty === 'Cardiology' && doc.specialty.includes('Cardiologist')) ||
      (selectedSpecialty === 'Pediatrics' && doc.specialty.includes('Pediatrician')) ||
      (selectedSpecialty === 'OB-GYN' && doc.specialty.includes('Gynecologist'));

    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.facility.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Header Banner */}
      <div className="pt-1">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif-heading text-[20px] font-bold text-[#EAF7F2]">
              {t.teleconsultTitle}
            </h2>
            <p className="text-xs text-[#93B7AE]">
              {t.teleconsultSub}
            </p>
          </div>
          <span className="text-[10px] font-bold bg-[#4ADE94]/20 text-[#4ADE94] px-2 py-1 rounded-full border border-[#4ADE94]/30">
            Govt. Certified
          </span>
        </div>
      </div>

      {/* ASHA Worker Featured Card */}
      <div className="bg-gradient-to-r from-[#1d2d2a] to-[#13221f] rounded-2xl border border-[#6cd9c4]/30 p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#2fa491]/25 border border-[#6cd9c4] flex items-center justify-center text-[#6cd9c4] font-bold text-sm shrink-0">
            MD
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-xs text-[#EAF7F2]">{currentUser.ashaWorker.name}</h4>
              <span className="w-2 h-2 rounded-full bg-[#4ADE94] animate-pulse"></span>
            </div>
            <p className="text-[11px] text-[#6cd9c4]">{t.ashaWorkerBadge} • {currentUser.ashaWorker.ward}</p>
          </div>
        </div>

        <button
          onClick={onOpenAsha}
          className="bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{t.call}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchDoctors}
          className="w-full bg-[#13221f] border border-[#eaf7f2]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#EAF7F2] placeholder-[#93B7AE]/50 focus:outline-none focus:border-[#6cd9c4] pl-9"
        />
        <Search className="w-4 h-4 text-[#93B7AE] absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex gap-2 overflow-x-auto hide-scroll pb-1">
        {specialties.map((spec) => {
          const isSelected = selectedSpecialty === spec;
          return (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2fa491] text-[#00332b] font-bold shadow-sm'
                  : 'bg-[#13221f] text-[#93B7AE] border border-[#eaf7f2]/10 hover:border-[#6cd9c4]/40'
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Doctors List */}
      <div className="space-y-3">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#13221f] rounded-2xl border border-[#eaf7f2]/10 p-4 space-y-3 hover:border-[#6cd9c4]/30 transition-all shadow-sm"
          >
            <div className="flex gap-3 items-start">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-14 h-14 rounded-2xl object-cover border border-[#6cd9c4]/30 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-[#EAF7F2] truncate">{doc.name}</h4>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#ffb961]">
                    <Star className="w-3.5 h-3.5 fill-[#ffb961]" />
                    {doc.rating}
                  </span>
                </div>

                <p className="text-[11px] text-[#6cd9c4] font-medium mt-0.5">{doc.specialty}</p>
                <p className="text-[10px] text-[#93B7AE]">{doc.facility}</p>

                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#bcc9c5]">
                  <span className="bg-[#1d2d2a] px-2 py-0.5 rounded">
                    {doc.experienceYears} yrs exp
                  </span>
                  <span>• {doc.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Bottom action row */}
            <div className="flex justify-between items-center pt-2 border-t border-[#eaf7f2]/10">
              <div>
                <span className="text-[10px] text-[#93B7AE] block">Consultation:</span>
                <span className="text-xs font-bold text-[#4ADE94]">
                  {doc.consultationFee === 0 ? t.freeGovtConsult : `₹${doc.consultationFee}`}
                </span>
              </div>

              <button
                onClick={() => onSelectDoctor(doc)}
                className="bg-[#2fa491] hover:bg-[#258a7a] text-[#00332b] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{t.consultNow}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
