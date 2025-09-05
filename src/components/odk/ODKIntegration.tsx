import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Play,
  FileText,
  Link,
  Settings
} from 'lucide-react';

export default function ODKIntegration() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState('2024-12-19T14:30:00Z');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const odkForms = [
    {
      id: 'punjab_caste_form_v1',
      name: 'Punjab Caste Census Form v1.0',
      description: 'Main caste survey form for Punjab state',
      status: 'active',
      submissions: 12500,
      lastUpdated: '2024-12-01',
      version: '1.0'
    },
    {
      id: 'amritsar_scst_form_v1',
      name: 'Amritsar SC/ST Focused Form v1.0',
      description: 'Specialized form for SC/ST demographics in Amritsar',
      status: 'active',
      submissions: 750,
      lastUpdated: '2024-12-15',
      version: '1.0'
    },
    {
      id: 'demo_training_form',
      name: 'Demo Training Form',
      description: 'Practice form for surveyor training and onboarding',
      status: 'draft',
      submissions: 45,
      lastUpdated: '2024-11-20',
      version: '0.9'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSync(new Date().toISOString());
    setIsRefreshing(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ODK Integration</h1>
            <p className="text-gray-600 mt-2">Manage forms, sync data, and configure ODK connections</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Forms'}</span>
          </button>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Connection Status</h3>
              {isConnected ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <p className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected to ODK Central' : 'Connection Failed'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Last sync: {new Date(lastSync).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Form Sync</h3>
              <Database className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Active forms synced</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Submissions</h3>
              <Upload className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">13,295</p>
            <p className="text-sm text-gray-600">Forms submitted to ODK</p>
          </div>
        </div>

        {/* ODK Forms Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">ODK Forms</h3>
              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Import Forms</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create Form</span>
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {odkForms.map(form => (
              <div key={form.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{form.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        form.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {form.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{form.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Version {form.version}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{form.submissions.toLocaleString()} submissions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Updated {new Date(form.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Configure">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download Data">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Analytics">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    {form.status === 'draft' && (
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Activate Form">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ODK Demo Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ODK Demo & Training</h3>
              <p className="text-gray-600 text-sm">Training resources for field surveyors</p>
            </div>
            <Link className="w-6 h-6 text-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">ODK Collect Mobile App</h4>
              <p className="text-sm text-gray-600 mb-3">Download link and setup instructions for field surveyors</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                Download ODK Collect
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Training Form Demo</h4>
              <p className="text-sm text-gray-600 mb-3">Practice form for new surveyor onboarding</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                Launch Demo Form
              </button>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ODK Central Server URL</label>
              <input
                type="url"
                value="https://punjab-survey.odk.cloud"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project ID</label>
              <input
                type="text"
                value="punjab-caste-survey-2025"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}