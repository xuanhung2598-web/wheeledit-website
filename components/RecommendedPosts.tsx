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
  return (
    <aside className="lg:col-span-4 mt-16 lg:mt-0">
      <div className="sticky top-28">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Recommended Reads</h3>
        <div className="space-y-6">
          {posts.map((recPost, index) => (
            <AnimateOnScroll key={recPost.meta.slug} delay={index * 0.1}>
              <Link href={`/blog/${recPost.meta.slug}`} className="group flex items-center gap-4">
                <Image src={recPost.meta.image} alt={recPost.meta.title} width={96} height={80} className="w-24 h-20 object-cover rounded-md flex-shrink-0"/>
                <div>
                  <h4 className="font-bold text-gray-800 leading-tight group-hover:text-[#007BFF] transition-colors">{recPost.meta.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{recPost.meta.date}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RecommendedPosts;
