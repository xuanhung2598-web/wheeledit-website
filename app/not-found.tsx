
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <h1 className="text-9xl font-black text-[#007BFF]">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="bg-[#007BFF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0056b3] transition-all inline-block shadow-lg"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
