'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Post } from '../types';
import BlogList from './BlogList';
import AnimateOnScroll from './AnimateOnScroll';
import Pagination from './Pagination';
import { FaSearch } from 'react-icons/fa';

const POSTS_PER_PAGE = 6;

interface BlogPageClientProps {
  posts: Post[];
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ posts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const filteredPosts = query
    ? posts.filter(post => 
        post.meta.title.toLowerCase().includes(query) ||
        post.meta.excerpt.toLowerCase().includes(query) ||
        post.meta.tags.some(tag => tag.toLowerCase().includes(query))
      )
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    // Reset to page 1 for new search
    params.set('page', '1');
    router.push(`/blog?${params.toString()}`);
  };
  
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/blog?${params.toString()}`;
  };
  
  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <AnimateOnScroll>
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800">Our Blog</h1>
            <p className="text-xl text-gray-600 mt-4">Insights, tips, and stories from our team.</p>
          </header>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-16 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              aria-label="Search blog posts"
            />
            <button type="submit" aria-label="Submit search" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#007BFF] text-white p-2.5 rounded-full hover:bg-[#0056b3] transition-colors">
              <FaSearch />
            </button>
          </form>
        </AnimateOnScroll>
        
        {filteredPosts.length > 0 ? (
          <BlogList posts={currentPosts} />
        ) : (
          <AnimateOnScroll>
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-700">No Posts Found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search query to find what you're looking for.</p>
            </div>
          </AnimateOnScroll>
        )}
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            createPageUrl={createPageUrl}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPageClient;