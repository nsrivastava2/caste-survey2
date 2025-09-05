import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Download, Filter, Calendar, BarChart3, FileText, Users, MapPin, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function Reports() {
  const { casteStats, locationStats } = useData();
  const [reportType, setReportType] = useState('caste');
  const [dateRange, setDateRange] = useState('last30days');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const reportTemplates = [
    {
      id: 'caste-summary',
      name: 'Caste-wise Summary Report',
      description: 'Complete breakdown of survey progress by caste categories',
      icon: BarChart3,
      format: ['PDF', 'Excel'],
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'district-progress',
      name: 'District Progress Report',
      description: 'Detailed progress analysis for each district in Punjab',
      icon: MapPin,
      format: ['PDF', 'Excel'],
      estimatedTime: '3-5 minutes'
    },
    {
      id: 'surveyor-performance',
      name: 'Surveyor Performance Report',
      description: 'Individual performance metrics and productivity analysis',
      icon: Users,
      format: ['PDF', 'Excel'],
      estimatedTime: '5-7 minutes'
    },
    {
      id: 'daily-summary',
      name: 'Daily Activity Summary',
      description: 'Daily submission counts and activity metrics',
      icon: FileText,
      format: ['PDF', 'Excel'],
      estimatedTime: '1-2 minutes'
    }
  ];

  const generateReport = (templateId: string, format: string) => {
    console.log(`Generating ${templateId} report in ${format} format`);
    // Simulate report generation
    alert(`Generating ${templateId} report in ${format} format. This will be available for download in a few minutes.`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Generate comprehensive reports and export survey data</p>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="caste">Caste-wise Analysis</option>
                <option value="district">District-wise Analysis</option>
                <option value="surveyor">Surveyor Performance</option>
                <option value="timeline">Timeline Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Districts</option>
                <option value="amritsar">Amritsar</option>
                <option value="ludhiana">Ludhiana</option>
                <option value="jalandhar">Jalandhar</option>
                <option value="patiala">Patiala</option>
                <option value="bathinda">Bathinda</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports Generated</p>
                <p className="text-2xl font-bold text-gray-900">147</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Exports</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <Download className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Reports</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Generation Time</p>
                <p className="text-2xl font-bold text-gray-900">3.2m</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Report Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reportTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <template.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Est. time: {template.estimatedTime}</span>
                <div className="flex items-center space-x-2">
                  <span>Available in:</span>
                  {template.format.map(fmt => (
                    <span key={fmt} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                {template.format.map(format => (
                  <button
                    key={format}
                    onClick={() => generateReport(template.id, format)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Generate {format}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live Data Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Data Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">District</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Target</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Completed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Surveyors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {locationStats[0]?.children?.map(district => (
                  <tr key={district.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{district.name}</td>
                    <td className="py-3 px-4 text-gray-600">{district.totalTargets.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{district.completedSurveys.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${district.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{district.completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{district.activeSurveyors.toLocaleString()}</td>
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