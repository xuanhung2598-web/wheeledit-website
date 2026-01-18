
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';
import AnimateOnScroll from './AnimateOnScroll';

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <AnimateOnScroll key={post.meta.slug} delay={index * 0.1}>
          <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
            <Link 
              href={`/blog/${post.meta.slug}/`} 
              prefetch={false} 
              aria-label={`Read more about ${post.meta.title}`}
            >
              <Image 
                src={post.meta.image} 
                alt={post.meta.title} 
                width={800} 
                height={400} 
                className="w-full h-48 object-cover" 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <Link href={`/blog/${post.meta.slug}/`} prefetch={false}>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#007BFF] transition-colors duration-300">
                  {post.meta.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.meta.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.meta.tags.map(tag => (
                  <Link 
                    href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}/`}
                    key={tag} 
                    prefetch={false}
                    className="bg-blue-100 text-[#007BFF] text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-blue-200 transition-colors z-10"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-auto flex justify-between items-center">
                <span>{post.meta.date}</span>
                <span className="font-medium text-[#007BFF]">Read More →</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
};

export default BlogList;
