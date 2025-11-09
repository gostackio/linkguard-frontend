import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  LinkIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { analyticsAPI, linksAPI } from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLinks: 0,
    activeLinks: 0,
    brokenLinks: 0,
    warningLinks: 0,
    estimatedLoss: 0,
    healthScore: 0,
    lastCheck: null,
  });
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [brokenLinksHistory, setBrokenLinksHistory] = useState([]);
  const [checkingAll, setCheckingAll] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls - replace with actual API calls
      setStats({
        totalLinks: 247,
        activeLinks: 198,
        brokenLinks: 31,
        warningLinks: 18,
        estimatedLoss: 3240,
        healthScore: 80,
        lastCheck: new Date().toISOString(),
      });

      setRecentAlerts([
        {
          id: 1,
          type: 'broken',
          link: 'https://amazon.com/product-xyz',
          page: 'Best Laptops 2024',
          message: 'Product no longer available',
          timestamp: '2 hours ago',
        },
        {
          id: 2,
          type: 'warning',
          link: 'https://bestbuy.com/item-abc',
          page: 'Gaming Setup Guide',
          message: 'Price changed significantly',
          timestamp: '5 hours ago',
        },
        {
          id: 3,
          type: 'broken',
          link: 'https://target.com/deal-123',
          page: 'Holiday Gift Guide',
          message: '404 - Page not found',
          timestamp: '1 day ago',
        },
      ]);

      // Mock chart data
      const dates = Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - 29 + i);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });

      setBrokenLinksHistory({
        labels: dates,
        datasets: [
          {
            label: 'Broken Links',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 10),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAll = async () => {
    setCheckingAll(true);
    try {
      await linksAPI.checkAll();
      await fetchDashboardData();
      toast.success('All links checked successfully');
    } catch (error) {
      toast.error('Failed to check links');
    } finally {
      setCheckingAll(false);
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const StatCard = ({ icon, title, value, change, changeType, color = 'text-gray-600' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color.replace('text', 'bg').replace('600', '100')}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'increase' ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
            {change}%
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor your affiliate links performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCheckAll}
            disabled={checkingAll}
            className="btn-secondary flex items-center"
          >
            <ArrowPathIcon className={`w-5 h-5 mr-2 ${checkingAll ? 'animate-spin' : ''}`} />
            Check All Links
          </button>
          <Link to="/links/add" className="btn-primary flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Link
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<LinkIcon className="w-6 h-6 text-blue-600" />}
          title="Total Links"
          value={stats.totalLinks}
          color="text-blue-600"
        />
        <StatCard
          icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />}
          title="Active Links"
          value={stats.activeLinks}
          change={5}
          changeType="increase"
          color="text-green-600"
        />
        <StatCard
          icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-600" />}
          title="Broken Links"
          value={stats.brokenLinks}
          change={12}
          changeType="decrease"
          color="text-red-600"
        />
        <StatCard
          icon={<CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />}
          title="Est. Monthly Loss"
          value={`$${stats.estimatedLoss.toLocaleString()}`}
          change={8}
          changeType="decrease"
          color="text-yellow-600"
        />
      </div>

      {/* Health Score & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Link Health Score</h2>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${stats.healthScore * 3.51} 351.86`}
                  className={getHealthScoreColor(stats.healthScore)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getHealthScoreColor(stats.healthScore)}`}>
                  {stats.healthScore}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active</span>
              <span className="font-medium text-green-600">{stats.activeLinks}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Warnings</span>
              <span className="font-medium text-yellow-600">{stats.warningLinks}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Broken</span>
              <span className="font-medium text-red-600">{stats.brokenLinks}</span>
            </div>
          </div>
          {stats.lastCheck && (
            <p className="text-xs text-gray-500 mt-4 flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              Last checked: {new Date(stats.lastCheck).toLocaleString()}
            </p>
          )}
        </div>

        {/* Broken Links Chart */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Broken Links Trend (30 days)</h2>
          <Line
            data={brokenLinksHistory}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 5,
                  },
                },
              },
            }}
            height={200}
          />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
          <Link to="/alerts" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  alert.type === 'broken' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <ExclamationTriangleIcon className={`w-5 h-5 ${
                    alert.type === 'broken' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.page}</p>
                  <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.link}</p>
                </div>
                <div className="text-sm text-gray-500">{alert.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
