import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.location.hash = `/blog/${post.id}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <a href={`#/blog/${post.id}`} onClick={handleNav}>
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
      </a>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 h-14 overflow-hidden">
            <a href={`#/blog/${post.id}`} onClick={handleNav} className="hover:text-blue-500 transition-colors">{post.title}</a>
        </h3>
        <p className="text-sm text-gray-500 mb-4">By {post.author} on {post.date}</p>
        <p className="text-gray-600 mb-6 h-24 overflow-hidden flex-grow">{post.excerpt}</p>
        <a
          href={`#/blog/${post.id}`}
          onClick={handleNav}
          className="text-blue-500 font-semibold hover:text-blue-400 transition-colors mt-auto"
        >
          Read More <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
};

export default BlogPostCard;