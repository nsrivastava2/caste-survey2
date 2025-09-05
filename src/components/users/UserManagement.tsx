import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Plus, Search, Filter, Edit, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { User } from '../../types';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Rajesh Kumar Singh',
      email: 'rajesh.kumar@punjab.gov.in',
      phone: '+91-9876543210',
      role: 'surveyor',
      location: { state: 'Punjab', district: 'Amritsar', ward: 'Ward 1', village: 'Village A' },
      isActive: true,
      createdAt: '2024-12-01',
      lastActive: '2024-12-19T14:30:00Z'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@punjab.gov.in',
      phone: '+91-9876543211',
      role: 'surveyor',
      location: { state: 'Punjab', district: 'Amritsar', ward: 'Ward 2', village: 'Village B' },
      isActive: true,
      createdAt: '2024-12-01',
      lastActive: '2024-12-19T13:45:00Z'
    },
    {
      id: '3',
      name: 'Amrit Kaur Gill',
      email: 'amrit.gill@punjab.gov.in',
      phone: '+91-9876543212',
      role: 'ward',
      location: { state: 'Punjab', district: 'Ludhiana', ward: 'Ward 5' },
      isActive: true,
      createdAt: '2024-11-15',
      lastActive: '2024-12-19T15:20:00Z'
    },
    {
      id: '4',
      name: 'Hardeep Singh Brar',
      email: 'hardeep.brar@punjab.gov.in',
      phone: '+91-9876543213',
      role: 'district',
      location: { state: 'Punjab', district: 'Jalandhar' },
      isActive: true,
      createdAt: '2024-10-01',
      lastActive: '2024-12-19T16:00:00Z'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage surveyors, officers, and system access</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Roles</option>
                <option value="surveyor">Surveyors</option>
                <option value="ward">Ward Officers</option>
                <option value="district">District Officers</option>
                <option value="state">State Officers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Last Active</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'state' ? 'bg-blue-100 text-blue-700' :
                        user.role === 'district' ? 'bg-green-100 text-green-700' :
                        user.role === 'ward' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {user.location.village && `${user.location.village}, `}
                          {user.location.ward && `${user.location.ward}, `}
                          {user.location.district || user.location.state}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {user.lastActive ? 
                        new Date(user.lastActive).toLocaleDateString() + ' ' + 
                        new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                        'Never'
                      }
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
}