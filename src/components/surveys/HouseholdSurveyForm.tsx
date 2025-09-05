import React, { useState, useEffect } from 'react';
import { X, MapPin, Camera, Save, Send, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { HouseholdSubmission, FamilyMember } from '../../types';

interface HouseholdSurveyFormProps {
  survey: { id: string; name: string };
  existingData?: HouseholdSubmission | null;
  onClose: () => void;
  onSave: (formData: Partial<HouseholdSubmission>) => void;
}

export default function HouseholdSurveyForm({ survey, existingData, onClose, onSave }: HouseholdSurveyFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<HouseholdSubmission>>(
    existingData || {
      surveyId: survey.id,
      surveyorId: user?.id,
      householdId: `HH-${Date.now()}`,
      status: 'draft',
      location: {
        state: user?.location?.state || 'Punjab',
        district: user?.location?.district || '',
        ward: user?.location?.ward || '',
        village: user?.location?.village || '',
        gpsCoordinates: { latitude: 0, longitude: 0 },
        address: ''
      },
      headOfFamily: {
        fullName: '',
        fatherHusbandName: '',
        gender: 'male',
        age: 0,
        mobileNumber: '',
        aadhaarNumber: '',
        caste: ''
      },
      familyMembers: [],
      socioEconomic: {
        monthlyIncome: 0,
        incomeSource: '',
        landOwnership: false,
        landDetails: '',
        governmentBeneficiary: false,
        beneficiaryDetails: ''
      },
      metadata: {
        surveyorName: user?.name || '',
        submissionDate: new Date().toISOString().split('T')[0],
        submissionTime: new Date().toLocaleTimeString()
      }
    }
  );

  const [gpsStatus, setGpsStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Auto-capture GPS location
    if (navigator.geolocation && !existingData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location!,
              gpsCoordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              }
            }
          }));
          setGpsStatus('success');
        },
        (error) => {
          console.error('GPS Error:', error);
          setGpsStatus('error');
        }
      );
    } else if (existingData) {
      setGpsStatus('success');
    }
  }, [existingData]);

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: '',
      relationship: '',
      gender: 'male',
      age: 0,
      educationLevel: '',
      occupation: '',
      maritalStatus: ''
    };
    setFormData(prev => ({
      ...prev,
      familyMembers: [...(prev.familyMembers || []), newMember]
    }));
  };

  const updateFamilyMember = (memberId: string, updates: Partial<FamilyMember>) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers?.map(member => 
        member.id === memberId ? { ...member, ...updates } : member
      )
    }));
  };

  const removeFamilyMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers?.filter(member => member.id !== memberId)
    }));
  };

  const handleSave = (status: 'draft' | 'submitted') => {
    const finalData = {
      ...formData,
      status,
      metadata: {
        ...formData.metadata!,
        submissionDate: new Date().toISOString().split('T')[0],
        submissionTime: new Date().toLocaleTimeString()
      }
    };
    onSave(finalData);
  };

  const steps = [
    { title: 'Household Details', description: 'Basic information' },
    { title: 'Head of Family', description: 'Primary member details' },
    { title: 'Family Members', description: 'All household members' },
    { title: 'Socio-Economic', description: 'Income and benefits' },
    { title: 'Review', description: 'Final submission' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {existingData ? 'Edit Survey' : 'New Survey'} - {survey.name}
            </h2>
            <p className="text-sm text-gray-600">Household ID: {formData.householdId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > index + 1 ? 'bg-green-500 text-white' :
                  currentStep === index + 1 ? 'bg-blue-600 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">{steps[currentStep - 1].description}</p>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Household Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.location?.state}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input
                    type="text"
                    value={formData.location?.district}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                  <input
                    type="text"
                    value={formData.location?.ward}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                  <input
                    type="text"
                    value={formData.location?.village}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                <textarea
                  value={formData.location?.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location!, address: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete household address..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">GPS Location</h4>
                    <p className="text-sm text-blue-700">
                      {gpsStatus === 'loading' && 'Capturing location...'}
                      {gpsStatus === 'success' && `Lat: ${formData.location?.gpsCoordinates.latitude.toFixed(6)}, Lng: ${formData.location?.gpsCoordinates.longitude.toFixed(6)}`}
                      {gpsStatus === 'error' && 'Failed to capture location'}
                    </p>
                  </div>
                  <MapPin className={`w-5 h-5 ${
                    gpsStatus === 'success' ? 'text-green-500' : 
                    gpsStatus === 'error' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">House Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tap to capture house photo</p>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Take Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Head of Family</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.headOfFamily?.fullName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, fullName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Father's/Husband's Name *</label>
                  <input
                    type="text"
                    value={formData.headOfFamily?.fatherHusbandName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, fatherHusbandName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter father's/husband's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.headOfFamily?.gender}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, gender: e.target.value as any }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={formData.headOfFamily?.age}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, age: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter age"
                    min="0"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.headOfFamily?.mobileNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, mobileNumber: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.headOfFamily?.aadhaarNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, aadhaarNumber: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caste *</label>
                  <select
                    value={formData.headOfFamily?.caste}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      headOfFamily: { ...prev.headOfFamily!, caste: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Caste</option>
                    <option value="Scheduled Caste">Scheduled Caste</option>
                    <option value="Scheduled Tribe">Scheduled Tribe</option>
                    <option value="Other Backward Classes">Other Backward Classes</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Family Members</h3>
                <button
                  onClick={addFamilyMember}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>

              {formData.familyMembers?.map((member, index) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Family Member {index + 1}</h4>
                    <button
                      onClick={() => removeFamilyMember(member.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateFamilyMember(member.id, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Member name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                      <select
                        value={member.relationship}
                        onChange={(e) => updateFamilyMember(member.id, { relationship: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        value={member.gender}
                        onChange={(e) => updateFamilyMember(member.id, { gender: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                      <input
                        type="number"
                        value={member.age}
                        onChange={(e) => updateFamilyMember(member.id, { age: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education Level *</label>
                      <select
                        value={member.educationLevel}
                        onChange={(e) => updateFamilyMember(member.id, { educationLevel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Education</option>
                        <option value="Illiterate">Illiterate</option>
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Higher Secondary">Higher Secondary</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
                      <select
                        value={member.occupation}
                        onChange={(e) => updateFamilyMember(member.id, { occupation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Occupation</option>
                        <option value="Student">Student</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Laborer">Laborer</option>
                        <option value="Government Employee">Government Employee</option>
                        <option value="Private Employee">Private Employee</option>
                        <option value="Business">Business</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Retired">Retired</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status *</label>
                      <select
                        value={member.maritalStatus}
                        onChange={(e) => updateFamilyMember(member.id, { maritalStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {formData.familyMembers?.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-600 mb-4">No family members added yet</p>
                  <button
                    onClick={addFamilyMember}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add First Family Member
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Socio-Economic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Household Income (₹) *</label>
                  <input
                    type="number"
                    value={formData.socioEconomic?.monthlyIncome}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socioEconomic: { ...prev.socioEconomic!, monthlyIncome: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter monthly income"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source of Income *</label>
                  <select
                    value={formData.socioEconomic?.incomeSource}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socioEconomic: { ...prev.socioEconomic!, incomeSource: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Income Source</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Business">Business</option>
                    <option value="Government Job">Government Job</option>
                    <option value="Private Job">Private Job</option>
                    <option value="Daily Wage">Daily Wage</option>
                    <option value="Pension">Pension</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Land/Property Ownership *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="landOwnership"
                      checked={formData.socioEconomic?.landOwnership === true}
                      onChange={() => setFormData(prev => ({
                        ...prev,
                        socioEconomic: { ...prev.socioEconomic!, landOwnership: true }
                      }))}
                      className="text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="landOwnership"
                      checked={formData.socioEconomic?.landOwnership === false}
                      onChange={() => setFormData(prev => ({
                        ...prev,
                        socioEconomic: { ...prev.socioEconomic!, landOwnership: false }
                      }))}
                      className="text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.socioEconomic?.landOwnership && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Details</label>
                  <textarea
                    value={formData.socioEconomic?.landDetails}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socioEconomic: { ...prev.socioEconomic!, landDetails: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe land/property ownership..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Government Scheme Beneficiary *</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="govtBeneficiary"
                      checked={formData.socioEconomic?.governmentBeneficiary === true}
                      onChange={() => setFormData(prev => ({
                        ...prev,
                        socioEconomic: { ...prev.socioEconomic!, governmentBeneficiary: true }
                      }))}
                      className="text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="govtBeneficiary"
                      checked={formData.socioEconomic?.governmentBeneficiary === false}
                      onChange={() => setFormData(prev => ({
                        ...prev,
                        socioEconomic: { ...prev.socioEconomic!, governmentBeneficiary: false }
                      }))}
                      className="text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.socioEconomic?.governmentBeneficiary && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Details</label>
                  <textarea
                    value={formData.socioEconomic?.beneficiaryDetails}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socioEconomic: { ...prev.socioEconomic!, beneficiaryDetails: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify government schemes..."
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Review & Submit</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Household Details</h4>
                    <p className="text-sm text-gray-600">ID: {formData.householdId}</p>
                    <p className="text-sm text-gray-600">Address: {formData.location?.address}</p>
                    <p className="text-sm text-gray-600">
                      GPS: {formData.location?.gpsCoordinates.latitude.toFixed(6)}, {formData.location?.gpsCoordinates.longitude.toFixed(6)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Head of Family</h4>
                    <p className="text-sm text-gray-600">Name: {formData.headOfFamily?.fullName}</p>
                    <p className="text-sm text-gray-600">Age: {formData.headOfFamily?.age}</p>
                    <p className="text-sm text-gray-600">Caste: {formData.headOfFamily?.caste}</p>
                    <p className="text-sm text-gray-600">Mobile: {formData.headOfFamily?.mobileNumber}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Family Members</h4>
                    <p className="text-sm text-gray-600">{formData.familyMembers?.length || 0} members added</p>
                    {formData.familyMembers?.map((member, index) => (
                      <p key={member.id} className="text-xs text-gray-500">
                        {index + 1}. {member.name} ({member.relationship})
                      </p>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Socio-Economic</h4>
                    <p className="text-sm text-gray-600">Income: ₹{formData.socioEconomic?.monthlyIncome?.toLocaleString()}/month</p>
                    <p className="text-sm text-gray-600">Source: {formData.socioEconomic?.incomeSource}</p>
                    <p className="text-sm text-gray-600">Land Ownership: {formData.socioEconomic?.landOwnership ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-gray-600">Govt. Beneficiary: {formData.socioEconomic?.governmentBeneficiary ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Submission Metadata</h4>
                <p className="text-sm text-blue-700">Surveyor: {formData.metadata?.surveyorName}</p>
                <p className="text-sm text-blue-700">Date: {formData.metadata?.submissionDate}</p>
                <p className="text-sm text-blue-700">Time: {formData.metadata?.submissionTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleSave('draft')}
              className="px-4 py-2 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => handleSave('submitted')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Form</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}