import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const BulkUpload = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate('/links')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Links
      </button>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Bulk Upload Links</h1>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Drop your CSV file here or click to browse</p>
          <input type="file" accept=".csv" className="hidden" />
          <button className="mt-4 btn-primary">Select CSV File</button>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
