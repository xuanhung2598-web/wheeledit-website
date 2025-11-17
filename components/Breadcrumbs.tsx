import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-[#007BFF] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-700 line-clamp-1" title={item.label}>{item.label}</span>
            )}
            {index < items.length - 1 && <FaChevronRight className="text-gray-400 text-xs" />}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
