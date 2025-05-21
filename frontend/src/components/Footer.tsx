import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-auto w-full">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm">
          Made with <FaHeart className="inline text-black-500 mx-1" /> by rickcoderdev@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;