import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  Map, 
  BarChart3, 
  Filter, 
  Download, 
  TrendingUp, 
  Users, 
  MapPin, 
  Eye,
  Layers,
  Calendar,
  FileText,
  Home,
  AlertTriangle,
  X
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function GeoStatistics() {
  const { locationStats, casteStats } = useData();
  const [selectedLevel, setSelectedLevel] = useState<'state' | 'district' | 'ward' | 'village'>('state');
  const [selectedCaste, setSelectedCaste] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('month');
  const [mapLayers, setMapLayers] = useState({
    progress: true,
    surveyorActivity: false,
    casteDistribution: false
  });
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [drillDownLevel, setDrillDownLevel] = useState<'state' | 'district' | 'ward' | 'village'>('state');

  const districtData = [
    { 
      id: 'amritsar', 
      name: 'Amritsar', 
      progress: 30, 
      assigned: 12000, 
      completed: 3600, 
      surveyors: 1200, 
      flagged: 15,
      x: 25, 
      y: 20, 
      color: '#059669',
      casteBreakdown: { SC: 35, ST: 20, OBC: 30, General: 15 },
      wards: [
        { name: 'Ward 1', progress: 35, surveyors: 45, assigned: 850, completed: 298 },
        { name: 'Ward 2', progress: 28, surveyors: 38, assigned: 720, completed: 202 },
        { name: 'Ward 3', progress: 32, surveyors: 42, assigned: 980, completed: 314 }
      ]
    },
    { 
      id: 'ludhiana', 
      name: 'Ludhiana', 
      progress: 20, 
      assigned: 20000, 
      completed: 4000, 
      surveyors: 2000, 
      flagged: 25,
      x: 35, 
      y: 45, 
      color: '#EAB308',
      casteBreakdown: { SC: 28, ST: 15, OBC: 35, General: 22 },
      wards: [
        { name: 'Ward 1', progress: 22, surveyors: 65, assigned: 1200, completed: 264 },
        { name: 'Ward 2', progress: 18, surveyors: 58, assigned: 1100, completed: 198 },
        { name: 'Ward 3', progress: 25, surveyors: 72, assigned: 1350, completed: 338 }
      ]
    },
    { 
      id: 'jalandhar', 
      name: 'Jalandhar', 
      progress: 30, 
      assigned: 15000, 
      completed: 4500, 
      surveyors: 1500, 
      flagged: 18,
      x: 30, 
      y: 35, 
      color: '#059669',
      casteBreakdown: { SC: 32, ST: 18, OBC: 28, General: 22 },
      wards: [
        { name: 'Ward 1', progress: 33, surveyors: 52, assigned: 950, completed: 314 },
        { name: 'Ward 2', progress: 29, surveyors: 48, assigned: 880, completed: 255 },
        { name: 'Ward 3', progress: 28, surveyors: 45, assigned: 820, completed: 230 }
      ]
    },
    { 
      id: 'patiala', 
      name: 'Patiala', 
      progress: 15, 
      assigned: 10000, 
      completed: 1500, 
      surveyors: 900, 
      flagged: 12,
      x: 50, 
      y: 50, 
      color: '#DC2626',
      casteBreakdown: { SC: 25, ST: 12, OBC: 40, General: 23 },
      wards: [
        { name: 'Ward 1', progress: 18, surveyors: 35, assigned: 650, completed: 117 },
        { name: 'Ward 2', progress: 12, surveyors: 32, assigned: 600, completed: 72 },
        { name: 'Ward 3', progress: 16, surveyors: 38, assigned: 720, completed: 115 }
      ]
    },
    { 
      id: 'bathinda', 
      name: 'Bathinda', 
      progress: 25, 
      assigned: 9000, 
      completed: 2250, 
      surveyors: 750, 
      flagged: 10,
      x: 70, 
      y: 65, 
      color: '#EAB308',
      casteBreakdown: { SC: 30, ST: 22, OBC: 25, General: 23 },
      wards: [
        { name: 'Ward 1', progress: 28, surveyors: 28, assigned: 520, completed: 146 },
        { name: 'Ward 2', progress: 23, surveyors: 25, assigned: 480, completed: 110 },
        { name: 'Ward 3', progress: 24, surveyors: 30, assigned: 550, completed: 132 }
      ]
    },
    { 
      id: 'mohali', 
      name: 'Mohali', 
      progress: 35, 
      assigned: 8000, 
      completed: 2800, 
      surveyors: 650, 
      flagged: 8,
      x: 45, 
      y: 30, 
      color: '#059669',
      casteBreakdown: { SC: 20, ST: 15, OBC: 35, General: 30 },
      wards: [
        { name: 'Ward 1', progress: 38, surveyors: 25, assigned: 450, completed: 171 },
        { name: 'Ward 2', progress: 33, surveyors: 22, assigned: 420, completed: 139 },
        { name: 'Ward 3', progress: 34, surveyors: 28, assigned: 480, completed: 163 }
      ]
    },
  ];

  const stateStats = {
    totalDistricts: 22,
    activeSurveyors: 30000,
    overallProgress: 25,
    totalAssigned: 74000,
    totalCompleted: 18650
  };

  const stateCasteDistribution = [
    { caste: 'Scheduled Caste', percentage: 30, color: '#3B82F6' },
    { caste: 'Scheduled Tribe', percentage: 25, color: '#10B981' },
    { caste: 'Other Backward Classes', percentage: 25, color: '#F59E0B' },
    { caste: 'General', percentage: 20, color: '#8B5CF6' }
  ];

  const surveyStatusData = [
    { status: 'Completed', count: 18650, percentage: 25, color: '#10B981' },
    { status: 'In Progress', count: 14800, percentage: 20, color: '#F59E0B' },
    { status: 'Pending', count: 40550, percentage: 55, color: '#6B7280' }
  ];

  const progressTrend = [
    { date: '12-15', progress: 20 },
    { date: '12-16', progress: 21 },
    { date: '12-17', progress: 23 },
    { date: '12-18', progress: 24 },
    { date: '12-19', progress: 25 }
  ];

  const topPerformingAreas = districtData
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4);

  const handleDistrictClick = (district: any) => {
    setSelectedDistrict(district.id === selectedDistrict ? null : district.id);
    if (district.id !== selectedDistrict) {
      setDrillDownLevel('district');
    }
  };

  const handleWardClick = (ward: any) => {
    setDrillDownLevel('ward');
  };

  const toggleMapLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const exportMapData = (format: string) => {
    console.log(`Exporting map data in ${format} format`);
    alert(`Exporting Punjab survey data in ${format} format...`);
  };

  const resetDrillDown = () => {
    setSelectedDistrict(null);
    setDrillDownLevel('state');
  };

  const getCurrentViewData = () => {
    if (drillDownLevel === 'district' && selectedDistrict) {
      const district = districtData.find(d => d.id === selectedDistrict);
      return district?.wards || [];
    }
    return districtData;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Geo Statistics</h1>
            <p className="text-gray-600 mt-2">Geographic visualization and analysis of survey data</p>
          </div>
          {drillDownLevel !== 'state' && (
            <button
              onClick={resetDrillDown}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Back to State View</span>
            </button>
          )}
        </div>

        {/* Top Controls - Filters & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Filters */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="state">State Level</option>
                  <option value="district">District Level</option>
                  <option value="ward">Ward Level</option>
                  <option value="village">Village Level</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caste Filter</label>
                <select
                  value={selectedCaste}
                  onChange={(e) => setSelectedCaste(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Castes</option>
                  <option value="sc">Scheduled Caste</option>
                  <option value="st">Scheduled Tribe</option>
                  <option value="obc">Other Backward Classes</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="inprogress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => exportMapData('Excel')}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center space-x-1 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => exportMapData('PDF')}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center space-x-1 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => exportMapData('GeoJSON')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center space-x-1 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>GeoJSON</span>
                </button>
              </div>
              
              {/* Map Layer Toggles */}
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleMapLayer('progress')}
                  className={`px-2 py-1 rounded text-xs flex items-center space-x-1 transition-colors ${
                    mapLayers.progress ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Progress</span>
                </button>
                <button
                  onClick={() => toggleMapLayer('surveyorActivity')}
                  className={`px-2 py-1 rounded text-xs flex items-center space-x-1 transition-colors ${
                    mapLayers.surveyorActivity ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  <span>Surveyors</span>
                </button>
                <button
                  onClick={() => toggleMapLayer('casteDistribution')}
                  className={`px-2 py-1 rounded text-xs flex items-center space-x-1 transition-colors ${
                    mapLayers.casteDistribution ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Caste</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Districts</p>
                <p className="text-2xl font-bold text-gray-900">{stateStats.totalDistricts}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Surveyors</p>
                <p className="text-2xl font-bold text-gray-900">{stateStats.activeSurveyors.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stateStats.overallProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Households Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stateStats.totalCompleted.toLocaleString()}</p>
              </div>
              <Home className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {drillDownLevel === 'state' ? 'Punjab Survey Coverage Map' : 
                 drillDownLevel === 'district' ? `${districtData.find(d => d.id === selectedDistrict)?.name} District - Ward View` :
                 'Ward Details'}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">{'>'}30% Complete</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">15-30% Complete</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">{'<'}15% Complete</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Map Visualization */}
            <div className="relative bg-blue-50 rounded-lg h-96 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {drillDownLevel === 'state' ? (
                  // State View - Show Districts
                  districtData.map(district => (
                    <g key={district.id}>
                      <circle
                        cx={district.x}
                        cy={district.y}
                        r={selectedDistrict === district.id ? 8 : Math.max(4, district.progress / 5)}
                        fill={district.color}
                        className="hover:opacity-80 cursor-pointer transition-all duration-200"
                        onClick={() => handleDistrictClick(district)}
                        stroke={selectedDistrict === district.id ? '#1F2937' : 'none'}
                        strokeWidth={selectedDistrict === district.id ? 2 : 0}
                      />
                      <text
                        x={district.x}
                        y={district.y - 10}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-700 pointer-events-none"
                      >
                        {district.name}
                      </text>
                      <text
                        x={district.x}
                        y={district.y + 15}
                        textAnchor="middle"
                        className="text-xs fill-gray-600 pointer-events-none"
                      >
                        {district.progress}%
                      </text>
                    </g>
                  ))
                ) : (
                  // District View - Show Wards
                  (() => {
                    const district = districtData.find(d => d.id === selectedDistrict);
                    return district?.wards.map((ward, index) => (
                      <g key={ward.name}>
                        <rect
                          x={20 + (index * 25)}
                          y={30}
                          width={20}
                          height={20}
                          fill={ward.progress >= 30 ? '#059669' : ward.progress >= 15 ? '#EAB308' : '#DC2626'}
                          className="hover:opacity-80 cursor-pointer transition-all duration-200"
                          onClick={() => handleWardClick(ward)}
                          rx={2}
                        />
                        <text
                          x={30 + (index * 25)}
                          y={25}
                          textAnchor="middle"
                          className="text-xs font-medium fill-gray-700 pointer-events-none"
                        >
                          {ward.name}
                        </text>
                        <text
                          x={30 + (index * 25)}
                          y={65}
                          textAnchor="middle"
                          className="text-xs fill-gray-600 pointer-events-none"
                        >
                          {ward.progress}%
                        </text>
                      </g>
                    ));
                  })()
                )}
              </svg>

              {/* District Details Popup */}
              {selectedDistrict && drillDownLevel === 'state' && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
                  {(() => {
                    const district = districtData.find(d => d.id === selectedDistrict);
                    if (!district) return null;
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{district.name}</h4>
                          <button
                            onClick={() => setSelectedDistrict(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ×
                          </button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Progress:</span>
                            <span className="font-medium text-gray-900">{district.progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-medium text-gray-900">{district.completed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Assigned:</span>
                            <span className="font-medium text-gray-900">{district.assigned.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Surveyors:</span>
                            <span className="font-medium text-gray-900">{district.surveyors.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Flagged:</span>
                            <span className="font-medium text-red-600">{district.flagged}</span>
                          </div>
                        </div>
                        
                        {/* Mini Caste Chart */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-700 mb-2">Caste Breakdown:</p>
                          <div className="space-y-1">
                            {Object.entries(district.casteBreakdown).map(([caste, percentage]) => (
                              <div key={caste} className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{caste}:</span>
                                <span className="font-medium">{percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDistrictClick(district)}
                          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
                        >
                          View Ward Details
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Analytics */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Areas</h3>
              <div className="space-y-3">
                {topPerformingAreas.map((area, index) => (
                  <div key={area.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{area.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{area.progress}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* State Caste Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">State Caste Distribution</h3>
              <div className="space-y-3">
                {stateCasteDistribution.map((caste, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: caste.color }}></div>
                      <span className="text-sm font-medium text-gray-700">{caste.caste}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{caste.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Status Overview</h3>
              <div className="space-y-3">
                {surveyStatusData.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: status.color }}></div>
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
          </div>
        </div>

        {/* District/Ward Level Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {drillDownLevel === 'state' ? 'District Performance Overview' : 
               drillDownLevel === 'district' ? `${districtData.find(d => d.id === selectedDistrict)?.name} - Ward Performance` :
               'Ward Details'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    {drillDownLevel === 'state' ? 'District' : 'Ward'}
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Progress %</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Households Assigned</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Completed</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Active Surveyors</th>
                  {drillDownLevel === 'state' && (
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Flagged Submissions</th>
                  )}
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getCurrentViewData().map((item: any) => (
                  <tr key={item.id || item.name} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.progress >= 30 ? 'bg-green-500' :
                              item.progress >= 15 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.assigned?.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-600">{item.completed?.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-600">{item.surveyors?.toLocaleString()}</td>
                    {drillDownLevel === 'state' && (
                      <td className="py-4 px-6">
                        {item.flagged > 0 ? (
                          <span className="flex items-center space-x-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">{item.flagged}</span>
                          </span>
                        ) : (
                          <span className="text-green-600">0</span>
                        )}
                      </td>
                    )}
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => drillDownLevel === 'state' ? handleDistrictClick(item) : handleWardClick(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Trend Over Time</h3>
            <div className="space-y-2">
              {progressTrend.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.progress / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{day.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Comparison Scatter Plot */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">District Performance vs Surveyors</h3>
            <div className="grid grid-cols-2 gap-4">
              {districtData.map((district) => (
                <div key={district.id} className="text-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">{district.name}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Progress</span>
                      <span className={`font-bold ${
                        district.progress >= 30 ? 'text-green-600' :
                        district.progress >= 15 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {district.progress}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Surveyors</span>
                      <span className="font-medium text-gray-900">{district.surveyors.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${
                          district.progress >= 30 ? 'bg-green-500' :
                          district.progress >= 15 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${district.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}