export type ScreenTab = 'home' | 'meds' | 'doctors' | 'hospitals' | 'sos';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'bn'
  | 'te'
  | 'mr'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur';

export type ThemeMode = 'night' | 'dark' | 'light';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
  flagOrScript: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  village: string;
  district: string;
  state: string;
  bloodGroup: string;
  abhaId: string;
  avatar: string;
  phone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  ashaWorker: {
    name: string;
    ward: string;
    phone: string;
  };
  chronicConditions: string[];
}

export interface AmbulanceDispatch {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  type: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | '108 Govt Emergency';
  etaMinutes: number;
  distanceKm: number;
  status: 'dispatched' | 'en_route' | 'arriving' | 'arrived' | 'completed';
  currentLocation: {
    lat: number;
    lng: number;
    landmark: string;
  };
  destinationFacility: string;
  dispatchedAt: string;
  progressPercent: number;
}

export interface HospitalFacility {
  id: string;
  name: string;
  type: 'CHC (Community Health Centre)' | 'PHC (Primary Health Centre)' | 'District Hospital' | 'Sub-District Hospital' | 'Private Multi-Specialty';
  distanceKm: number;
  address: string;
  villageTown: string;
  icuBedsAvailable: number;
  icuBedsTotal: number;
  generalBedsAvailable: number;
  oxygenAvailable: boolean;
  emergencyDoctorOnDuty: boolean;
  bloodBankStock: {
    group: string;
    units: number;
  }[];
  phone: string;
  ambulanceAvailable: boolean;
  ayushmanBharatAccepted: boolean;
  rating: number;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  timing: ('morning' | 'afternoon' | 'evening' | 'night')[];
  instruction: 'Before Food' | 'After Food' | 'With Water';
  purpose: string;
  prescribedBy: string;
  remainingPills: number;
  totalPills: number;
  takenToday: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
    night?: boolean;
  };
  marketPrice: number;
  janAushadhiPrice: number;
  inStockAtVillagePharmacy: boolean;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  facility: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    genericAlternative: string;
  }[];
  adviceNotes: string;
  scannedImageUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  languages: string[];
  facility: string;
  availableNow: boolean;
  nextSlot: string;
  rating: number;
  consultationFee: number; // 0 for government e-Sanjeevani
  avatar: string;
  isGovtTelehealth: boolean;
}

export interface TriageSymptomCategory {
  id: string;
  title: string;
  hindiTitle: string;
  iconName: string;
  severity: 'emergency' | 'urgent' | 'routine';
  commonSymptoms: string[];
}

export interface FirstAidGuide {
  id: string;
  title: string;
  hindiTitle: string;
  icon: string;
  category: 'Critical' | 'Injury' | 'Bites' | 'Environmental';
  steps: string[];
  warning: string;
}
