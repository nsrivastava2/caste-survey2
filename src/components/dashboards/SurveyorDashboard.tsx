import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Plus,
  Download,
  Upload,
  Wifi,
  WifiOff,
  RefreshCw,
  Camera,
  Save,
  Send,
  Eye,
  Edit,
  User,
  ChevronLeft,
  ChevronRight,
  Home,
  TrendingUp,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import HouseholdSurveyForm from '../surveys/HouseholdSurveyForm';
import { HouseholdSubmission } from '../../types';

export default function SurveyorDashboard() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(3);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'forms' | 'new-form'>('overview');
  const [selectedForm, setSelectedForm] = useState<HouseholdSubmission | null>(null);
  const [editingForm, setEditingForm] = useState<HouseholdSubmission | null>(null);
  
  // Mock forms data for My Forms list
  const myFormsList = [
    {
      id: 'HH-001',
      headOfFamily: { fullName: 'Rajesh Kumar Singh', caste: 'Scheduled Caste' },
      familyMembers: [{ id: '1' }, { id: '2' }], // 3 total including head
      location: { village: 'Village A' },
      status: 'submitted' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '10:30 AM' }
    },
    {
      id: 'HH-002',
      headOfFamily: { fullName: 'Priya Sharma', caste: 'Other Backward Classes' },
      familyMembers: [{ id: '1' }], // 2 total including head
      location: { village: 'Village A' },
      status: 'submitted' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '11:15 AM' }
    },
    {
      id: 'HH-003',
      headOfFamily: { fullName: 'Amit Singh', caste: 'General' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village A' },
      status: 'draft' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '12:00 PM' }
    },
    {
      id: 'HH-004',
      headOfFamily: { fullName: 'Gurpreet Singh', caste: 'Scheduled Caste' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village A' },
      status: 'draft' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '9:00 AM' }
    },
    {
      id: 'HH-005',
      headOfFamily: { fullName: 'Manpreet Kaur', caste: 'Scheduled Tribe' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village B' },
      status: 'draft' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '10:01 AM' }
    },
    {
      id: 'HH-006',
      headOfFamily: { fullName: 'Jasbir Singh', caste: 'Other Backward Classes' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village C' },
      status: 'draft' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '11:02 AM' }
    },
    {
      id: 'HH-007',
      headOfFamily: { fullName: 'Simran Kaur', caste: 'General' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village D' },
      status: 'submitted' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '12:03 AM' }
    },
    {
      id: 'HH-008',
      headOfFamily: { fullName: 'Harjeet Singh', caste: 'Scheduled Caste' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village E' },
      status: 'submitted' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '13:04 AM' }
    },
    {
      id: 'HH-009',
      headOfFamily: { fullName: 'Kuldeep Kaur', caste: 'Scheduled Tribe' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village A' },
      status: 'draft' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '14:05 AM' }
    },
    {
      id: 'HH-010',
      headOfFamily: { fullName: 'Navdeep Singh', caste: 'Other Backward Classes' },
      familyMembers: [], // 1 total (just head)
      location: { village: 'Village B' },
      status: 'submitted' as const,
      metadata: { submissionDate: '2024-12-19', submissionTime: '15:06 AM' }
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 10;

  const todayStats = {
    completed: 8,
    target: 15,
    timeSpent: '4h 32m',
    avgTime: '12 min'
  };

  const filledForms: HouseholdSubmission[] = [
    {
      id: '1',
      surveyId: '1',
      surveyorId: user?.id || '5',
      householdId: 'HH-001',
      status: 'submitted',
      location: {
        state: 'Punjab',
        district: 'Amritsar',
        ward: 'Ward 1',
        village: 'Village A',
        gpsCoordinates: { latitude: 31.6340, longitude: 74.8723 },
        address: 'House No. 123, Main Street, Village A'
      },
      householdDetails: {},
      headOfFamily: {
        fullName: 'Rajesh Kumar Singh',
        fatherHusbandName: 'Ram Singh',
        gender: 'male',
        age: 45,
        mobileNumber: '+91-9876543210',
        aadhaarNumber: '1234-5678-9012',
        caste: 'Scheduled Caste'
      },
      familyMembers: [
        {
          id: '1',
          name: 'Sunita Devi',
          relationship: 'Spouse',
          gender: 'female',
          age: 40,
          educationLevel: 'Secondary',
          occupation: 'Housewife',
          maritalStatus: 'Married'
        },
        {
          id: '2',
          name: 'Amit Kumar',
          relationship: 'Son',
          gender: 'male',
          age: 18,
          educationLevel: 'Higher Secondary',
          occupation: 'Student',
          maritalStatus: 'Single'
        }
      ],
      socioEconomic: {
        monthlyIncome: 25000,
        incomeSource: 'Agriculture',
        landOwnership: true,
        landDetails: '2 acres agricultural land',
        governmentBeneficiary: true,
        beneficiaryDetails: 'PM-KISAN scheme'
      },
      metadata: {
        surveyorName: user?.name || 'Field Surveyor',
        submissionDate: '2024-12-19',
        submissionTime: '10:30 AM'
      }
    },
    {
      id: '2',
      surveyId: '1',
      surveyorId: user?.id || '5',
      householdId: 'HH-002',
      status: 'submitted',
      location: {
        state: 'Punjab',
        district: 'Amritsar',
        ward: 'Ward 1',
        village: 'Village A',
        gpsCoordinates: { latitude: 31.6350, longitude: 74.8730 },
        address: 'House No. 456, Gandhi Road, Village A'
      },
      householdDetails: {},
      headOfFamily: {
        fullName: 'Priya Sharma',
        fatherHusbandName: 'Mohan Lal',
        gender: 'female',
        age: 35,
        mobileNumber: '+91-9876543211',
        caste: 'Other Backward Classes'
      },
      familyMembers: [
        {
          id: '1',
          name: 'Vikram Sharma',
          relationship: 'Spouse',
          gender: 'male',
          age: 38,
          educationLevel: 'Graduate',
          occupation: 'Private Employee',
          maritalStatus: 'Married'
        }
      ],
      socioEconomic: {
        monthlyIncome: 35000,
        incomeSource: 'Private Job',
        landOwnership: false,
        governmentBeneficiary: false
      },
      metadata: {
        surveyorName: user?.name || 'Field Surveyor',
        submissionDate: '2024-12-19',
        submissionTime: '11:15 AM'
      }
    },
    {
      id: '3',
      surveyId: '1',
      surveyorId: user?.id || '5',
      householdId: 'HH-003',
      status: 'draft',
      location: {
        state: 'Punjab',
        district: 'Amritsar',
        ward: 'Ward 1',
        village: 'Village A',
        gpsCoordinates: { latitude: 31.6360, longitude: 74.8740 },
        address: 'House No. 789, School Street, Village A'
      },
      householdDetails: {},
      headOfFamily: {
        fullName: 'Amit Singh',
        fatherHusbandName: 'Balwinder Singh',
        gender: 'male',
        age: 42,
        mobileNumber: '+91-9876543212',
        caste: 'General'
      },
      familyMembers: [],
      socioEconomic: {
        monthlyIncome: 0,
        incomeSource: '',
        landOwnership: false,
        governmentBeneficiary: false
      },
      metadata: {
        surveyorName: user?.name || 'Field Surveyor',
        submissionDate: '2024-12-19',
        submissionTime: '12:00 PM'
      }
    }
  ];

  // Generate more sample forms for pagination demo
  const generateMoreForms = (): HouseholdSubmission[] => {
    const additionalForms: HouseholdSubmission[] = [];
    const names = [
      'Gurpreet Singh', 'Manpreet Kaur', 'Jasbir Singh', 'Simran Kaur', 'Harjeet Singh',
      'Kuldeep Kaur', 'Navdeep Singh', 'Parminder Kaur', 'Sukhwinder Singh', 'Rajwinder Kaur',
      'Balwinder Singh', 'Amarjeet Kaur', 'Ranjit Singh', 'Paramjit Kaur', 'Davinder Singh',
      'Surinder Kaur', 'Gurbinder Singh', 'Manjinder Kaur', 'Lakhwinder Singh', 'Jaswinder Kaur'
    ];
    const castes = ['Scheduled Caste', 'Scheduled Tribe', 'Other Backward Classes', 'General'];
    const villages = ['Village A', 'Village B', 'Village C', 'Village D', 'Village E'];
    
    for (let i = 0; i < 20; i++) {
      additionalForms.push({
        id: (i + 4).toString(),
        surveyId: '1',
        surveyorId: user?.id || '5',
        householdId: `HH-${String(i + 4).padStart(3, '0')}`,
        status: Math.random() > 0.3 ? 'submitted' : 'draft',
        location: {
          state: 'Punjab',
          district: 'Amritsar',
          ward: 'Ward 1',
          village: villages[i % villages.length],
          gpsCoordinates: { 
            latitude: 31.6340 + (Math.random() - 0.5) * 0.01, 
            longitude: 74.8723 + (Math.random() - 0.5) * 0.01 
          },
          address: `House No. ${100 + i}, Street ${i % 5 + 1}, ${villages[i % villages.length]}`
        },
        householdDetails: {},
        headOfFamily: {
          fullName: names[i % names.length],
          fatherHusbandName: 'Father Name',
          gender: i % 2 === 0 ? 'male' : 'female',
          age: 25 + (i % 40),
          mobileNumber: `+91-987654${String(3210 + i).slice(-4)}`,
          caste: castes[i % castes.length]
        },
        familyMembers: [],
        socioEconomic: {
          monthlyIncome: 15000 + (i * 1000),
          incomeSource: ['Agriculture', 'Business', 'Private Job', 'Daily Wage'][i % 4],
          landOwnership: i % 3 === 0,
          governmentBeneficiary: i % 4 === 0
        },
        metadata: {
          surveyorName: user?.name || 'Field Surveyor',
          submissionDate: '2024-12-19',
          submissionTime: `${9 + (i % 8)}:${String(i % 60).padStart(2, '0')} AM`
        }
      });
    }
    return additionalForms;
  };

  const allForms = [...filledForms, ...generateMoreForms()];
  
  // Pagination logic
  const totalPages = Math.ceil(allForms.length / formsPerPage);
  const startIndex = (currentPage - 1) * formsPerPage;
  const endIndex = startIndex + formsPerPage;
  const currentForms = allForms.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Handle navigation from sidebar
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    if (view === 'new-form') {
      setActiveTab('new-form');
    } else if (view === 'my-forms' || view === 'forms') {
      setActiveTab('forms');
    } else {
      setActiveTab('overview');
    }
  }, []);

  // Update URL when tab changes
  React.useEffect(() => {
    const urlParams = new URLSearchParams();
    if (activeTab === 'new-form') {
      urlParams.set('view', 'new-form');
    } else if (activeTab === 'forms' || activeTab === 'my-forms') {
      urlParams.set('view', 'forms');
    }
    
    const newUrl = urlParams.toString() ? `/?${urlParams.toString()}` : '/';
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [activeTab]);

  const handleNewForm = () => {
    setSelectedSurvey({ id: '1', name: 'Punjab Caste Census 2025' });
    setEditingForm(null);
    setShowSurveyForm(true);
  };

  const handleEditForm = (form: HouseholdSubmission) => {
    setSelectedSurvey({ id: form.surveyId, name: 'Punjab Caste Census 2025' });
    setEditingForm(form);
    setShowSurveyForm(true);
  };

  const handleViewForm = (form: HouseholdSubmission) => {
    setSelectedForm(form);
  };

  const handleSaveForm = (formData: Partial<HouseholdSubmission>) => {
    console.log('Form saved:', formData);
    setPendingSync(prev => prev + 1);
    setShowSurveyForm(false);
    setSelectedSurvey(null);
    setEditingForm(null);
    // In a real app, you would update the forms list here
  };

  const handleCloseForm = () => {
    setShowSurveyForm(false);
    setSelectedSurvey(null);
    setEditingForm(null);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-md mx-auto lg:max-w-7xl">
        {/* Status Bar */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 rounded-2xl shadow-lg border border-blue-300 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isOnline ? (
                <div className="p-3 bg-green-500 rounded-full shadow-lg">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="p-3 bg-red-500 rounded-full shadow-lg">
                  <WifiOff className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900 text-xl">
                  {isOnline ? 'Online' : 'Offline Mode'}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  {pendingSync > 0 ? `${pendingSync} forms pending sync` : 'All synced'}
                </p>
              </div>
            </div>
            {pendingSync > 0 && (
              <button
                onClick={() => setPendingSync(0)}
                className="p-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex bg-gradient-to-r from-gray-50 to-blue-50">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-5 px-6 text-sm font-bold transition-all duration-300 relative transform hover:scale-105 ${
                activeTab === 'overview'
                  ? 'text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg border-b-4 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('new-form')}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === 'new-form'
                  ? 'text-green-600 bg-white shadow-sm border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Form</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('my-forms')}
              className={`flex-1 py-5 px-6 text-sm font-bold transition-all duration-300 relative transform hover:scale-105 ${
                (activeTab === 'forms' || activeTab === 'my-forms')
                  ? 'text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>All Forms</span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {allForms.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Today's Progress */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Today's Progress</h2>
                <div className="text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white">{todayStats.completed}</p>
                  <p className="text-sm font-semibold text-blue-100">Completed</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white">{todayStats.target}</p>
                  <p className="text-sm font-semibold text-purple-100">Target</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white">{todayStats.timeSpent}</p>
                  <p className="text-sm font-semibold text-green-100">Time Spent</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white">{todayStats.avgTime}</p>
                  <p className="text-sm font-semibold text-orange-100">Avg Time</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-700 mb-3">
                  <span className="font-bold">Daily Progress</span>
                  <span className="font-bold text-lg">{Math.round((todayStats.completed / todayStats.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${(todayStats.completed / todayStats.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleNewForm}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center space-y-3"
              >
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                  <Plus className="w-10 h-10" />
                </div>
                <span className="font-bold text-xl">New Form</span>
                <span className="text-green-100 text-sm font-medium">Start new survey</span>
              </button>
              <button className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center space-y-3">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                  <RefreshCw className="w-10 h-10" />
                </div>
                <span className="font-bold text-xl">Sync Forms</span>
                <span className="text-blue-100 text-sm font-medium">Upload pending data</span>
              </button>
            </div>

            {/* Location Info */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border border-purple-200 p-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Assignment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {user?.location?.village}, {user?.location?.ward}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Punjab Caste Census 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Shift: 9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'new-form' && (
          <div className="space-y-6">
            {/* New Form Interface */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl border border-green-200 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Plus className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Start New Survey
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Begin collecting household data for the Punjab Caste Census 2025
              </p>
              <button
                onClick={handleNewForm}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Create New Household Form
              </button>
            </div>

            {/* Quick Stats for New Form Tab */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Target</p>
                    <p className="text-2xl font-bold text-green-600">{todayStats.target}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-blue-600">{todayStats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-orange-600">{todayStats.target - todayStats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div className="space-y-4">
            {/* Forms Summary */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-200 p-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Forms Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">
                    {allForms.filter(f => f.status === 'submitted').length}
                  </p>
                  <p className="text-sm font-semibold text-green-100">Submitted</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">
                    {allForms.filter(f => f.status === 'draft').length}
                  </p>
                  <p className="text-sm font-semibold text-orange-100">Drafts</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">{allForms.length}</p>
                  <p className="text-sm font-semibold text-blue-100">Total</p>
                </div>
              </div>
            </div>

            {/* Forms List */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">All Forms</h3>
                  <div className="mt-2 sm:mt-0 text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
                    Showing {startIndex + 1}-{Math.min(endIndex, allForms.length)} of {allForms.length} forms
                  </div>
                </div>
              </div>
              
              {/* Responsive Forms List */}
              <div className="divide-y divide-gray-200">
                {currentForms.map(form => (
                  <div key={form.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{form.headOfFamily.fullName}</p>
                            <p className="text-sm text-gray-600 font-medium">ID: {form.householdId}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            form.status === 'submitted' 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md' 
                              : 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                          }`}>
                            {form.status === 'submitted' ? 'Submitted' : 'Draft'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Caste:</strong> {form.headOfFamily.caste}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Family:</strong> {form.familyMembers.length + 1} members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Village:</strong> {form.location.village}</span>
                          </div>
                          <div className="sm:col-span-2 lg:col-span-3 flex items-center space-x-2 mt-2 pt-2 border-t border-gray-100">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 text-xs font-medium"><strong>Submitted:</strong> {form.metadata.submissionDate} at {form.metadata.submissionTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end space-x-3 lg:flex-col lg:space-x-0 lg:space-y-3">
                        <button
                          onClick={() => handleViewForm(form)}
                          className="p-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {form.status === 'draft' && (
                          <button
                            onClick={() => handleEditForm(form)}
                            className="p-3 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            title="Edit Draft"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        <div className={`p-3 rounded-full shadow-lg ${
                          form.status === 'submitted' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}>
                          {form.status === 'submitted' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <div className="text-sm font-bold text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`w-10 h-10 text-sm rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
                                currentPage === pageNum
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold'
                                  : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quick Jump */}
                    <div className="flex items-center space-x-2 text-sm font-bold">
                      <span className="text-gray-800">Go to:</span>
                      <select
                        value={currentPage}
                        onChange={(e) => goToPage(Number(e.target.value))}
                        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-lg font-medium"
                      >
                        {Array.from({ length: totalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Page {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-forms' && (
          <div className="space-y-4">
            {/* Forms Summary */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-200 p-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">My Forms Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">
                    {allForms.filter(f => f.status === 'submitted').length}
                  </p>
                  <p className="text-sm font-semibold text-green-100">Submitted</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">
                    {allForms.filter(f => f.status === 'draft').length}
                  </p>
                  <p className="text-sm font-semibold text-orange-100">Drafts</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <p className="text-2xl font-bold text-white">{allForms.length}</p>
                  <p className="text-sm font-semibold text-blue-100">Total</p>
                </div>
              </div>
            </div>

            {/* Forms List */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">My Forms</h3>
                  <div className="mt-2 sm:mt-0 text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
                    Showing {startIndex + 1}-{Math.min(endIndex, allForms.length)} of {allForms.length} forms
                  </div>
                </div>
              </div>
              
              {/* Responsive Forms List */}
              <div className="divide-y divide-gray-200">
                {currentForms.map(form => (
                  <div key={form.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{form.headOfFamily.fullName}</p>
                            <p className="text-sm text-gray-600 font-medium">ID: {form.householdId}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            form.status === 'submitted' 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md' 
                              : 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                          }`}>
                            {form.status === 'submitted' ? 'Submitted' : 'Draft'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Caste:</strong> {form.headOfFamily.caste}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Family:</strong> {form.familyMembers.length + 1} members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-sm"></span>
                            <span className="text-gray-700 font-medium"><strong>Village:</strong> {form.location.village}</span>
                          </div>
                          <div className="sm:col-span-2 lg:col-span-3 flex items-center space-x-2 mt-2 pt-2 border-t border-gray-100">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 text-xs font-medium"><strong>Submitted:</strong> {form.metadata.submissionDate} at {form.metadata.submissionTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end space-x-3 lg:flex-col lg:space-x-0 lg:space-y-3">
                        <button
                          onClick={() => handleViewForm(form)}
                          className="p-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {form.status === 'draft' && (
                          <button
                            onClick={() => handleEditForm(form)}
                            className="p-3 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            title="Edit Draft"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        <div className={`p-3 rounded-full shadow-lg ${
                          form.status === 'submitted' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}>
                          {form.status === 'submitted' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <div className="text-sm font-bold text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`w-10 h-10 text-sm rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
                                currentPage === pageNum
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold'
                                  : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quick Jump */}
                    <div className="flex items-center space-x-2 text-sm font-bold">
                      <span className="text-gray-800">Go to:</span>
                      <select
                        value={currentPage}
                        onChange={(e) => goToPage(Number(e.target.value))}
                        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-lg font-medium"
                      >
                        {Array.from({ length: totalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Page {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Household Survey Form Modal */}
        {showSurveyForm && selectedSurvey && (
          <HouseholdSurveyForm
            survey={selectedSurvey}
            existingData={editingForm}
            onClose={handleCloseForm}
            onSave={handleSaveForm}
          />
        )}

        {/* Form Details Modal */}
        {selectedForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Form Details</h3>
                <button
                  onClick={() => setSelectedForm(null)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-xl transition-colors hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Household ID</label>
                    <p className="text-gray-900 font-semibold bg-gray-50 px-3 py-2 rounded-lg">{selectedForm.householdId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedForm.status === 'submitted' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                    }`}>
                      {selectedForm.status === 'submitted' ? 'Submitted' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Head of Family</label>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-2 border border-blue-200">
                    <p className="font-medium"><strong>Name:</strong> {selectedForm.headOfFamily.fullName}</p>
                    <p className="font-medium"><strong>Father's/Husband's Name:</strong> {selectedForm.headOfFamily.fatherHusbandName}</p>
                    <p className="font-medium"><strong>Age:</strong> {selectedForm.headOfFamily.age}</p>
                    <p className="font-medium"><strong>Gender:</strong> {selectedForm.headOfFamily.gender}</p>
                    <p className="font-medium"><strong>Caste:</strong> {selectedForm.headOfFamily.caste}</p>
                    <p className="font-medium"><strong>Mobile:</strong> {selectedForm.headOfFamily.mobileNumber}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Family Members ({selectedForm.familyMembers.length})</label>
                  <div className="space-y-2">
                    {selectedForm.familyMembers.map((member, index) => (
                      <div key={member.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <p className="font-bold text-gray-900">{member.name} ({member.relationship})</p>
                        <p className="text-sm text-gray-700 font-medium">
                          {member.age} years, {member.gender}, {member.educationLevel}, {member.occupation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Socio-Economic Information</label>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 space-y-2 border border-orange-200">
                    <p className="font-medium"><strong>Monthly Income:</strong> ₹{selectedForm.socioEconomic.monthlyIncome.toLocaleString()}</p>
                    <p className="font-medium"><strong>Income Source:</strong> {selectedForm.socioEconomic.incomeSource}</p>
                    <p className="font-medium"><strong>Land Ownership:</strong> {selectedForm.socioEconomic.landOwnership ? 'Yes' : 'No'}</p>
                    {selectedForm.socioEconomic.landDetails && (
                      <p className="font-medium"><strong>Land Details:</strong> {selectedForm.socioEconomic.landDetails}</p>
                    )}
                    <p className="font-medium"><strong>Government Beneficiary:</strong> {selectedForm.socioEconomic.governmentBeneficiary ? 'Yes' : 'No'}</p>
                    {selectedForm.socioEconomic.beneficiaryDetails && (
                      <p className="font-medium"><strong>Beneficiary Details:</strong> {selectedForm.socioEconomic.beneficiaryDetails}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Location & GPS</label>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 space-y-2 border border-purple-200">
                    <p className="font-medium"><strong>Address:</strong> {selectedForm.location.address}</p>
                    <p className="font-medium"><strong>GPS:</strong> {selectedForm.location.gpsCoordinates.latitude.toFixed(6)}, {selectedForm.location.gpsCoordinates.longitude.toFixed(6)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Submission Details</label>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 space-y-2 border border-gray-200">
                    <p className="font-medium"><strong>Surveyor:</strong> {selectedForm.metadata.surveyorName}</p>
                    <p className="font-medium"><strong>Date:</strong> {selectedForm.metadata.submissionDate}</p>
                    <p className="font-medium"><strong>Time:</strong> {selectedForm.metadata.submissionTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}