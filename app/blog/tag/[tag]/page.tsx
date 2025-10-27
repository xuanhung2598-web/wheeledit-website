import React from 'react';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '../../../../lib/posts';
import BlogList from '../../../../components/BlogList';
import AnimateOnScroll from '../../../../components/AnimateOnScroll';
import Pagination from '../../../../components/Pagination';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Utility function to convert a tag name into a URL-friendly slug
const slugify = (tag: string) => tag.toLowerCase().replace(/ /g, '-');
// Utility function to convert a slug back into a readable tag name
const unslugify = (slug: string) => slug.replace(/-/g, ' ');

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({
    tag: slugify(tag),
  }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tagName = unslugify(params.tag);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  return {
    title: `Posts Tagged With "${capitalizedTagName}"`,
    description: `Browse all articles and posts tagged with "${capitalizedTagName}" on the WheelEdit blog.`,
    alternates: {
      canonical: `/blog/tag/${params.tag}`,
    },
  };
}

const POSTS_PER_PAGE = 6;

const TagPage = ({ params, searchParams }: { params: { tag: string }; searchParams?: { page?: string } }) => {
  const tagName = unslugify(params.tag);
  const posts = getAllPosts().filter(post => 
    post.meta.tags.some(t => t.toLowerCase() === tagName.toLowerCase())
  );

  if (posts.length === 0) {
    notFound();
  }

  const currentPage = parseInt(searchParams?.page || '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  
  const createPageUrl = (page: number) => `/blog/tag/${params.tag}?page=${page}`;

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <AnimateOnScroll>
          <header className="text-center mb-16 border-b pb-8">
            <p className="text-lg text-gray-500">Showing posts tagged with</p>
            <h1 className="text-5xl font-bold text-gray-800 capitalize mt-2">{capitalizedTagName}</h1>
            <div className="mt-6">
                <Link href="/blog" className="text-[#007BFF] hover:underline">&larr; Back to all posts</Link>
            </div>
          </header>
        </AnimateOnScroll>
        
        <BlogList posts={currentPosts} />
        
        {totalPages > 1 && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                createPageUrl={createPageUrl}
            />
        )}
      </div>
    </div>
  );
};

export default TagPage;