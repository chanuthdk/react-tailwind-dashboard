import React, { useState } from 'react';
import { ComponentProvider } from './context/ComponentContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('website'); // 'website' or 'dashboard'

  const toggleView = () => {
    setCurrentView(prev => prev === 'website' ? 'dashboard' : 'website');
  };

  return (
    <ComponentProvider>
      <div className="min-h-screen bg-gray-50">
        {/* View Toggle Button */}
        <button
          onClick={toggleView}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
        >
          {currentView === 'website' ? '⚙️ Open Dashboard' : '🌐 View Website'}
        </button>

        {currentView === 'website' ? (
          // Website View
          <div>
            <Header />
            <Navbar />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-12">
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-gray-800 mb-6">
                      Welcome to Our Platform
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      This is a dynamic website built with React, Tailwind CSS, and powered by a Node.js backend. 
                      The header, navigation, and footer are all editable through our dashboard interface.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Dynamic Editing</h3>
                      <p className="text-gray-600">Edit website content in real-time without page refresh</p>
                    </div>
                    
                    <div className="text-center p-6 rounded-xl bg-green-50 border border-green-200">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">☁️</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Cloud Storage</h3>
                      <p className="text-gray-600">Images uploaded to Cloudinary with automatic optimization</p>
                    </div>
                    
                    <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-200">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💾</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Auto Save</h3>
                      <p className="text-gray-600">Changes saved to localStorage and backend database</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={toggleView}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg"
                    >
                      🎨 Try the Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </main>
            
            <Footer />
          </div>
        ) : (
          // Dashboard View
          <Dashboard />
        )}
      </div>
    </ComponentProvider>
  );
}

export default App;