import React, { createContext, useContext, useState, useEffect } from 'react';
import { componentAPI } from '../services/api';

const ComponentContext = createContext();

export const useComponentData = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponentData must be used within ComponentProvider');
  }
  return context;
};

export const ComponentProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState({
    title: 'My Awesome Website',
    image: 'https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=LOGO'
  });

  const [navbarData, setNavbarData] = useState({
    links: [
      { text: 'Home', url: '/' },
      { text: 'About Us', url: '/about' },
      { text: 'Contact', url: '/contact' }
    ]
  });

  const [footerData, setFooterData] = useState({
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from backend on mount
  useEffect(() => {
    loadComponentsFromAPI();
  }, []);

  // Also load from localStorage as backup
  useEffect(() => {
    const savedData = localStorage.getItem('componentData');
    if (savedData) {
      try {
        const { header, navbar, footer } = JSON.parse(savedData);
        if (header) setHeaderData(header);
        if (navbar) setNavbarData(navbar);
        if (footer) setFooterData(footer);
      } catch (err) {
        console.error('Error loading from localStorage:', err);
      }
    }
  }, []);

  // Save to localStorage whenever data changes (bonus feature)
  useEffect(() => {
    const dataToSave = {
      header: headerData,
      navbar: navbarData,
      footer: footerData
    };
    localStorage.setItem('componentData', JSON.stringify(dataToSave));
  }, [headerData, navbarData, footerData]);

  // Load components from API
  const loadComponentsFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await componentAPI.getComponents();
      
      if (response.success && response.data) {
        setHeaderData(response.data.header);
        setNavbarData(response.data.navbar);
        setFooterData(response.data.footer);
      }
    } catch (error) {
      console.error('Error loading components:', error);
      setError('Failed to load components from server');
    } finally {
      setLoading(false);
    }
  };

  // Save all components to API
  const saveComponentsToAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dataToSave = {
        header: headerData,
        navbar: navbarData,
        footer: footerData
      };
      
      const response = await componentAPI.saveComponents(dataToSave);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Failed to save components');
      }
    } catch (error) {
      console.error('Error saving components:', error);
      setError(error.message || 'Failed to save components');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset all components
  const resetComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await componentAPI.resetComponents();
      
      if (response.success && response.data) {
        setHeaderData(response.data.header);
        setNavbarData(response.data.navbar);
        setFooterData(response.data.footer);
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Failed to reset components');
      }
    } catch (error) {
      console.error('Error resetting components:', error);
      setError(error.message || 'Failed to reset components');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // Data
    headerData,
    navbarData,
    footerData,
    loading,
    error,
    
    // Setters
    setHeaderData,
    setNavbarData,
    setFooterData,
    
    // API functions
    loadComponentsFromAPI,
    saveComponentsToAPI,
    resetComponents,
  };

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};