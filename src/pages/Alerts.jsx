import React from 'react';
import { BellAlertIcon, CheckIcon } from '@heroicons/react/24/outline';

const Alerts = () => {
  const alerts = [
    { id: 1, type: 'broken', message: 'Link broken: Amazon Echo Dot', time: '2 hours ago', read: false },
    { id: 2, type: 'warning', message: 'Price change detected: AirPods Pro', time: '5 hours ago', read: false },
    { id: 3, type: 'info', message: 'Monthly report ready', time: '1 day ago', read: true },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Recent Notifications</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">Mark all as read</button>
        </div>
        
        <div className="divide-y">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 hover:bg-gray-50 ${!alert.read ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <BellAlertIcon className={`w-5 h-5 mt-0.5 ${alert.type === 'broken' ? 'text-red-600' : 'text-yellow-600'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
                {!alert.read && (
                  <button className="text-primary-600 hover:text-primary-700">
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
