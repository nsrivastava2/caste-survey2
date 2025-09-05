import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  FileText, 
  Users, 
  MapPin, 
  BarChart3, 
  TrendingDown,
  Home,
  CheckCircle,
  AlertTriangle,
  Eye,
  Filter
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import StatsCard from '../common/StatsCard';

export default function StateDashboard() {
  const { surveys, locationStats, casteStats } = useData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Mock state-level data
  const stateStats = {
    totalHouseholds: 500000,
    completedSurveys: 125000,
    activeSurveyors: 30000,
    lowestProgressDistricts: 3,
    completionRate: 25
  };

  const districtData = [
    { name: 'Amritsar', surveyors: 5000, assigned: 45000, completed: 13500, pending: 31500, flagged: 23, completion: 30 },
    { name: 'Ludhiana', surveyors: 7500, assigned: 65000, completed: 13000, pending: 52000, flagged: 18, completion: 20 },
    { name: 'Jalandhar', surveyors: 6000, assigned: 55000, completed: 16500, pending: 38500, flagged: 12, completion: 30 },
    { name: 'Patiala', surveyors: 4500, assigned: 40000, completed: 6000, pending: 34000, flagged: 8, completion: 15 },
    { name: 'Bathinda', surveyors: 3500, assigned: 35000, completed: 8750, pending: 26250, flagged: 15, completion: 25 },
    { name: 'Mohali', surveyors: 3500, assigned: 30000, completed: 10500, pending: 19500, flagged: 5, completion: 35 }
  ];

  const submissionTrend = [
    { date: '12-15', submissions: 2450 },
    { date: '12-16', submissions: 2890 },
    { date: '12-17', submissions: 3120 },
    { date: '12-18', submissions: 2980 },
    { date: '12-19', submissions: 3560 }
  ];

  const totalSubmissions = surveys.reduce((sum, s) => sum + s.completedSubmissions, 0);
  const totalTargets = surveys.reduce((sum, s) => sum + s.totalTargets, 0);
  const completionRate = Math.round((totalSubmissions / totalTargets) * 100);

  const stats = [
    {
      title: 'Total Households',
      value: stateStats.totalHouseholds.toLocaleString(),
      change: '+1%',
      changeType: 'positive' as const,
      icon: Home
    },
    {
      title: 'Surveys Completed',
      value: `${stateStats.completionRate}%`,
      change: '+5%',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Active Surveyors',
      value: stateStats.activeSurveyors.toLocaleString(),
      change: '+2%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Low Progress Districts',
      value: stateStats.lowestProgressDistricts.toString(),
      change: '-1',
      changeType: 'positive' as const,
      icon: TrendingDown
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Punjab State Dashboard</h1>
            <p className="text-gray-600 mt-2">State-wide survey overview and district comparison</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
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
          {/* State-wide Caste Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">State-wide Caste Distribution</h3>
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

          {/* District Completion Donut */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">District Completion Rate</h3>
            <div className="space-y-3">
              {districtData
                .sort((a, b) => b.completion - a.completion)
                .slice(0, 6)
                .map((district, index) => (
                <div key={district.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{district.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          district.completion >= 30 ? 'bg-green-500' :
                          district.completion >= 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${district.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">{district.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Submission Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Submission Trend</h3>
            <div className="space-y-2">
              {submissionTrend.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(day.submissions / 4000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">{day.submissions}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average Daily</span>
                <span className="font-bold text-blue-600">3,000 forms</span>
              </div>
            </div>
          </div>
        </div>

        {/* District Performance vs Surveyors Scatter Plot */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">District Performance vs Surveyor Count</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {districtData.map((district) => (
              <div key={district.name} className="text-center p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{district.name}</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className={`font-bold ${
                      district.completion >= 30 ? 'text-green-600' :
                      district.completion >= 20 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {district.completion}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Surveyors</span>
                    <span className="font-medium text-gray-900">{district.surveyors.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${
                        district.completion >= 30 ? 'bg-green-500' :
                        district.completion >= 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${district.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* District Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">District Performance Overview</h3>
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
                  <th className="text-left py-3 px-6 font-medium text-gray-700">District</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Assigned Surveyors</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Pending</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {districtData.map((district) => (
                  <tr key={district.name} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{district.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{district.surveyors.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-600">{district.assigned.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 font-medium">{district.completed.toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          district.completion >= 30 ? 'bg-green-100 text-green-700' :
                          district.completion >= 20 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {district.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{district.pending.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      {district.flagged > 0 ? (
                        <span className="flex items-center space-x-1 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium">{district.flagged}</span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* State Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Punjab State Survey Progress Map</h3>
          <div className="bg-blue-50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">Interactive State Map</p>
              <p className="text-blue-500 text-sm">Visual representation of survey progress across all districts</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}