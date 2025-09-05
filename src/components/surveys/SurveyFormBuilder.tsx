import React, { useState } from 'react';
import { X, Plus, Trash2, GripVertical, Settings } from 'lucide-react';
import { Survey, FormField } from '../../types';

interface SurveyFormBuilderProps {
  survey?: Survey | null;
  onClose: () => void;
  onSave: (surveyData: Partial<Survey>) => void;
}

const fieldTypes = [
  { value: 'text', label: 'Text Input', description: 'Single line text (Name, Address)' },
  { value: 'number', label: 'Number Input', description: 'Numeric values (Age, Income)' },
  { value: 'dropdown', label: 'Dropdown', description: 'Select from predefined options' },
  { value: 'radio', label: 'Radio Buttons', description: 'Single choice from options' },
  { value: 'date', label: 'Date Picker', description: 'Date selection (DOB, Survey Date)' },
  { value: 'location', label: 'GPS Location', description: 'Auto-capture coordinates' },
  { value: 'file', label: 'File Upload', description: 'Photos, documents, ID proof' },
  { value: 'repeatable', label: 'Repeatable Section', description: 'Family members, assets' }
];

const defaultHouseholdForm: FormField[] = [
  {
    id: 'household-details',
    type: 'text',
    label: 'Household Details Section',
    required: false,
    children: [
      { id: 'household-id', type: 'text', label: 'Household ID', required: true, placeholder: 'Auto-generated' },
      { id: 'address', type: 'text', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: 'gps-location', type: 'location', label: 'GPS Location', required: true },
      { id: 'house-photo', type: 'file', label: 'House Photo', required: false }
    ]
  },
  {
    id: 'head-of-family',
    type: 'text',
    label: 'Head of Family',
    required: false,
    children: [
      { id: 'full-name', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter full name' },
      { id: 'father-husband-name', type: 'text', label: "Father's/Husband's Name", required: true, placeholder: 'Enter father/husband name' },
      { id: 'gender', type: 'dropdown', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
      { id: 'age', type: 'number', label: 'Age', required: true, validation: { min: 0, max: 120 } },
      { id: 'mobile', type: 'text', label: 'Mobile Number', required: true, placeholder: '+91-XXXXXXXXXX' },
      { id: 'aadhaar', type: 'text', label: 'Aadhaar Number (Optional)', required: false, placeholder: 'XXXX-XXXX-XXXX' },
      { id: 'caste', type: 'dropdown', label: 'Caste', required: true, options: ['Scheduled Caste', 'Scheduled Tribe', 'Other Backward Classes', 'General'] }
    ]
  },
  {
    id: 'family-members',
    type: 'repeatable',
    label: 'Family Members',
    required: false,
    children: [
      { id: 'member-name', type: 'text', label: 'Name', required: true, placeholder: 'Member name' },
      { id: 'relationship', type: 'dropdown', label: 'Relationship with Head', required: true, options: ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other'] },
      { id: 'member-gender', type: 'dropdown', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
      { id: 'member-age', type: 'number', label: 'Age', required: true, validation: { min: 0, max: 120 } },
      { id: 'education', type: 'dropdown', label: 'Education Level', required: true, options: ['Illiterate', 'Primary', 'Secondary', 'Higher Secondary', 'Graduate', 'Post Graduate', 'Professional'] },
      { id: 'occupation', type: 'dropdown', label: 'Occupation', required: true, options: ['Student', 'Farmer', 'Laborer', 'Government Employee', 'Private Employee', 'Business', 'Unemployed', 'Retired', 'Other'] },
      { id: 'marital-status', type: 'dropdown', label: 'Marital Status', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'] }
    ]
  },
  {
    id: 'socio-economic',
    type: 'text',
    label: 'Socio-Economic Information',
    required: false,
    children: [
      { id: 'monthly-income', type: 'number', label: 'Monthly Household Income (₹)', required: true, validation: { min: 0 } },
      { id: 'income-source', type: 'dropdown', label: 'Source of Income', required: true, options: ['Agriculture', 'Business', 'Government Job', 'Private Job', 'Daily Wage', 'Pension', 'Other'] },
      { id: 'land-ownership', type: 'radio', label: 'Land/Property Ownership', required: true, options: ['Yes', 'No'] },
      { id: 'land-details', type: 'text', label: 'Land Details (if applicable)', required: false, placeholder: 'Describe land/property' },
      { id: 'govt-beneficiary', type: 'radio', label: 'Government Scheme Beneficiary', required: true, options: ['Yes', 'No'] },
      { id: 'beneficiary-details', type: 'text', label: 'Beneficiary Details (if applicable)', required: false, placeholder: 'Specify schemes' }
    ]
  }
];

export default function SurveyFormBuilder({ survey, onClose, onSave }: SurveyFormBuilderProps) {
  const [surveyName, setSurveyName] = useState(survey?.name || '');
  const [surveyDescription, setSurveyDescription] = useState(survey?.description || '');
  const [targetCaste, setTargetCaste] = useState(survey?.targetCaste || 'All Categories');
  const [startDate, setStartDate] = useState(survey?.startDate || '');
  const [endDate, setEndDate] = useState(survey?.endDate || '');
  const [totalTargets, setTotalTargets] = useState(survey?.totalTargets || 1000);
  const [formFields, setFormFields] = useState<FormField[]>(survey?.formFields || defaultHouseholdForm);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(survey?.assignedLocations || []);
  const [currentStep, setCurrentStep] = useState(1);

  const locations = [
    'Punjab (All Districts)',
    'Amritsar District',
    'Ludhiana District', 
    'Jalandhar District',
    'Patiala District',
    'Bathinda District',
    'Mohali District'
  ];

  const addField = (parentId?: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      required: false
    };

    if (parentId) {
      setFormFields(prev => prev.map(field => 
        field.id === parentId 
          ? { ...field, children: [...(field.children || []), newField] }
          : field
      ));
    } else {
      setFormFields(prev => [...prev, newField]);
    }
  };

  const updateField = (fieldId: string, updates: Partial<FormField>, parentId?: string) => {
    setFormFields(prev => prev.map(field => {
      if (parentId && field.id === parentId) {
        return {
          ...field,
          children: field.children?.map(child => 
            child.id === fieldId ? { ...child, ...updates } : child
          )
        };
      }
      return field.id === fieldId ? { ...field, ...updates } : field;
    }));
  };

  const removeField = (fieldId: string, parentId?: string) => {
    if (parentId) {
      setFormFields(prev => prev.map(field => 
        field.id === parentId 
          ? { ...field, children: field.children?.filter(child => child.id !== fieldId) }
          : field
      ));
    } else {
      setFormFields(prev => prev.filter(field => field.id !== fieldId));
    }
  };

  const handleSave = () => {
    const surveyData: Partial<Survey> = {
      name: surveyName,
      description: surveyDescription,
      targetCaste,
      startDate,
      endDate,
      totalTargets,
      formFields,
      assignedLocations: selectedLocations,
      status: 'draft'
    };
    onSave(surveyData);
  };

  const renderFieldEditor = (field: FormField, parentId?: string) => (
    <div key={field.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value }, parentId)}
            className="font-medium text-gray-900 bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={field.type}
            onChange={(e) => updateField(field.id, { type: e.target.value as any }, parentId)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            {fieldTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <button
            onClick={() => removeField(field.id, parentId)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          placeholder="Placeholder text"
          value={field.placeholder || ''}
          onChange={(e) => updateField(field.id, { placeholder: e.target.value }, parentId)}
          className="text-sm border border-gray-300 rounded px-3 py-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(field.id, { required: e.target.checked }, parentId)}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Required</span>
        </label>
      </div>

      {(field.type === 'dropdown' || field.type === 'radio') && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Options (one per line)</label>
          <textarea
            value={field.options?.join('\n') || ''}
            onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(o => o.trim()) }, parentId)}
            className="w-full text-sm border border-gray-300 rounded px-3 py-2"
            rows={3}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      )}

      {field.type === 'repeatable' && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Repeatable Fields</label>
            <button
              onClick={() => addField(field.id)}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add Field</span>
            </button>
          </div>
          <div className="space-y-2 ml-4">
            {field.children?.map(childField => renderFieldEditor(childField, field.id))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {survey ? 'Edit Survey' : 'Create New Survey'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Steps Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <div className="space-y-2">
              {[
                { step: 1, title: 'Basic Info', description: 'Survey details' },
                { step: 2, title: 'Form Builder', description: 'Design form fields' },
                { step: 3, title: 'Assignment', description: 'Assign locations' },
                { step: 4, title: 'Review', description: 'Final review' }
              ].map(({ step, title, description }) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentStep === step 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step}
                    </span>
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {currentStep === 1 && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Basic Survey Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Survey Name</label>
                    <input
                      type="text"
                      value={surveyName}
                      onChange={(e) => setSurveyName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Punjab Caste Census 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Caste</label>
                    <select
                      value={targetCaste}
                      onChange={(e) => setTargetCaste(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Scheduled Caste">Scheduled Caste</option>
                      <option value="Scheduled Tribe">Scheduled Tribe</option>
                      <option value="Other Backward Classes">Other Backward Classes</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Targets</label>
                    <input
                      type="number"
                      value={totalTargets}
                      onChange={(e) => setTotalTargets(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Expected number of households to survey"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={surveyDescription}
                    onChange={(e) => setSurveyDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the purpose and scope of this survey..."
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Form Builder</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setFormFields(defaultHouseholdForm)}
                      className="px-3 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                    >
                      Load Default Template
                    </button>
                    <button
                      onClick={() => addField()}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Field</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {formFields.map(field => renderFieldEditor(field))}
                </div>

                {formFields.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No form fields yet</h4>
                    <p className="text-gray-600 mb-4">Add fields to build your survey form</p>
                    <button
                      onClick={() => addField()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Add First Field
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Location Assignment</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Locations</label>
                  <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {locations.map(location => (
                      <label key={location} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLocations(prev => [...prev, location]);
                            } else {
                              setSelectedLocations(prev => prev.filter(l => l !== location));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-gray-900">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Assignment Summary</h4>
                  <p className="text-blue-700 text-sm">
                    Survey will be assigned to {selectedLocations.length} location(s) with an estimated {totalTargets.toLocaleString()} households to survey.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Review & Publish</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Survey Name</label>
                      <p className="text-gray-900">{surveyName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Target Caste</label>
                      <p className="text-gray-900">{targetCaste}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <p className="text-gray-900">{startDate} to {endDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Targets</label>
                      <p className="text-gray-900">{totalTargets.toLocaleString()} households</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Form Fields</label>
                      <p className="text-gray-900">{formFields.length} sections configured</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned Locations</label>
                      <p className="text-gray-900">{selectedLocations.length} location(s)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Ready to Publish</h4>
                  <p className="text-green-700 text-sm">
                    Your survey is configured and ready to be published. Once published, assigned surveyors will be able to access and submit forms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
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
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Publish Survey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}