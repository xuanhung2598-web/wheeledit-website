'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    createPageUrl: (page: number) => string;
}

const getPaginationRange = (currentPage: number, totalPages: number): (number | '...')[] => {
    const delta = 1; // Number of pages to show around the current page
    const range: (number | '...')[] = [];

    // Trivial case
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first page
    range.push(1);

    // Ellipsis after first page?
    if (currentPage > delta + 2) {
        range.push('...');
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
    }

    // Ellipsis before last page?
    if (currentPage < totalPages - (delta + 1)) {
        range.push('...');
    }

    // Always show last page
    range.push(totalPages);

    return range;
};


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, createPageUrl }) => {
    const pageNumbers = getPaginationRange(currentPage, totalPages);

    return (
        <nav aria-label="Blog post navigation" className="flex justify-center items-center gap-2 md:gap-4 mt-16">
            <Link
              href={createPageUrl(currentPage - 1)}
              className={`px-4 py-2 border rounded-lg transition-colors text-sm md:text-base ${ currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-white hover:bg-gray-50' }`}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
            >
              &larr; Previous
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
                {pageNumbers.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">...</span>
                    ) : (
                    <Link
                        key={page}
                        href={createPageUrl(page)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors ${ currentPage === page ? 'bg-[#007BFF] text-white border-[#007BFF]' : 'bg-white hover:bg-gray-50' }`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </Link>
                    )
                ))}
            </div>
            
            <div className="md:hidden">
              <span className="px-4 py-2 text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>


            <Link
              href={createPageUrl(currentPage + 1)}
              className={`px-4 py-2 border rounded-lg transition-colors text-sm md:text-base ${ currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-white hover:bg-gray-50' }`}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
            >
              Next &rarr;
            </Link>
        </nav>
    );
}

export default Pagination;