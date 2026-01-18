
'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaExclamationTriangle, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5 pt-20">
      <div className="text-center max-w-lg">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full text-red-500">
          <FaExclamationTriangle className="text-5xl" />
        </div>
        <h1 className="text-9xl font-black text-gray-200 leading-none">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 -mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-10 text-lg">
          We couldn't find the page you're looking for. It might have been moved, deleted, or you might have a typo in the URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0056b3] transition-all shadow-lg hover:-translate-y-1"
          >
            <FaHome /> Go to Homepage
          </Link>
          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
          >
            <FaSearch /> Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
