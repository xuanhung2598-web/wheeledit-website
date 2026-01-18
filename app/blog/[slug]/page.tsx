
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import type { Metadata } from 'next';
import AnimateOnScroll from '../../../components/AnimateOnScroll';
import { notFound } from 'next/navigation';
import CtaSection from '../../../components/CtaSection';
import Breadcrumbs from '../../../components/Breadcrumbs';
import AuthorBio from '../../../components/AuthorBio';
import { authors } from '../../../lib/authors';
import SocialShare from '../../../components/SocialShare';
import TableOfContents from '../../../components/TableOfContents';
import BlogSidebar from '../../../components/BlogSidebar';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  const url = `/blog/${post.meta.slug}`;

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url: url,
      type: 'article',
      images: [{ url: post.meta.image }],
    },
  };
}

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const recommendedPosts = allPosts.filter(p => p.meta.slug !== slug).slice(0, 4);
  const authorDetails = authors[post.meta.author];
  
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { label: post.meta.title },
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid lg:grid-cols-3 lg:gap-x-12">
            <main className="lg:col-span-2">
              <AnimateOnScroll>
                <article className="prose prose-blue lg:prose-xl max-w-none">
                  <header className="mb-12 text-center border-b pb-8 not-prose">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{post.meta.title}</h1>
                    <p className="text-lg text-gray-500 mt-4">Posted on {post.meta.date} by {post.meta.author}</p>
                  </header>
                  
                  <div className="not-prose mb-12">
                    <Image 
                      src={post.meta.image} 
                      alt={post.meta.title} 
                      width={800} 
                      height={400} 
                      priority
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                  
                  <TableOfContents content={post.content} />

                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                  >
                    {post.content}
                  </ReactMarkdown>
                </article>
              </AnimateOnScroll>
              
              <SocialShare title={post.meta.title} url={`https://wheeledit.com/blog/${slug}`} />
              {authorDetails && <AuthorBio author={authorDetails} />}
              <CtaSection />
            </main>
            <aside className="lg:col-span-1 mt-12 lg:mt-0">
               <BlogSidebar posts={recommendedPosts} />
            </aside>
          </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
