import React, { useState } from 'react';
import { HospitalFacility, LanguageCode } from '../../types';
import { getT } from '../../data/translations';
import {
  Phone,
  CheckCircle,
  Activity,
  Search,
  Droplet,
  Truck,
} from 'lucide-react';

interface HospitalsScreenProps {
  facilities: HospitalFacility[];
  onDispatchAmbulanceTo: (facility: HospitalFacility) => void;
  language: LanguageCode;
}

export const HospitalsScreen: React.FC<HospitalsScreenProps> = ({
  facilities,
  onDispatchAmbulanceTo,
  language,
}) => {
  const [filterIcuOnly, setFilterIcuOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = getT(language);

  const filteredFacilities = facilities.filter((fac) => {
    const matchesIcu = !filterIcuOnly || fac.icuBedsAvailable > 0;
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.villageTown.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIcu && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="pt-1">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif-heading text-[20px] font-bold text-[#EAF7F2]">
              {t.hospitalsAndBeds}
            </h2>
            <p className="text-xs text-[#93B7AE]">
              {t.hospitalsSubLong}
            </p>
          </div>
          <span className="text-[10px] font-bold bg-[#6cd9c4]/20 text-[#6cd9c4] px-2.5 py-1 rounded-full border border-[#6cd9c4]/30">
            Live Feed
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchHospitals}
            className="w-full bg-[#13221f] border border-[#eaf7f2]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#EAF7F2] placeholder-[#93B7AE]/50 focus:outline-none focus:border-[#6cd9c4] pl-9"
          />
          <Search className="w-4 h-4 text-[#93B7AE] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterIcuOnly(!filterIcuOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterIcuOnly
                ? 'bg-[#4ADE94] text-[#00382f] font-bold shadow-sm'
                : 'bg-[#13221f] text-[#93B7AE] border border-[#eaf7f2]/10 hover:border-[#4ADE94]/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.icuAvailableOnly}</span>
          </button>
        </div>
      </div>

      {/* Facilities Cards */}
      <div className="space-y-3">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-[#13221f] rounded-2xl border border-[#eaf7f2]/10 p-4 space-y-3 hover:border-[#6cd9c4]/40 transition-all shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-heading text-sm font-bold text-[#EAF7F2] truncate">
                    {fac.name}
                  </h3>
                </div>
                <p className="text-[11px] text-[#6cd9c4] font-medium">{fac.type}</p>
                <p className="text-[10px] text-[#93B7AE] mt-0.5">{fac.address}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#ffb961] block">{fac.distanceKm} {t.kmAway}</span>
                <span className="text-[10px] text-[#93B7AE]">{fac.villageTown}</span>
              </div>
            </div>

            {/* Bed Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#0f1e1b] p-2 rounded-xl border border-[#eaf7f2]/10">
                <span className="text-[10px] text-[#93B7AE] block">{t.icuBeds}</span>
                <strong className={`text-sm ${fac.icuBedsAvailable > 0 ? 'text-[#4ADE94]' : 'text-[#FF6E56]'}`}>
                  {fac.icuBedsAvailable} / {fac.icuBedsTotal}
                </strong>
              </div>

              <div className="bg-[#0f1e1b] p-2 rounded-xl border border-[#eaf7f2]/10">
                <span className="text-[10px] text-[#93B7AE] block">{t.generalBeds}</span>
                <strong className="text-sm text-[#6cd9c4]">{fac.generalBedsAvailable} {t.vacant}</strong>
              </div>

              <div className="bg-[#0f1e1b] p-2 rounded-xl border border-[#eaf7f2]/10">
                <span className="text-[10px] text-[#93B7AE] block">{t.oxygen}</span>
                <strong className="text-xs text-[#4ADE94] flex items-center justify-center gap-1 mt-0.5">
                  <CheckCircle className="w-3 h-3" /> {t.available}
                </strong>
              </div>
            </div>

            {/* Blood Bank stock badges if any */}
            {fac.bloodBankStock.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto hide-scroll text-[10px]">
                <span className="text-[#93B7AE] flex items-center gap-1 shrink-0">
                  <Droplet className="w-3 h-3 text-[#FF6E56]" /> {t.bloodBank}:
                </span>
                {fac.bloodBankStock.map((b) => (
                  <span
                    key={b.group}
                    className="px-1.5 py-0.2 rounded bg-[#FF6E56]/15 text-[#FF6E56] font-bold border border-[#FF6E56]/30 whitespace-nowrap"
                  >
                    {b.group}: {b.units}U
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#eaf7f2]/10">
              <button
                onClick={() => onDispatchAmbulanceTo(fac)}
                className="bg-[#FF6E56] hover:bg-[#ff573d] text-[#050F0D] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{t.dispatchAmbulanceHere}</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = `tel:${fac.phone}`;
                }}
                className="bg-[#eaf7f2]/[0.08] hover:bg-[#eaf7f2]/[0.15] border border-[#eaf7f2]/20 text-[#EAF7F2] font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#4ADE94]" />
                <span>{t.callHospitalDesk}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
