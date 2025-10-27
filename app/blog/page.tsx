import React from 'react';
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


const BlogPage = () => {
  const allPosts = getAllPosts();
  
  return (
    <BlogPageClient posts={allPosts} />
  );
};

export default BlogPage;