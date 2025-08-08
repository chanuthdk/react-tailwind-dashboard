import React, { useState } from 'react';
import { useComponentData } from '../context/ComponentContext';

const Navbar = () => {
  const { navbarData } = useComponentData();
  const [activeLink, setActiveLink] = useState(0);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-8">
            {navbarData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                onClick={() => setActiveLink(index)}
                className={`
                  font-medium transition-all duration-300 px-4 py-2 rounded-lg
                  ${activeLink === index 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }
                `}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;