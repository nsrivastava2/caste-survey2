import React, { createContext, useContext, useState } from 'react';
import { Survey, Submission, MonitoringAlert, LocationStats, CasteStats, FormField } from '../types';

interface DataContextType {
  surveys: Survey[];
  submissions: Submission[];
  alerts: MonitoringAlert[];
  locationStats: LocationStats[];
  casteStats: CasteStats[];
  addSurvey: (survey: Omit<Survey, 'id' | 'createdAt'>) => void;
  updateSurvey: (id: string, updates: Partial<Survey>) => void;
  addSubmission: (submission: Omit<Submission, 'id' | 'timestamp'>) => void;
  resolveAlert: (alertId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockLocationStats: LocationStats[] = [
  {
    id: 'punjab',
    name: 'Punjab',
    type: 'state',
    totalTargets: 50000,
    completedSurveys: 12500,
    activeSurveyors: 30000,
    completionRate: 25,
    children: [
      {
        id: 'amritsar',
        name: 'Amritsar',
        type: 'district',
        parent: 'punjab',
        totalTargets: 8000,
        completedSurveys: 2400,
        activeSurveyors: 5000,
        completionRate: 30,
      },
      {
        id: 'ludhiana',
        name: 'Ludhiana',
        type: 'district',
        parent: 'punjab',
        totalTargets: 12000,
        completedSurveys: 2400,
        activeSurveyors: 7500,
        completionRate: 20,
      },
      {
        id: 'jalandhar',
        name: 'Jalandhar',
        type: 'district',
        parent: 'punjab',
        totalTargets: 9000,
        completedSurveys: 2700,
        activeSurveyors: 6000,
        completionRate: 30,
      }
    ]
  }
];

const mockCasteStats: CasteStats[] = [
  {
    caste: 'Scheduled Caste',
    totalSurveys: 15000,
    completedSurveys: 4500,
    pendingSurveys: 10500,
    completionRate: 30,
    byDistrict: { 'Amritsar': 1200, 'Ludhiana': 1800, 'Jalandhar': 1500 }
  },
  {
    caste: 'Scheduled Tribe',
    totalSurveys: 8000,
    completedSurveys: 2000,
    pendingSurveys: 6000,
    completionRate: 25,
    byDistrict: { 'Amritsar': 600, 'Ludhiana': 800, 'Jalandhar': 600 }
  },
  {
    caste: 'Other Backward Classes',
    totalSurveys: 20000,
    completedSurveys: 5000,
    pendingSurveys: 15000,
    completionRate: 25,
    byDistrict: { 'Amritsar': 1500, 'Ludhiana': 2000, 'Jalandhar': 1500 }
  },
  {
    caste: 'General',
    totalSurveys: 7000,
    completedSurveys: 1000,
    pendingSurveys: 6000,
    completionRate: 14,
    byDistrict: { 'Amritsar': 300, 'Ludhiana': 400, 'Jalandhar': 300 }
  }
];

const mockSurveys: Survey[] = [
  {
    id: '1',
    name: 'Punjab Caste Census 2025',
    description: 'Comprehensive caste-wise demographic survey across Punjab state',
    odkFormId: 'punjab_caste_form_v1',
    targetCaste: 'All Categories',
    status: 'active',
    assignedLocations: ['punjab'],
    assignedSurveyors: ['5'],
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    totalTargets: 50000,
    completedSubmissions: 12500,
    createdBy: '1',
    createdAt: '2024-11-15',
    formFields: []
  },
  {
    id: '2',
    name: 'SC/ST Focused Survey - Amritsar',
    description: 'Detailed survey focusing on SC/ST population in Amritsar district',
    odkFormId: 'amritsar_scst_form_v1',
    targetCaste: 'SC/ST',
    status: 'active',
    assignedLocations: ['amritsar'],
    assignedSurveyors: ['5'],
    startDate: '2024-12-15',
    endDate: '2025-02-15',
    totalTargets: 3000,
    completedSubmissions: 750,
    createdBy: '3',
    createdAt: '2024-12-01',
    formFields: []
  }
];

const mockAlerts: MonitoringAlert[] = [
  {
    id: '1',
    type: 'bulk_submission',
    severity: 'high',
    surveyorId: '5',
    surveyorName: 'Field Surveyor',
    description: 'Submitted 50+ forms in 2 hours - unusual activity detected',
    timestamp: '2024-12-19T14:30:00Z',
    isResolved: false,
    details: { submissionCount: 52, timeWindow: '2 hours', averageTime: '2.3 minutes' }
  },
  {
    id: '2',
    type: 'location_mismatch',
    severity: 'medium',
    surveyorId: '6',
    surveyorName: 'Another Surveyor',
    description: 'GPS location does not match assigned ward',
    timestamp: '2024-12-19T12:15:00Z',
    isResolved: false,
    details: { assignedWard: 'Ward 1', detectedLocation: 'Ward 5', distance: '15.2 km' }
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>(mockAlerts);
  const [locationStats] = useState<LocationStats[]>(mockLocationStats);
  const [casteStats] = useState<CasteStats[]>(mockCasteStats);

  const addSurvey = (surveyData: Omit<Survey, 'id' | 'createdAt'>) => {
    const newSurvey: Survey = {
      ...surveyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSurveys(prev => [...prev, newSurvey]);
  };

  const updateSurvey = (id: string, updates: Partial<Survey>) => {
    setSurveys(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addSubmission = (submissionData: Omit<Submission, 'id' | 'timestamp'>) => {
    const newSubmission: Submission = {
      ...submissionData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setSubmissions(prev => [...prev, newSubmission]);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isResolved: true } : a));
  };

  return (
    <DataContext.Provider value={{
      surveys,
      submissions,
      alerts,
      locationStats,
      casteStats,
      addSurvey,
      updateSurvey,
      addSubmission,
      resolveAlert
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}