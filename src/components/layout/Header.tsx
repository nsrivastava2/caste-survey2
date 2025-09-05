import React from 'react';
import { Bell, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { alerts } = useData();

  const unreadAlerts = alerts.filter(a => !a.isResolved).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {user?.role === 'surveyor' ? 'Field Survey App' : 'Punjab Caste Survey Dashboard'}
        </h2>
        {user?.location && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {user.location.state && <span>{user.location.state}</span>}
            {user.location.district && <span>• {user.location.district}</span>}
            {user.location.ward && <span>• {user.location.ward}</span>}
            {user.location.village && <span>• {user.location.village}</span>}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          
          {user?.role !== 'surveyor' && (
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}