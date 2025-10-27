'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Post } from '../types';
import BlogList from './BlogList';
import Pagination from './Pagination';

const POSTS_PER_PAGE = 6;

interface TagPageClientProps {
  posts: Post[];
  tagSlug: string;
}

const TagPageClient: React.FC<TagPageClientProps> = ({ posts, tagSlug }) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const createPageUrl = (page: number) => `/blog/tag/${tagSlug}?page=${page}`;
  
  return (
    <>
      <BlogList posts={currentPosts} />
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          createPageUrl={createPageUrl}
        />
      )}
    </>
  );
};

export default TagPageClient;
