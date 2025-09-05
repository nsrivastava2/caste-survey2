import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  MapPin, 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Home,
  TrendingUp,
  Shield,
  CheckCircle,
  Eye,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import StatsCard from '../common/StatsCard';

export default function DistrictDashboard() {
  const { user } = useAuth();
  const { surveys, casteStats } = useData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const districtName = user?.location?.district || 'Amritsar';
  
  // Mock data for district-level metrics
  const districtStats = {
    totalHouseholds: 45000,
    completedSurveys: 13500,
    activeSurveyors: 850,
    flaggedSurveys: 23,
    completionRate: 30
  };

  const wardData = [
    { name: 'Ward 1', surveyors: 45, assigned: 2500, completed: 875, pending: 1625, flagged: 3 },
    { name: 'Ward 2', surveyors: 38, assigned: 2200, completed: 660, pending: 1540, flagged: 1 },
    { name: 'Ward 3', surveyors: 42, assigned: 2800, completed: 980, pending: 1820, flagged: 5 },
    { name: 'Ward 4', surveyors: 35, assigned: 2100, completed: 735, pending: 1365, flagged: 2 },
    { name: 'Ward 5', surveyors: 40, assigned: 2400, completed: 840, pending: 1560, flagged: 4 }
  ];

  const dailyTrend = [
    { date: '12-15', submissions: 245 },
    { date: '12-16', submissions: 289 },
    { date: '12-17', submissions: 312 },
    { date: '12-18', submissions: 298 },
    { date: '12-19', submissions: 356 }
  ];

  const stats = [
    {
      title: 'Total Households',
      value: districtStats.totalHouseholds.toLocaleString(),
      change: '+2%',
      changeType: 'positive' as const,
      icon: Home
    },
    {
      title: 'Surveys Completed',
      value: `${districtStats.completionRate}%`,
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Active Surveyors',
      value: districtStats.activeSurveyors.toLocaleString(),
      change: '+3%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Flagged Surveys',
      value: districtStats.flaggedSurveys.toString(),
      change: '-15%',
      changeType: 'positive' as const,
      icon: AlertTriangle
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{districtName} District Dashboard</h1>
            <p className="text-gray-600 mt-2">District-level survey management and monitoring</p>
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
          {/* Caste Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Caste Distribution</h3>
            <div className="space-y-4">
              {casteStats.map((caste, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                      <span className="text-sm font-medium text-gray-700">{caste.caste}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{caste.completionRate}%</span>
                      <p className="text-xs text-gray-500">{caste.completedSurveys.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ward Completion Donut Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ward-wise Completion</h3>
            <div className="space-y-3">
              {wardData.map((ward, index) => {
                const completion = Math.round((ward.completed / ward.assigned) * 100);
                return (
                  <div key={ward.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{ward.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8">{completion}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Trend Line Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Submissions Trend</h3>
            <div className="space-y-2">
              {dailyTrend.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(day.submissions / 400) * 100}%` }}
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
                <span className="font-bold text-green-600">300 forms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ward Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Ward Performance Overview</h3>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Ward Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Assigned Surveyors</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Pending</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wardData.map((ward) => {
                  const completion = Math.round((ward.completed / ward.assigned) * 100);
                  return (
                    <tr key={ward.name} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{ward.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{ward.surveyors}</td>
                      <td className="py-4 px-6 text-gray-600">{ward.assigned.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-medium">{ward.completed.toLocaleString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            completion >= 40 ? 'bg-green-100 text-green-700' :
                            completion >= 25 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {completion}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{ward.pending.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        {ward.flagged > 0 ? (
                          <span className="flex items-center space-x-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">{ward.flagged}</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>0</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ward Coverage Heatmap</h3>
          <div className="bg-blue-50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">Interactive Ward Coverage Map</p>
              <p className="text-blue-500 text-sm">Visual representation of survey progress across wards</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}