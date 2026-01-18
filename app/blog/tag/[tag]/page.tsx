
import React, { Suspense } from 'react';
import Link from 'next/link';
// Sửa đường dẫn import: app/blog/tag/[tag]/page.tsx -> root là 4 cấp
import { getAllPosts, getAllTags } from '../../../../lib/posts';
import AnimateOnScroll from '../../../../components/AnimateOnScroll';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TagPageClient from '../../../../components/TagPageClient';

export const revalidate = 3600;
export const dynamicParams = false;

const slugify = (tag: string) => tag.toLowerCase().replace(/ /g, '-');
const unslugify = (slug: string) => slug.replace(/-/g, ' ');

export async function generateStaticParams() {
  const tags = getAllTags();
  console.log(`Generating tag pages for: ${tags.join(', ')}`);
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
      canonical: `/blog/tag/${params.tag}/`,
    },
  };
}

const TagPage = ({ params }: { params: { tag: string } }) => {
  const tagName = unslugify(params.tag);
  const posts = getAllPosts().filter(post => 
    post.meta.tags.some(t => t.toLowerCase() === tagName.toLowerCase())
  );

  if (posts.length === 0) {
    notFound();
  }
  
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  
  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <AnimateOnScroll>
          <header className="text-center mb-16 border-b pb-8">
            <p className="text-lg text-gray-500">Showing posts tagged with</p>
            <h1 className="text-5xl font-bold text-gray-800 capitalize mt-2">{capitalizedTagName}</h1>
            <div className="mt-6">
                <Link href="/blog/" className="text-[#007BFF] hover:underline">&larr; Back to all posts</Link>
            </div>
          </header>
        </AnimateOnScroll>
        
        <Suspense fallback={<div className="text-center py-20">Loading posts...</div>}>
          <TagPageClient posts={posts} tagSlug={params.tag} />
        </Suspense>
      </div>
    </div>
  );
};

export default TagPage;
