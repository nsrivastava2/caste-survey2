import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  CheckCircle, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Filter,
  User,
  Calendar,
  Search,
  X,
  FileText,
  Navigation,
  BarChart3
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { MonitoringAlert } from '../../types';

export default function Monitoring() {
  const { alerts, resolveAlert } = useData();
  const [selectedAlert, setSelectedAlert] = useState<MonitoringAlert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Enhanced mock data for comprehensive monitoring
  const enhancedAlerts: MonitoringAlert[] = [
    {
      id: 'A001',
      type: 'bulk_submission',
      severity: 'high',
      surveyorId: '5',
      surveyorName: 'Field Surveyor',
      description: '50+ forms in 2 hrs - unusual activity detected',
      timestamp: '2024-12-19T20:00:00Z',
      isResolved: false,
      details: { 
        submissionCount: 52, 
        timeWindow: '2 hours', 
        averageTime: '2.3 minutes',
        expectedTime: '12 minutes',
        location: 'Ward 1, Village A'
      }
    },
    {
      id: 'A002',
      type: 'location_mismatch',
      severity: 'medium',
      surveyorId: '6',
      surveyorName: 'Another Surveyor',
      description: 'GPS mismatch (Ward 1 vs Ward 5)',
      timestamp: '2024-12-19T17:45:00Z',
      isResolved: false,
      details: { 
        assignedWard: 'Ward 1', 
        detectedLocation: 'Ward 5', 
        distance: '15.2 km',
        gpsCoordinates: { lat: 31.6340, lng: 74.8723 },
        assignedCoordinates: { lat: 31.6500, lng: 74.9000 }
      }
    },
    {
      id: 'A003',
      type: 'suspicious_timing',
      severity: 'medium',
      surveyorId: '7',
      surveyorName: 'Rajesh Kumar',
      description: 'Forms submitted outside working hours',
      timestamp: '2024-12-19T02:30:00Z',
      isResolved: false,
      details: {
        submissionTime: '2:30 AM',
        workingHours: '9:00 AM - 6:00 PM',
        formsCount: 15
      }
    },
    {
      id: 'A004',
      type: 'duplicate_data',
      severity: 'low',
      surveyorId: '8',
      surveyorName: 'Priya Sharma',
      description: 'Duplicate household data detected',
      timestamp: '2024-12-19T14:20:00Z',
      isResolved: true,
      details: {
        duplicateFields: ['mobile_number', 'aadhaar_number'],
        householdIds: ['HH-001', 'HH-045'],
        similarity: '95%'
      }
    }
  ];

  const unresolvedAlerts = enhancedAlerts.filter(a => !a.isResolved);
  const resolvedToday = enhancedAlerts.filter(a => a.isResolved && 
    new Date(a.timestamp).toDateString() === new Date().toDateString()).length;
  const highPriorityAlerts = unresolvedAlerts.filter(a => a.severity === 'high').length;

  // Filter alerts based on search and filters
  const filteredAlerts = enhancedAlerts.filter(alert => {
    const matchesSearch = alert.surveyorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'today' && new Date(alert.timestamp).toDateString() === new Date().toDateString()) ||
      (filterDate === 'week' && new Date(alert.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesSeverity && matchesDate;
  });

  const getAlertIcon = (type: MonitoringAlert['type']) => {
    switch (type) {
      case 'bulk_submission':
        return TrendingUp;
      case 'location_mismatch':
        return MapPin;
      case 'suspicious_timing':
        return Clock;
      case 'duplicate_data':
        return Shield;
    }
  };

  const getSeverityColor = (severity: MonitoringAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getSeverityBadgeColor = (severity: MonitoringAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-yellow-500 text-white';
    }
  };

  const getTypeLabel = (type: MonitoringAlert['type']) => {
    switch (type) {
      case 'bulk_submission':
        return 'High submission count';
      case 'location_mismatch':
        return 'Out-of-location submission';
      case 'suspicious_timing':
        return 'Suspicious timing pattern';
      case 'duplicate_data':
        return 'Duplicate data entries';
    }
  };

  // Mock data for charts
  const alertsBySeverity = [
    { severity: 'High', count: highPriorityAlerts, color: '#EF4444' },
    { severity: 'Medium', count: unresolvedAlerts.filter(a => a.severity === 'medium').length, color: '#F97316' },
    { severity: 'Low', count: unresolvedAlerts.filter(a => a.severity === 'low').length, color: '#EAB308' }
  ];

  const alertsBySurveyor = [
    { surveyor: 'Field Surveyor', alerts: 3 },
    { surveyor: 'Another Surveyor', alerts: 2 },
    { surveyor: 'Rajesh Kumar', alerts: 1 },
    { surveyor: 'Priya Sharma', alerts: 1 }
  ];

  const alertsTrend = [
    { date: '12-15', alerts: 2 },
    { date: '12-16', alerts: 4 },
    { date: '12-17', alerts: 1 },
    { date: '12-18', alerts: 3 },
    { date: '12-19', alerts: 5 }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monitoring & Fraud Detection</h1>
            <p className="text-gray-600 mt-2">Real-time surveillance of surveyor activities and anomaly detection</p>
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

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{unresolvedAlerts.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{highPriorityAlerts}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold text-blue-600">2.3h</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts by Severity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts by Severity</h3>
            <div className="space-y-4">
              {alertsBySeverity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{item.severity}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Flagged Surveyors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Flagged Surveyors</h3>
            <div className="space-y-3">
              {alertsBySurveyor.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.surveyor}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(item.alerts / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-4">{item.alerts}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts Detected Over Time</h3>
            <div className="space-y-2">
              {alertsTrend.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(day.alerts / 6) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-4">{day.alerts}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by surveyor or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>

        {/* Active Alerts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Alert ID</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Surveyor</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Type of Anomaly</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Severity</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Detected At</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlerts.map(alert => {
                  const Icon = getAlertIcon(alert.type);
                  return (
                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{alert.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{alert.surveyorName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{getTypeLabel(alert.type)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(alert.timestamp).toLocaleDateString()} {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.isResolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {alert.isResolved ? 'Resolved' : 'Open'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedAlert(alert)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Review Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!alert.isResolved && (
                            <button
                              onClick={() => resolveAlert(alert.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAlerts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Map View Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Risk Heatmap</h3>
          <div className="bg-red-50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-red-400 mx-auto mb-2" />
              <p className="text-red-600 font-medium">Geographic Fraud Risk Analysis</p>
              <p className="text-red-500 text-sm">Red pins = flagged submissions, Green pins = valid submissions</p>
            </div>
          </div>
        </div>

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Alert Details - {selectedAlert.id}</h3>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surveyor</label>
                    <p className="text-gray-900 font-semibold">{selectedAlert.surveyorName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                    <p className="text-gray-900">{getTypeLabel(selectedAlert.type)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(selectedAlert.severity)}`}>
                      {selectedAlert.severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detected At</label>
                    <p className="text-gray-900">{new Date(selectedAlert.timestamp).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAlert.description}</p>
                </div>

                {selectedAlert.details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Additional Details</label>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(selectedAlert.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="text-sm text-gray-900 font-semibold">
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special actions based on alert type */}
                {selectedAlert.type === 'bulk_submission' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Review Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 text-blue-700 hover:bg-blue-100 rounded flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Review submission list with timestamps & GPS</span>
                      </button>
                    </div>
                  </div>
                )}

                {selectedAlert.type === 'location_mismatch' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-orange-900 mb-2">Location Review</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 text-orange-700 hover:bg-orange-100 rounded flex items-center space-x-2">
                        <Navigation className="w-4 h-4" />
                        <span>View on map (assigned vs detected location)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {!selectedAlert.isResolved && (
                  <button
                    onClick={() => {
                      resolveAlert(selectedAlert.id);
                      setSelectedAlert(null);
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}