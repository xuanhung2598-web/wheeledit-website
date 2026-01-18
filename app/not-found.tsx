
'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaExclamationTriangle, FaImages } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5 pt-20">
      <div className="text-center max-w-lg">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full text-[#007BFF]">
          <FaExclamationTriangle className="text-5xl" />
        </div>
        <h1 className="text-9xl font-black text-gray-200 leading-none">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 -mt-8 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-10 text-lg">
          The page you are looking for might have been moved or doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0056b3] transition-all shadow-lg hover:-translate-y-1"
          >
            <FaHome /> Back to Home
          </Link>
          <Link 
            href="/#services" 
            className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
          >
            <FaImages /> View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
