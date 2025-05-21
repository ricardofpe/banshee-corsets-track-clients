import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import logo from '/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="bg-blue-500 text-white py-1 text-sm">
        <div className="container mx-auto flex items-center justify-end px-4">
          <a href="https://www.bansheecorsets.com.br" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center font-bold">
            <FaGlobe className="mr-1" />
            www.bansheecorsets.com.br
          </a>
        </div>
      </div>

      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-2" />
        </div>

      </div>
    </header>
  );
};

export default Header;