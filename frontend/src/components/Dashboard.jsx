import React, { useState, useRef } from 'react';
import { useComponentData } from '../context/ComponentContext';
import { uploadAPI } from '../services/api';

const Dashboard = () => {
  const {
    headerData,
    navbarData,
    footerData,
    setHeaderData,
    setNavbarData,
    setFooterData,
    saveComponentsToAPI,
    resetComponents,
    loading
  } = useComponentData();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const fileInputRef = useRef(null);

  //image preview before upload
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //show preview
    handleImagePreview(e);

    setIsUploading(true);
    setUploadProgress(0);
    setSaveStatus('');

    //upload simulation
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const response = await uploadAPI.uploadImage(file);
      
      if (response.success) {
        setHeaderData({ ...headerData, image: response.data.imageUrl });
        setUploadProgress(100);
        setSaveStatus('Image uploaded successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setSaveStatus('Upload failed. Please try again.');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setPreviewImage(null);
      }, 1000);
    }
  };

  //navbar link change handler
  const handleNavbarChange = (index, field, value) => {
    const updatedLinks = [...navbarData.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setNavbarData({ ...navbarData, links: updatedLinks });
  };

  //save components data
  const handleSaveAll = async () => {
    setSaveStatus('Saving...');
    const result = await saveComponentsToAPI();
    
    if (result.success) {
      setSaveStatus('All changes saved successfully!');
    } else {
      setSaveStatus('Failed to save changes: ' + result.message);
    }
    
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Reset all data
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all components to default values?')) {
      setSaveStatus('Resetting...');
      const result = await resetComponents();
      
      if (result.success) {
        setSaveStatus('Components reset successfully!');
      } else {
        setSaveStatus('Failed to reset components: ' + result.message);
      }
      
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">{/*dashboard header*/}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6">
            <h1 className="text-4xl font-bold">Website Dashboard</h1>
            {saveStatus && (
              <div className="mt-3 text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                {saveStatus}
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8"> {/*header settings*/}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 shadow-lg">1</span>
                  Header Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Website Title</label>
                    <input
                      type="text"
                      value={headerData.title}
                      onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your website title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Logo Image</label>
                    <div className="space-y-4">{/*current image preview*/}
                      <div className="flex items-center space-x-4">
                        <img
                          src={previewImage || headerData.image}
                          alt="Logo Preview"
                          className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/80x80/4F46E5/FFFFFF?text=LOGO';
                          }}
                        />
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Current Logo</p>
                          <p className="text-xs">Click below to change</p>
                        </div>
                      </div>
                      
                      {/*upload area*/}
                      <div
                        className={`
                          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300
                          ${isUploading 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }
                        `}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          disabled={isUploading}
                        />
                        
                        {isUploading ? (
                          <div className="space-y-3">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-blue-600 font-medium">Uploading... {uploadProgress}%</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <svg className="w-10 h-10 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-gray-600 font-medium">Click to upload new logo</p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*navbar settings*/}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 shadow-lg">2</span>
                  Navigation Settings
                </h2>
                
                <div className="space-y-4">
                  {navbarData.links.map((link, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-700 mb-3">Navigation Link {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Link Text</label>
                          <input
                            type="text"
                            value={link.text}
                            onChange={(e) => handleNavbarChange(index, 'text', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="e.g., Home"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Link URL</label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleNavbarChange(index, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="e.g., /"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*footer settings*/}
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 shadow-lg">3</span>
                Footer Settings
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={footerData.email}
                    onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="contact@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={footerData.phone}
                    onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Address</label>
                  <input
                    type="text"
                    value={footerData.address}
                    onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 flex justify-end items-center">
              <div className="flex space-x-4" >
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Reset All'}
                </button>
                
                <button
                  onClick={handleSaveAll}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save to Server'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;