import React, { useState, useEffect } from 'react';
// We use the browser-ready version of Supabase for the AI Studio preview
import { createClient } from '@supabase/supabase-js';import {
  ScreenTab, UserProfile, AmbulanceDispatch, Medicine, Doctor, FirstAidGuide, LanguageCode, ThemeMode,
} from './types';
import {
  currentUser as initialUser, familyMembers, initialAmbulanceDispatch, hospitalFacilities, doctorsList, firstAidGuides, userPrescriptions
} from './data/mockData';
import { getT } from './data/translations';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { MedsScreen } from './components/screens/MedsScreen';
import { DoctorsScreen } from './components/screens/DoctorsScreen';
import { HospitalsScreen } from './components/screens/HospitalsScreen';
import { SosScreen } from './components/screens/SosScreen';
import { CallDriverModal } from './components/CallDriverModal';
import { LandmarkModal } from './components/LandmarkModal';
import { AshaWorkerModal } from './components/AshaWorkerModal';
import { SelfTriageModal } from './components/SelfTriageModal';
import { ScanRxModal } from './components/ScanRxModal';
import { TeleconsultModal } from './components/TeleconsultModal';
import { LanguageModal } from './components/LanguageModal';
import { ShieldAlert, CheckCircle, X } from 'lucide-react';

// --- CONNECTION ---
const supabaseUrl = 'https://alevajxfkvnhuicfmpgr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZXZhanhma3ZuaHVpY2ZtcGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTUxOTAsImV4cCI6MjEwMzMzMTE5MH0.nls7NGKh6NerDWym47ucxyLj7sCaAHxve_bNqr_ACP0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUser);
  const [medicines, setMedicines] = useState<Medicine[]>([]); 
  const [activeDispatch, setActiveDispatch] = useState<AmbulanceDispatch | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [theme, setTheme] = useState<ThemeMode>('night');

  const t = getT(language);

  useEffect(() => {
    async function loadData() {
      console.log("SETU BACKEND: Connecting...");
      const { data: userData } = await supabase.from('profiles').select('*').eq('name', 'Rajesh Kumar').single();
      
      if (userData) {
        console.log("SETU BACKEND: Connected! Found:", userData.name);
        setCurrentUser({ ...initialUser, id: userData.id, name: userData.name, bloodGroup: userData.blood_group });

        const { data: medData } = await supabase.from('medicines').select('*').eq('user_id', userData.id);
        if (medData) {
          setMedicines(medData.map(m => ({
            id: m.id, name: m.name, genericName: m.generic_name, dosage: m.dosage, instruction: m.instruction,
            timing: ['morning', 'night'], takenToday: { morning: m.morning_taken, night: m.night_taken },
            marketPrice: Number(m.market_price), janAushadhiPrice: Number(m.jan_aushadhi_price),
            purpose: "Health", prescribedBy: "Doctor", remainingPills: 10, totalPills: 30, inStockAtVillagePharmacy: true
          })) as Medicine[]);
        }
      }
    }
    loadData();
  }, []);

  const handleToggleTaken = async (medId: string, slot: 'morning' | 'afternoon' | 'evening' | 'night') => {
    const updatedMeds = medicines.map(m => m.id === medId ? { ...m, takenToday: { ...m.takenToday, [slot]: !m.takenToday[slot] } } : m);
    setMedicines(updatedMeds);
    const med = updatedMeds.find(m => m.id === medId);
    if (med) {
      const col = slot === 'morning' ? 'morning_taken' : 'night_taken';
      await supabase.from('medicines').update({ [col]: med.takenToday[slot] }).eq('id', medId);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050F0D] text-[#d4e6e1] flex flex-col md:items-center overflow-x-hidden">
      <main className="w-full max-w-[480px] min-h-screen relative flex flex-col pb-24 bg-[#050F0D]/60 border-x border-[#eaf7f2]/5 shadow-2xl">
        <Header currentUser={currentUser} allProfiles={familyMembers} onSelectProfile={p => setCurrentUser(p)} onOpenAsha={() => {}} language={language} onOpenLanguageModal={() => {}} theme={theme} onToggleTheme={() => {}} />
        <div className="flex-1 w-full px-4 pt-3 overflow-y-auto">
          {activeTab === 'home' && <HomeScreen currentUser={currentUser} activeDispatch={activeDispatch} facilities={hospitalFacilities} firstAidGuides={firstAidGuides} onTriggerSos={() => {}} onOpenSelfTriage={() => {}} onOpenScanRx={() => {}} onCallDriver={() => {}} onShareLandmark={() => {}} onCancelDispatch={() => {}} onSelectFacility={() => {}} onNavigateToHospitals={() => setActiveTab('hospitals')} onSelectFirstAid={() => {}} language={language} />}
          {activeTab === 'meds' && <MedsScreen medicines={medicines} prescriptions={userPrescriptions} onToggleTaken={handleToggleTaken} onOpenScanRx={() => {}} language={language} />}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={t => setActiveTab(t)} language={language} />
      </main>
    </div>
  );
}