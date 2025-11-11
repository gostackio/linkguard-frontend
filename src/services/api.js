import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
};

// Links endpoints
export const linksAPI = {
  getAll: (params) => api.get('/links', { params }),
  getOne: (id) => api.get(`/links/${id}`),
  create: (data) => api.post('/links', data),
  update: (id, data) => api.put(`/links/${id}`, data),
  delete: (id) => api.delete(`/links/${id}`),
  bulkUpload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/links/bulk-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  checkStatus: (id) => api.post(`/links/${id}/check`),
  checkAll: () => api.post('/links/check-all'),
  export: (format) => api.get(`/links/export?format=${format}`, { responseType: 'blob' }),
};

// Alerts endpoints
export const alertsAPI = {
  getAll: (params) => api.get('/alerts', { params }),
  markAsRead: (id) => api.put(`/alerts/${id}/read`),
  markAllAsRead: () => api.put('/alerts/read-all'),
  delete: (id) => api.delete(`/alerts/${id}`),
  getSettings: () => api.get('/alerts/settings'),
  updateSettings: (data) => api.put('/alerts/settings', data),
};

// Dashboard/Analytics endpoints
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getLinkStats: (id) => api.get(`/analytics/links/${id}`),
  getRevenueImpact: (period) => api.get(`/analytics/revenue-impact?period=${period}`),
  getBrokenLinksHistory: (days = 30) => api.get(`/analytics/broken-links?days=${days}`),
};

// Subscription endpoints
export const subscriptionAPI = {
  getPlans: () => api.get('/subscription/plans'),
  getCurrentPlan: () => api.get('/subscription/current'),
  createCheckoutSession: (planId) => api.post('/subscription/checkout', { planId }),
  cancelSubscription: () => api.post('/subscription/cancel'),
  getInvoices: () => api.get('/subscription/invoices'),
};

// AI endpoints
export const aiAPI = {
  suggestReplacement: (linkId) => api.post(`/ai/suggest-replacement/${linkId}`),
  autoFix: (linkId, suggestionId) => api.post(`/ai/auto-fix/${linkId}`, { suggestionId }),
  bulkSuggest: (linkIds) => api.post('/ai/bulk-suggest', { linkIds }),
};

export default api;
