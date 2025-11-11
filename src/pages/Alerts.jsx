import React, { useState, useEffect } from 'react';
import { BellAlertIcon, CheckIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { alertsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchAlerts();
    fetchSettings();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await alertsAPI.getAll();
      setAlerts(response.data);
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await alertsAPI.getSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to load alert settings:', error);
    }
  };

  const handleMarkAsRead = async (alertId) => {
    try {
      await alertsAPI.markAsRead(alertId);
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      ));
    } catch (error) {
      toast.error('Failed to mark alert as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await alertsAPI.markAllAsRead();
      setAlerts(alerts.map(alert => ({ ...alert, read: true })));
      toast.success('All alerts marked as read');
    } catch (error) {
      toast.error('Failed to mark all alerts as read');
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    try {
      const response = await alertsAPI.updateSettings(newSettings);
      setSettings(response.data);
      toast.success('Alert settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffInHours = Math.abs(now - date) / 36e5;

      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
      if (diffInHours < 48) return 'Yesterday';
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return isoString;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
      
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Stay updated with your link status and important notifications</p>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Cog6ToothIcon className="w-5 h-5 mr-1" />
          Settings
        </button>
      </div>

      {showSettings && settings && (
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.emailNotifications}
                  onChange={() => handleUpdateSettings({
                    ...settings,
                    emailNotifications: !settings.emailNotifications
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Broken Links</p>
                <p className="text-sm text-gray-500">Get notified when links become broken</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.brokenLinks}
                  onChange={() => handleUpdateSettings({
                    ...settings,
                    brokenLinks: !settings.brokenLinks
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Price Changes</p>
                <p className="text-sm text-gray-500">Get notified of significant price changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.priceChanges}
                  onChange={() => handleUpdateSettings({
                    ...settings,
                    priceChanges: !settings.priceChanges
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Monthly Reports</p>
                <p className="text-sm text-gray-500">Receive monthly performance reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.monthlyReports}
                  onChange={() => handleUpdateSettings({
                    ...settings,
                    monthlyReports: !settings.monthlyReports
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Recent Notifications</h2>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700"
            disabled={alerts.every(alert => alert.read)}
          >
            Mark all as read
          </button>
        </div>
        
        <div className="divide-y">
          {alerts.length === 0 ? (
            <div className="p-8 text-center">
              <BellAlertIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No alerts yet</p>
              <p className="text-sm text-gray-500 mt-1">
                You'll be notified here when there are updates about your links
              </p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className={`p-4 hover:bg-gray-50 ${!alert.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <BellAlertIcon 
                      className={`w-5 h-5 mt-0.5 ${
                        alert.type === 'broken' ? 'text-red-600' : 
                        alert.type === 'warning' ? 'text-yellow-600' : 
                        'text-primary-600'
                      }`} 
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(alert.time)}</p>
                    </div>
                  </div>
                  {!alert.read && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
