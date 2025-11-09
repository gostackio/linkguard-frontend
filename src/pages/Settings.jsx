import React from 'react';
import { UserCircleIcon, BellIcon, CreditCardIcon, KeyIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="input-field" defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input-field" defaultValue="john@example.com" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BellIcon className="w-5 h-5 mr-2" />
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-primary-600 mr-3" defaultChecked />
              <span className="text-sm text-gray-700">Email alerts for broken links</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-primary-600 mr-3" defaultChecked />
              <span className="text-sm text-gray-700">Weekly summary reports</span>
            </label>
          </div>
        </div>
        
        <div className="p-6">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
