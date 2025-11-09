import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AddLink = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate('/links')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Links
      </button>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Link</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate URL</label>
            <input type="url" className="input-field" placeholder="https://amazon.com/dp/..." required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" className="input-field" placeholder="Product title" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page/Article</label>
            <input type="text" className="input-field" placeholder="Where this link appears" />
          </div>
          <button type="submit" className="btn-primary w-full">Add Link</button>
        </form>
      </div>
    </div>
  );
};

export default AddLink;
