import React, { Suspense } from 'react';
import { getAllPosts } from '../../lib/posts';
import BlogPageClient from '../../components/BlogPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Tips, Trends & Insights',
  description: 'Explore our blog for the latest tips, trends, and insights in real estate photography and photo editing. Improve your listings with expert advice from the WheelEdit team.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | WheelEdit - Tips, Trends & Insights',
    description: 'Explore our blog for the latest tips, trends, and insights in real estate photography and photo editing.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | WheelEdit - Tips, Trends & Insights',
    description: 'Explore our blog for the latest tips, trends, and insights in real estate photography and photo editing.',
  },
};

const BlogPageSkeleton = () => (
  <div className="bg-gray-50 pt-32 pb-20">
    <div className="max-w-6xl mx-auto px-5">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-xl text-gray-600 mt-4">Insights, tips, and stories from our team.</p>
      </header>
      <div className="max-w-lg mx-auto mb-16 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const BlogPage = () => {
  const allPosts = getAllPosts();
  
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageClient posts={allPosts} />
    </Suspense>
  );
};

export default BlogPage;