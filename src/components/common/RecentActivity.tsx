import React from 'react';
import { FileText, Shield, Users } from 'lucide-react';

interface Activity {
  id: string;
  type: 'survey_created' | 'alert_generated' | 'user_added';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'survey_created':
        return FileText;
      case 'alert_generated':
        return Shield;
      case 'user_added':
        return Users;
    }
  };

  const getIconColor = (type: Activity['type']) => {
    switch (type) {
      case 'survey_created':
        return 'text-blue-500 bg-blue-50';
      case 'alert_generated':
        return 'text-red-500 bg-red-50';
      case 'user_added':
        return 'text-green-500 bg-green-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getIconColor(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}