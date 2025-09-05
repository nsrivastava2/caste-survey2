import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <action.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 group-hover:text-blue-900">{action.title}</p>
            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}