'use client';

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  level: number;
  text: string;
  slug: string;
}

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    // remove any HTML tags
    .replace(/<[^>]*>/g, '')
    // remove special characters except word chars, spaces, and hyphens
    .replace(/[^\w\s-]/g, '')
    .trim()
    // replace spaces with hyphens
    .replace(/\s+/g, '-')
    // replace multiple hyphens with a single one
    .replace(/-+/g, '-');
};


const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const headingRegex = /^(##|###)\s(.+)/gm;
  const matches = Array.from(content.matchAll(headingRegex));
  
  const headings: Heading[] = matches.map(match => {
    const level = match[1].length; // ## -> 2, ### -> 3
    let text = match[2].trim();
    
    // FIX: Strip markdown link syntax, keeping only the link text.
    // e.g., "[Tips](/some-url)" becomes "Tips"
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const slug = createSlug(text);
    return { level, text, slug };
  });

  if (headings.length === 0) {
    return null;
  }

  return (
    <AnimateOnScroll className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
                {headings.map(heading => (
                    <li key={heading.slug} style={{ marginLeft: heading.level === 3 ? '1.5rem' : '0' }}>
                        <a 
                            href={`#${heading.slug}`} 
                            className="text-gray-600 hover:text-[#007BFF] transition-colors hover:underline"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </AnimateOnScroll>
  );
};

export default TableOfContents;