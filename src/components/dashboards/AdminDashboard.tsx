import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  Users, 
  FileText, 
  Shield, 
  TrendingUp,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Home,
  Activity
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import StatsCard from '../common/StatsCard';

export default function AdminDashboard() {
  const { surveys, alerts, locationStats, casteStats } = useData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [fraudFilter, setFraudFilter] = useState('all');

  const totalSubmissions = surveys.reduce((sum, s) => sum + s.completedSubmissions, 0);
  const totalTargets = surveys.reduce((sum, s) => sum + s.totalTargets, 0);
  const completionRate = Math.round((totalSubmissions / totalTargets) * 100);
  const activeSurveyors = locationStats[0]?.activeSurveyors || 0;
  const unresolvedAlerts = alerts.filter(a => !a.isResolved).length;

  // Mock admin-level data
  const adminStats = {
    totalSurveys: 500000,
    overallCompletion: 25,
    activeSurveyorsToday: 28500,
    fraudulentSubmissions: 156
  };

  const fraudMonitoringData = [
    {
      surveyor: 'Rajesh Kumar',
      location: 'Amritsar, Ward 1',
      formsSubmitted: 89,
      avgTime: '2.3 min',
      flaggedReason: 'Bulk submission detected'
    },
    {
      surveyor: 'Priya Sharma',
      location: 'Ludhiana, Ward 3',
      formsSubmitted: 76,
      avgTime: '1.8 min',
      flaggedReason: 'Location mismatch'
    },
    {
      surveyor: 'Amit Singh',
      location: 'Jalandhar, Ward 2',
      formsSubmitted: 92,
      avgTime: '2.1 min',
      flaggedReason: 'Suspicious timing pattern'
    },
    {
      surveyor: 'Sunita Devi',
      location: 'Patiala, Ward 4',
      formsSubmitted: 67,
      avgTime: '1.9 min',
      flaggedReason: 'Duplicate data entries'
    }
  ];

  const systemUsageData = [
    { role: 'Surveyor', users: 30000, activeToday: 28500, avgFormsPerUser: 4.2 },
    { role: 'Ward Officer', users: 500, activeToday: 485, avgFormsPerUser: 0 },
    { role: 'District Officer', users: 22, activeToday: 22, avgFormsPerUser: 0 },
    { role: 'State Officer', users: 5, activeToday: 5, avgFormsPerUser: 0 },
    { role: 'Admin', users: 2, activeToday: 2, avgFormsPerUser: 0 }
  ];

  const productivityData = [
    { surveyor: 'Top Performer', submissions: 156, avgTime: '8.2 min', efficiency: 95 },
    { surveyor: 'High Performer', submissions: 142, avgTime: '9.1 min', efficiency: 88 },
    { surveyor: 'Average Performer', submissions: 89, avgTime: '12.3 min', efficiency: 72 },
    { surveyor: 'Below Average', submissions: 67, avgTime: '15.8 min', efficiency: 58 },
    { surveyor: 'Low Performer', submissions: 34, avgTime: '18.9 min', efficiency: 42 }
  ];

  const districtRanking = [
    { district: 'Mohali', completion: 35, rank: 1, trend: 'up' },
    { district: 'Amritsar', completion: 30, rank: 2, trend: 'up' },
    { district: 'Jalandhar', completion: 30, rank: 3, trend: 'stable' },
    { district: 'Bathinda', completion: 25, rank: 4, trend: 'up' },
    { district: 'Ludhiana', completion: 20, rank: 5, trend: 'down' },
    { district: 'Patiala', completion: 15, rank: 6, trend: 'down' }
  ];

  const stats = [
    {
      title: 'Total Surveys',
      value: adminStats.totalSurveys.toLocaleString(),
      change: '+2%',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Overall Completion',
      value: `${adminStats.overallCompletion}%`,
      change: '+5%',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Active Surveyors Today',
      value: adminStats.activeSurveyorsToday.toLocaleString(),
      change: '+3%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Flagged Submissions',
      value: adminStats.fraudulentSubmissions.toString(),
      change: '-8%',
      changeType: 'positive' as const,
      icon: Shield
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">System-wide monitoring, fraud detection, and performance analytics</p>
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
          {/* State-wide Caste Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">State-wide Caste Breakdown</h3>
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

          {/* Overall Survey Completion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Survey Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">25%</span>
                  <p className="text-xs text-gray-500">125,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium text-gray-700">In Progress</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">15%</span>
                  <p className="text-xs text-gray-500">75,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">60%</span>
                  <p className="text-xs text-gray-500">300,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* District Performance Ranking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">District Performance Ranking</h3>
            <div className="space-y-3">
              {districtRanking.map((district) => (
                <div key={district.district} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      district.rank <= 2 ? 'bg-green-500' :
                      district.rank <= 4 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {district.rank}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{district.district}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">{district.completion}%</span>
                    <TrendingUp className={`w-3 h-3 ${
                      district.trend === 'up' ? 'text-green-500' :
                      district.trend === 'down' ? 'text-red-500 transform rotate-180' :
                      'text-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud Monitoring Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Fraud Monitoring</h3>
              <div className="flex items-center space-x-3">
                <select
                  value={fraudFilter}
                  onChange={(e) => setFraudFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Alerts</option>
                  <option value="bulk">Bulk Submission</option>
                  <option value="location">Location Mismatch</option>
                  <option value="timing">Suspicious Timing</option>
                  <option value="duplicate">Duplicate Data</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Surveyor</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Forms Submitted</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Avg. Time/Form</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged Reason</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fraudMonitoringData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium text-gray-900">{item.surveyor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.location}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{item.formsSubmitted}</td>
                    <td className="py-4 px-6">
                      <span className="text-red-600 font-medium">{item.avgTime}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        {item.flaggedReason}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Usage Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Usage</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Active Today</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Avg. Forms/User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {systemUsageData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{item.role}</td>
                      <td className="py-3 px-4 text-gray-600">{item.users.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-medium">{item.activeToday.toLocaleString()}</span>
                          <div className="w-12 bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-green-500 h-1 rounded-full"
                              style={{ width: `${(item.activeToday / item.users) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.avgFormsPerUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Surveyor Productivity Scatter Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Surveyor Productivity Analysis</h3>
            <div className="space-y-3">
              {productivityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.efficiency >= 80 ? 'bg-green-500' :
                      item.efficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.surveyor}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{item.submissions} forms</div>
                    <div className="text-xs text-gray-500">{item.avgTime} avg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud Risk Heatmap Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Risk Heatmap</h3>
          <div className="bg-red-50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-2" />
              <p className="text-red-600 font-medium">Geographic Fraud Risk Analysis</p>
              <p className="text-red-500 text-sm">Locations with suspicious activity patterns highlighted</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}