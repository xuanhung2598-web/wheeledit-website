import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { marked } from 'marked';

interface BlogPostPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, allPosts }) => {
  const [htmlContent, setHtmlContent] = useState('');
  
  useEffect(() => {
    const parseContent = async () => {
      if (post && post.content) {
        // Configure marked to add breaks on newlines
        marked.setOptions({
          breaks: true,
        });
        const parsedHtml = await marked.parse(post.content);
        setHtmlContent(parsedHtml);
      }
    };
    parseContent();
  }, [post]);

  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 4); // Show 4 other posts
  
  // Format date to be more readable, e.g., "July 26, 2024"
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="pt-28 pb-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Post Content */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-md text-gray-500 mb-6">By {post.author} on {formattedDate}</p>
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            >
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Other Posts</h3>
              <div className="space-y-6">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="flex items-center space-x-4">
                    <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h4 className="font-semibold text-gray-900 hover:text-blue-500 transition-colors">
                        <a href={`#/blog/${relatedPost.id}`} onClick={(e) => { e.preventDefault(); window.location.hash = `/blog/${relatedPost.id}`; }}>
                          {relatedPost.title}
                        </a>
                      </h4>
                      <p className="text-sm text-gray-500">{new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default BlogPostPage;