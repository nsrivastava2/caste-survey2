import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Shield, 
  Map, 
  BarChart3, 
  Database,
  Settings,
  Plus,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home, roles: ['admin', 'state', 'district', 'ward'] },
  { path: '/', label: 'Dashboard', icon: Home, roles: ['surveyor'], color: 'blue' },
  { path: '/users', label: 'User Management', icon: Users, roles: ['admin', 'state', 'district'] },
  { path: '/surveys', label: 'Survey Management', icon: FileText, roles: ['admin', 'state', 'district', 'ward'] },
  { path: '/monitoring', label: 'Monitoring', icon: Shield, roles: ['admin', 'state', 'district'] },
  { path: '/statistics', label: 'Geo Statistics', icon: Map, roles: ['admin', 'state', 'district', 'ward'] },
  { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'state', 'district', 'ward'] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getItemColor = (item: any, isActive: boolean) => {
    if (user?.role === 'surveyor' && item.color) {
      const colors = {
        blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-blue-600 hover:bg-blue-50',
        green: isActive ? 'bg-green-100 text-green-700 border-green-300' : 'text-green-600 hover:bg-green-50',
        purple: isActive ? 'bg-purple-100 text-purple-700 border-purple-300' : 'text-purple-600 hover:bg-purple-50'
      };
      return colors[item.color as keyof typeof colors];
    }
    return isActive 
      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  };

  const getIconColor = (item: any, isActive: boolean) => {
    if (user?.role === 'surveyor' && item.color) {
      const colors = {
        blue: isActive ? 'text-blue-700' : 'text-blue-500',
        green: isActive ? 'text-green-700' : 'text-green-500',
        purple: isActive ? 'text-purple-700' : 'text-purple-500'
      };
      return colors[item.color as keyof typeof colors];
    }
    return isActive ? 'text-blue-600' : 'text-gray-400';
  };

  const handleNavigation = (item: any) => {
    if (item.path.includes('?view=')) {
      // For surveyor dashboard with specific views
      navigate(item.path);
    } else {
      // For regular navigation
      navigate(item.path);
    }
  };
  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Punjab Survey</h1>
            <p className="text-sm text-blue-100">Government System</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredItems.map(item => {
          const isActive = item.path.includes('?view=')
            ? location.pathname === '/' && location.search === item.path.split('?')[1]
            : location.pathname + location.search === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                getItemColor(item, isActive)
              } ${isActive ? 'shadow-md' : 'hover:shadow-sm'}`}
            >
              <div className={`p-1 rounded-lg ${user?.role === 'surveyor' && item.color ? 'bg-white bg-opacity-20' : ''}`}>
                <item.icon className={`w-5 h-5 ${getIconColor(item, isActive)}`} />
              </div>
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {user && (
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600 capitalize font-medium">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}