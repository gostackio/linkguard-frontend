import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon, DocumentTextIcon, XCircleIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { linksAPI } from '../services/api';
import toast from 'react-hot-toast';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv") {
        setFile(file);
      } else {
        toast.error("Please upload a CSV file");
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setFile(file);
    } else {
      toast.error("Please upload a CSV file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setUploading(true);
    try {
      const response = await linksAPI.bulkUpload(file);
      setResults(response.data);
      toast.success(`Successfully uploaded ${response.data.success} links`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload links');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "url,title,page\nhttps://example.com/product,Product Name,Page Name";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate('/links')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Links
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Bulk Upload Links</h1>
        
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />

            <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              {file ? file.name : 'Drop your CSV file here, or'}
            </p>
            {!file && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm text-primary-600 hover:text-primary-500"
              >
                browse to upload
              </button>
            )}
            <p className="mt-1 text-xs text-gray-500">CSV files only, max 1000 links</p>
          </div>

          {file && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={downloadTemplate}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Download template CSV
            </button>

            <div className="space-x-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
                className="btn-primary"
              >
                {uploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  'Upload Links'
                )}
              </button>
            </div>
          </div>
        </div>

        {results && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Results</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {results.success} links uploaded successfully
                  </p>
                </div>
              </div>

              {results.failed > 0 && (
                <div className="flex items-center space-x-3">
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {results.failed} links failed to upload
                    </p>
                    <div className="mt-2 max-h-40 overflow-y-auto">
                      {results.details.failed.map((failure, index) => (
                        <div key={index} className="text-xs text-red-600 mt-1">
                          Row {index + 1}: {failure.error}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkUpload;
