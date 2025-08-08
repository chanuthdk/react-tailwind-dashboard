import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

// Component API calls
export const componentAPI = {
  // Get all components
  getComponents: () => api.get('/api/components'),
  
  // Save components
  saveComponents: (data) => api.post('/api/components', data),
  
  // Reset components
  resetComponents: () => api.put('/api/components/reset'),
};

// Upload API calls
export const uploadAPI = {
  // Upload image
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return api.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete image
  deleteImage: (publicId) => api.delete(`/api/upload/image/${publicId}`),
};

export default api;