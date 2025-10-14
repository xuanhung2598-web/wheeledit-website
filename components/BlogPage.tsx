import React from 'react';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '../types';

// Pagination component defined within the same file
const Pagination: React.FC<{ totalPages: number; currentPage: number }> = ({ totalPages, currentPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (page < 1 || page > totalPages) return;
    window.location.hash = page === 1 ? '/blog' : `/blog/page/${page}`;
  };

  return (
    <nav aria-label="Blog post pagination" className="mt-16 flex justify-center">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <a
            href={currentPage > 1 ? `#/blog/page/${currentPage - 1}` : '#'}
            onClick={(e) => handleNav(e, currentPage - 1)}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="sr-only">Previous</span>
            <i className="fas fa-chevron-left"></i>
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              href={number === 1 ? '#/blog' : `#/blog/page/${number}`}
              onClick={(e) => handleNav(e, number)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${number === currentPage ? 'z-10 text-blue-600 border-blue-300 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'}`}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            href={currentPage < totalPages ? `#/blog/page/${currentPage + 1}` : '#'}
            onClick={(e) => handleNav(e, currentPage + 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="sr-only">Next</span>
            <i className="fas fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};


interface BlogPageProps {
  posts: BlogPost[];
  currentPage: number;
}

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC<BlogPageProps> = ({ posts, currentPage }) => {
  // Pagination logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="pt-28 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Our Blog</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                Tips, trends, and insights from the world of real estate photography and editing.
            </p>
        </div>

        {currentPosts.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
        ) : (
            <p className="text-center text-gray-600 text-lg">No posts found on this page.</p>
        )}
       
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default BlogPage;
