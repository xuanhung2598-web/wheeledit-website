'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';
import AnimateOnScroll from './AnimateOnScroll';

interface RecommendedPostsProps {
  posts: Post[];
}

const RecommendedPosts: React.FC<RecommendedPostsProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-20 py-16 border-t border-gray-200">
            <AnimateOnScroll>
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
                        Continue Reading
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
                    </h2>
                </div>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((recPost, index) => (
                    <AnimateOnScroll key={recPost.meta.slug} delay={index * 0.1}>
                        <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
                             <Link href={`/blog/${recPost.meta.slug}`} aria-label={`Read more about ${recPost.meta.title}`}>
                               <Image 
                                 src={recPost.meta.image} 
                                 alt={recPost.meta.title} 
                                 width={400} 
                                 height={200} 
                                 className="w-full h-40 object-cover"
                                 sizes="(max-width: 768px) 100vw, 33vw"
                               />
                             </Link>
                             <div className="p-5 flex flex-col flex-grow">
                                <Link href={`/blog/${recPost.meta.slug}`}>
                                    <h4 className="font-bold text-gray-800 leading-tight group-hover:text-[#007BFF] transition-colors line-clamp-2">{recPost.meta.title}</h4>
                                </Link>
                                <p className="text-sm text-gray-600 mt-2 flex-grow line-clamp-3">{recPost.meta.excerpt}</p>
                                <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                                  <span>{recPost.meta.date}</span>
                                </div>
                             </div>
                        </div>
                    </AnimateOnScroll>
                ))}
            </div>
        </section>
    );
};

export default RecommendedPosts;