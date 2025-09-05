import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Plus, Search, Edit, Play, Pause, BarChart3, Users, MapPin, Calendar, Filter, Eye, UserPlus, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Survey } from '../../types';
import SurveyFormBuilder from './SurveyFormBuilder';

export default function SurveyManagement() {
  const { user } = useAuth();
  const { surveys } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mock data for different roles
  const wardSurveyData = [
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      assignedSurveyors: 12,
      householdsAssigned: 850,
      completed: 320,
      pending: 530,
      status: 'active',
      completionRate: 38
    },
    {
      id: '2',
      title: 'SC/ST Focused Survey',
      assignedSurveyors: 8,
      householdsAssigned: 450,
      completed: 180,
      pending: 270,
      status: 'active',
      completionRate: 40
    }
  ];

  const districtSurveyData = [
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      ward: 'Ward 1',
      surveyorsAssigned: 12,
      householdsAssigned: 850,
      completed: 320,
      pending: 530,
      status: 'active'
    },
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      ward: 'Ward 2',
      surveyorsAssigned: 10,
      householdsAssigned: 720,
      completed: 280,
      pending: 440,
      status: 'active'
    },
    {
      id: '2',
      title: 'SC/ST Focused Survey',
      ward: 'Ward 1',
      surveyorsAssigned: 8,
      householdsAssigned: 450,
      completed: 180,
      pending: 270,
      status: 'active'
    }
  ];

  const stateSurveyData = [
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      district: 'Amritsar',
      householdsAssigned: 8500,
      completed: 2550,
      pending: 5950,
      flagged: 12,
      status: 'active'
    },
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      district: 'Ludhiana',
      householdsAssigned: 12000,
      completed: 2400,
      pending: 9600,
      flagged: 8,
      status: 'active'
    },
    {
      id: '2',
      title: 'SC/ST Focused Survey',
      district: 'Jalandhar',
      householdsAssigned: 3000,
      completed: 900,
      pending: 2100,
      flagged: 3,
      status: 'active'
    }
  ];

  const adminSurveyData = [
    {
      id: '1',
      title: 'Punjab Caste Census 2025',
      createdBy: 'Admin User',
      assignedTo: 'Punjab State',
      startDate: '2024-12-01',
      endDate: '2025-03-31',
      progress: 25,
      status: 'active'
    },
    {
      id: '2',
      title: 'SC/ST Focused Survey - Amritsar',
      createdBy: 'State Officer',
      assignedTo: 'Amritsar District',
      startDate: '2024-12-15',
      endDate: '2025-02-15',
      progress: 25,
      status: 'active'
    },
    {
      id: '3',
      title: 'OBC Demographics Study',
      createdBy: 'Admin User',
      assignedTo: 'Ludhiana District',
      startDate: '2025-01-01',
      endDate: '2025-04-30',
      progress: 0,
      status: 'draft'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'paused':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderWardOfficerView = () => (
    <div className="space-y-6">
      {/* Ward Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Surveys</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned Surveyors</p>
              <p className="text-2xl font-bold text-green-600">20</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-600">39%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Completion Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-bold text-gray-900">39%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-700">In Progress</span>
              </div>
              <span className="text-sm font-bold text-gray-900">61%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Completion Trend</h3>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{day}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${60 + index * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{45 + index * 5}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ward Survey Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Ward Survey Management</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Assign Surveyors</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Survey Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Assigned Surveyors</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Pending</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wardSurveyData.map((survey, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{survey.title}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.assignedSurveyors}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.householdsAssigned.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-medium">{survey.completed.toLocaleString()}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {survey.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{survey.pending.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Assignment">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Reassign">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDistrictOfficerView = () => (
    <div className="space-y-6">
      {/* District Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Surveys</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wards Covered</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Surveyors</p>
              <p className="text-2xl font-bold text-purple-600">45</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Completion</p>
              <p className="text-2xl font-bold text-orange-600">35%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ward-wise Completion %</h3>
          <div className="space-y-3">
            {['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'].map((ward, index) => (
              <div key={ward} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{ward}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${30 + index * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-8">{30 + index * 10}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Progress vs Surveyors</h3>
          <div className="space-y-3">
            {['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'].map((ward, index) => (
              <div key={ward} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-700">{ward}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{30 + index * 10}% progress</div>
                  <div className="text-xs text-gray-500">{8 + index * 2} surveyors</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Survey Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">District Survey Management</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Assign to Wards</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Survey Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Ward</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Surveyors Assigned</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Pending</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {districtSurveyData.map((survey, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{survey.title}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.ward}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.surveyorsAssigned}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.householdsAssigned.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.completed.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.pending.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Re-distribute">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStateOfficerView = () => (
    <div className="space-y-6">
      {/* State Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Surveys</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Districts Covered</p>
              <p className="text-2xl font-bold text-green-600">22</p>
            </div>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Households</p>
              <p className="text-2xl font-bold text-purple-600">500K</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">State Progress</p>
              <p className="text-2xl font-bold text-orange-600">25%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">District-wise Completion</h3>
          <div className="space-y-3">
            {['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'].map((district, index) => (
              <div key={district} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{district}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${20 + index * 8}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-8">{20 + index * 8}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">State-level Progress Trend</h3>
          <div className="space-y-2">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
              <div key={week} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{week}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${40 + index * 15}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">{1200 + index * 300}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State Survey Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">State Survey Management</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Re-assign Districts</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Survey Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">District</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Pending</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stateSurveyData.map((survey, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{survey.title}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.district}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.householdsAssigned.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.completed.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.pending.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    {survey.flagged > 0 ? (
                      <span className="text-red-600 font-medium">{survey.flagged}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Re-assign">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAdminView = () => (
    <div className="space-y-6">
      {/* Admin Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Surveys</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Surveys</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <Play className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Surveys</p>
              <p className="text-2xl font-bold text-orange-600">1</p>
            </div>
            <Edit className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-purple-600">25%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Type Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">Active</span>
              </div>
              <span className="text-sm font-bold text-gray-900">67%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="text-sm font-medium text-gray-700">Draft</span>
              </div>
              <span className="text-sm font-bold text-gray-900">33%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Creation Trend</h3>
          <div className="space-y-2">
            {['Dec 1', 'Dec 15', 'Jan 1'].map((date, index) => (
              <div key={date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{date}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(index + 1) * 33}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Survey Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Global Survey Management</h3>
            <button
              onClick={() => setShowFormBuilder(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Survey</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Survey ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Created By</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Assigned To</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Start Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">End Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Progress (%)</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adminSurveyData.map((survey, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{survey.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{survey.title}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.createdBy}</td>
                  <td className="py-4 px-6 text-gray-600">{survey.assignedTo}</td>
                  <td className="py-4 px-6 text-gray-600">{new Date(survey.startDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-gray-600">{new Date(survey.endDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${survey.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{survey.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                       onClick={() => {
                         const confirmation = confirm(`Re-assign ${survey.title} from ${survey.district}?\n\nCurrent Status:\n- Assigned: ${survey.householdsAssigned.toLocaleString()}\n- Completed: ${survey.completed.toLocaleString()}\n- Pending: ${survey.pending.toLocaleString()}\n- Flagged: ${survey.flagged}\n\nProceed with re-assignment?`);
                         if (confirmation) {
                           alert(`${survey.title} has been flagged for re-assignment from ${survey.district}. District officers will be notified.`);
                         }
                       }}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                       onClick={() => {
                         alert(`Viewing analytics for ${survey.title} in ${survey.district}\n\nKey Metrics:\n- Progress: ${Math.round((survey.completed / survey.householdsAssigned) * 100)}%\n- Completion Rate: ${(survey.completed / survey.householdsAssigned * 100).toFixed(1)}%\n- Flagged Issues: ${survey.flagged}\n- District Ranking: Based on completion rate\n\nThis would open the detailed analytics dashboard.`);
                       }}
                       onClick={() => {
                         alert(`Re-distributing workload for ${survey.title} in ${survey.ward}\n\nCurrent Distribution:\n- Surveyors: ${survey.surveyorsAssigned}\n- Households: ${survey.householdsAssigned.toLocaleString()}\n- Completed: ${survey.completed.toLocaleString()}\n\nThis would open the workload redistribution interface.`);
                       }}
                       onClick={() => {
                         alert(`Editing assignment for ${survey.title}\n\nSurveyors: ${survey.assignedSurveyors}\nHouseholds: ${survey.householdsAssigned.toLocaleString()}\n\nThis would open the surveyor assignment interface.`);
                       }}
                        onClick={() => {
                          setEditingSurvey(surveys.find(s => s.id === survey.id) || null);
                          setShowFormBuilder(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit Survey"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Analytics">
                       onClick={() => {
                         const newSurveyors = prompt(`Reassign surveyors for ${survey.title}\n\nCurrent: ${survey.assignedSurveyors}\nEnter new count:`, survey.assignedSurveyors.toString());
                         if (newSurveyors && !isNaN(Number(newSurveyors))) {
                           alert(`Successfully reassigned ${newSurveyors} surveyors to ${survey.title}`);
                         }
                       }}
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      {survey.status === 'active' ? (
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Pause Survey">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : survey.status === 'draft' ? (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Activate Survey">
                       onClick={() => {
                         alert(`Viewing details for ${survey.title} in ${survey.ward}\n\nProgress: ${Math.round((survey.completed / survey.householdsAssigned) * 100)}%\nSurveyors: ${survey.surveyorsAssigned}\nCompleted: ${survey.completed.toLocaleString()}\nPending: ${survey.pending.toLocaleString()}\n\nThis would open the detailed ward survey view.`);
                       }}
                          <Play className="w-4 h-4" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'ward':
        return renderWardOfficerView();
      case 'district':
        return renderDistrictOfficerView();
      case 'state':
        return renderStateOfficerView();
      case 'admin':
        return renderAdminView();
      default:
        return renderAdminView();
    }
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'ward':
        return 'Ward Survey Management';
      case 'district':
        return 'District Survey Management';
      case 'state':
        return 'State Survey Management';
      case 'admin':
        return 'Global Survey Management';
      default:
        return 'Survey Management';
    }
  };

  const getRoleDescription = () => {
    switch (user?.role) {
      case 'ward':
        return 'Assign and manage surveys for surveyors in your ward';
      case 'district':
        return 'Manage surveys across wards in your district';
      case 'state':
        return 'Monitor survey progress across all districts in Punjab';
      case 'admin':
        return 'Full system control - create, assign, and monitor all surveys';
      default:
        return 'Manage surveys and monitor progress';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getRoleTitle()}</h1>
            <p className="text-gray-600 mt-2">{getRoleDescription()}</p>
          </div>
          {user?.role !== 'admin' && (
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          )}
        </div>

        {getRoleSpecificContent()}

        {/* Survey Form Builder Modal */}
        {showFormBuilder && (
          <SurveyFormBuilder
            survey={editingSurvey}
            onClose={() => {
              setShowFormBuilder(false);
              setEditingSurvey(null);
            }}
            onSave={(surveyData) => {
              console.log('Survey saved:', surveyData);
              setShowFormBuilder(false);
              setEditingSurvey(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}