import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#111827] text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-center sm:text-left">&copy; 2025 Wheeledit. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;