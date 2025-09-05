import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  Users, 
  FileText, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Home,
  Shield,
  TrendingUp,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../common/StatsCard';

export default function WardDashboard() {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  
  const wardName = user?.location?.ward || 'Ward 1';
  const districtName = user?.location?.district || 'Amritsar';

  // Mock data for ward-level metrics
  const wardStats = {
    householdsAssigned: 2500,
    householdsCompleted: 875,
    surveyorsAssigned: 45,
    fraudAlerts: 3,
    completionRate: 35
  };

  const casteComposition = [
    { caste: 'Scheduled Caste', count: 320, percentage: 37 },
    { caste: 'Other Backward Classes', count: 280, percentage: 32 },
    { caste: 'General', count: 175, percentage: 20 },
    { caste: 'Scheduled Tribe', count: 100, percentage: 11 }
  ];

  const surveyStatus = [
    { status: 'Completed', count: 875, percentage: 35, color: 'bg-green-500' },
    { status: 'In Progress', count: 450, percentage: 18, color: 'bg-yellow-500' },
    { status: 'Pending', count: 1175, percentage: 47, color: 'bg-gray-400' }
  ];

  const surveyorData = [
    { 
      name: 'Rajesh Kumar Singh', 
      totalForms: 89, 
      avgTime: '12 min', 
      flagged: 0, 
      status: 'Active',
      efficiency: 'High'
    },
    { 
      name: 'Priya Sharma', 
      totalForms: 76, 
      avgTime: '15 min', 
      flagged: 1, 
      status: 'Active',
      efficiency: 'Medium'
    },
    { 
      name: 'Amit Singh', 
      totalForms: 45, 
      avgTime: '18 min', 
      flagged: 0, 
      status: 'Active',
      efficiency: 'Medium'
    },
    { 
      name: 'Sunita Devi', 
      totalForms: 92, 
      avgTime: '11 min', 
      flagged: 2, 
      status: 'Active',
      efficiency: 'High'
    },
    { 
      name: 'Hardeep Kaur', 
      totalForms: 67, 
      avgTime: '14 min', 
      flagged: 0, 
      status: 'Active',
      efficiency: 'Medium'
    }
  ];

  const dailyActivity = [
    { date: '12-15', submissions: 45 },
    { date: '12-16', submissions: 52 },
    { date: '12-17', submissions: 48 },
    { date: '12-18', submissions: 61 },
    { date: '12-19', submissions: 58 }
  ];

  const stats = [
    {
      title: 'Households Assigned',
      value: wardStats.householdsAssigned.toLocaleString(),
      change: '+5%',
      changeType: 'positive' as const,
      icon: Home
    },
    {
      title: 'Households Completed',
      value: `${wardStats.completionRate}%`,
      change: '+15%',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Surveyors Assigned',
      value: wardStats.surveyorsAssigned.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Fraud Alerts',
      value: wardStats.fraudAlerts.toString(),
      change: '-1',
      changeType: 'positive' as const,
      icon: AlertTriangle
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{wardName} Dashboard</h1>
            <p className="text-gray-600 mt-2">{districtName} District - Ward-level survey management</p>
          </div>
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
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Caste Composition Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Caste Composition</h3>
            <div className="space-y-4">
              {casteComposition.map((caste, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                      <span className="text-sm font-medium text-gray-700">{caste.caste}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{caste.percentage}%</span>
                      <p className="text-xs text-gray-500">{caste.count}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Survey Status Donut Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Status</h3>
            <div className="space-y-4">
              {surveyStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${status.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{status.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{status.percentage}%</span>
                    <p className="text-xs text-gray-500">{status.count.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Activity Line Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h3>
            <div className="space-y-2">
              {dailyActivity.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(day.submissions / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{day.submissions}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average Daily</span>
                <span className="font-bold text-blue-600">53 forms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Surveyor Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Surveyor Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Surveyor Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Total Forms</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Avg. Time/Form</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged Submissions</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Efficiency</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {surveyorData.map((surveyor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {surveyor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{surveyor.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{surveyor.totalForms}</td>
                    <td className="py-4 px-6 text-gray-600">{surveyor.avgTime}</td>
                    <td className="py-4 px-6">
                      {surveyor.flagged > 0 ? (
                        <span className="flex items-center space-x-1 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium">{surveyor.flagged}</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>0</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        surveyor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {surveyor.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        surveyor.efficiency === 'High' ? 'bg-green-100 text-green-700' :
                        surveyor.efficiency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {surveyor.efficiency}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}