import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Wheeledit. All Rights Reserved.</p>
        <div className="mt-4 md:mt-0">
          <a href="#" className="text-gray-300 hover:text-white ml-6">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white ml-6">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
