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
    title: 'React Tailwind Dashboard',
    image: 'https://placehold.co/80x80/4F46E5/FFFFFF?text=LOGO'
  });

  const [navbarData, setNavbarData] = useState({
    links: [
      { text: 'Home', url: '/' },
      { text: 'About Us', url: '/about' },
      { text: 'Contact', url: '/contact' }
    ]
  });

  const [footerData, setFooterData] = useState({
    email: 'chauthdk@gmail.com',
    phone: '+94 76 040 8896',
    address: '123 Street, City, Province'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //load data from backend on mount
  useEffect(() => {
    loadComponentsFromAPI();
  }, []);

  //also load from localStorage as backup
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

  //save to localStorage
  useEffect(() => {
    const dataToSave = {
      header: headerData,
      navbar: navbarData,
      footer: footerData
    };
    localStorage.setItem('componentData', JSON.stringify(dataToSave));
  }, [headerData, navbarData, footerData]);

  //load components from API
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

  //save components to API
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

  //reset all components
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
    //data
    headerData,
    navbarData,
    footerData,
    loading,
    error,
    
    //setters
    setHeaderData,
    setNavbarData,
    setFooterData,

    //API functions
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