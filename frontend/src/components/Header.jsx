import React from 'react';
import { useComponentData } from '../context/ComponentContext';

const Header = () => {
  const { headerData } = useComponentData();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={headerData.image}
                alt="Logo"
                className="w-20 h-20 rounded-lg shadow-xl object-cover border-2 border-white/20 hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/80x80/4F46E5/FFFFFF?text=LOGO';
                }}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {headerData.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;