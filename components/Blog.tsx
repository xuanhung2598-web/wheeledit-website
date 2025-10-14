import React from 'react';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '../types';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  // Show only the 3 most recent posts for the homepage preview
  const postsToShow = posts.slice(0, 3);

  return (
    // FIX: Changed section ID to 'blog-preview' to avoid routing conflicts.
    <section id="blog-preview" className="section-padding bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="section-title">From Our Blog</h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg text-gray-600">
          Tips, trends, and insights from the world of real estate photography and editing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
            <a href="#/blog" onClick={(e) => { e.preventDefault(); window.location.hash = '/blog'; }} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
                View All Posts
            </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
