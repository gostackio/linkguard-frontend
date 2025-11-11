import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  FunnelIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { linksAPI } from '../services/api';
import toast from 'react-hot-toast';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedLinks, setSelectedLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await linksAPI.getAll();
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckLink = async (id) => {
    try {
      await linksAPI.checkStatus(id);
      toast.success('Link checked successfully');
      fetchLinks();
    } catch (error) {
      toast.error('Failed to check link');
    }
  };

  const handleDeleteLink = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await linksAPI.delete(id);
        toast.success('Link deleted successfully');
        fetchLinks();
      } catch (error) {
        toast.error('Failed to delete link');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLinks.length === 0) {
      toast.error('No links selected');
      return;
    }

    if (window.confirm(`Delete ${selectedLinks.length} links?`)) {
      try {
        await Promise.all(selectedLinks.map(id => linksAPI.delete(id)));
        toast.success('Links deleted successfully');
        setSelectedLinks([]);
        fetchLinks();
      } catch (error) {
        toast.error('Failed to delete links');
      }
    }
  };

  const toggleSelectLink = (id) => {
    setSelectedLinks(prev =>
      prev.includes(id)
        ? prev.filter(linkId => linkId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLinks.length === filteredLinks.length) {
      setSelectedLinks([]);
    } else {
      setSelectedLinks(filteredLinks.map(link => link.id));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'broken':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      active: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      broken: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          link.page.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || link.status === filter;
    return matchesSearch && matchesFilter;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Links</h1>
          <p className="text-gray-500 mt-1">Manage and monitor all your affiliate links</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/links/bulk-upload" className="btn-secondary flex items-center">
            <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
            Bulk Upload
          </Link>
          <Link to="/links/add" className="btn-primary flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Link
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="warning">Warning</option>
              <option value="broken">Broken</option>
            </select>
            {selectedLinks.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete ({selectedLinks.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Checked
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLinks.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedLinks.includes(link.id)}
                    onChange={() => toggleSelectLink(link.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{link.title}</p>
                    <p className="text-xs text-gray-500">{link.page}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline">
                      {link.url}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(link.status)}
                    {getStatusBadge(link.status)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">{link.clicks.toLocaleString()} clicks</p>
                    <p className="text-gray-500">${link.revenue.toFixed(2)} revenue</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {link.lastChecked}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleCheckLink(link.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Check now"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <LinkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No links found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first affiliate link'}
            </p>
            {!searchQuery && filter === 'all' && (
              <div className="mt-6">
                <Link to="/links/add" className="btn-primary inline-flex items-center">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Your First Link
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;
