export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'state' | 'district' | 'ward' | 'surveyor';
  location: {
    state?: string;
    district?: string;
    ward?: string;
    village?: string;
  };
  isActive: boolean;
  createdAt: string;
  lastActive?: string;
}

export interface Survey {
  id: string;
  name: string;
  description: string;
  odkFormId: string;
  targetCaste: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  assignedLocations: string[];
  assignedSurveyors: string[];
  startDate: string;
  endDate: string;
  totalTargets: number;
  completedSubmissions: number;
  createdBy: string;
  createdAt: string;
  formFields: FormField[];
}

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'dropdown' | 'radio' | 'date' | 'location' | 'file' | 'repeatable';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  children?: FormField[];
}

export interface HouseholdSubmission {
  id: string;
  surveyId: string;
  surveyorId: string;
  householdId: string;
  status: 'draft' | 'submitted';
  location: {
    state: string;
    district: string;
    ward: string;
    village: string;
    gpsCoordinates: {
      latitude: number;
      longitude: number;
      accuracy?: number;
    };
    address: string;
  };
  householdDetails: {
    housePhoto?: string;
  };
  headOfFamily: {
    fullName: string;
    fatherHusbandName: string;
    gender: 'male' | 'female' | 'other';
    age: number;
    mobileNumber: string;
    aadhaarNumber?: string;
    caste: string;
  };
  familyMembers: FamilyMember[];
  socioEconomic: {
    monthlyIncome: number;
    incomeSource: string;
    landOwnership: boolean;
    landDetails?: string;
    governmentBeneficiary: boolean;
    beneficiaryDetails?: string;
  };
  metadata: {
    surveyorName: string;
    submissionDate: string;
    submissionTime: string;
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  educationLevel: string;
  occupation: string;
  maritalStatus: string;
}

export interface Submission {
  id: string;
  surveyId: string;
  surveyorId: string;
  odpFormSubmissionId: string;
  timestamp: string;
  geoLocation: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  location: {
    state: string;
    district: string;
    ward: string;
    village: string;
  };
  data: Record<string, any>;
  isFlagged: boolean;
  flaggedReasons?: string[];
  reviewStatus: 'pending' | 'approved' | 'rejected';
}

export interface MonitoringAlert {
  id: string;
  type: 'bulk_submission' | 'location_mismatch' | 'suspicious_timing' | 'duplicate_data';
  severity: 'low' | 'medium' | 'high';
  surveyorId: string;
  surveyorName: string;
  description: string;
  timestamp: string;
  isResolved: boolean;
  details: Record<string, any>;
}

export interface LocationStats {
  id: string;
  name: string;
  type: 'state' | 'district' | 'ward' | 'village';
  parent?: string;
  totalTargets: number;
  completedSurveys: number;
  activeSurveyors: number;
  completionRate: number;
  children?: LocationStats[];
}

export interface CasteStats {
  caste: string;
  totalSurveys: number;
  completedSurveys: number;
  pendingSurveys: number;
  completionRate: number;
  byDistrict: Record<string, number>;
}