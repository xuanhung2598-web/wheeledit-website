


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import type { Metadata } from 'next';
import RecommendedPosts from '../../../components/RecommendedPosts';
import AnimateOnScroll from '../../../components/AnimateOnScroll';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  const url = `/blog/${post.meta.slug}`;

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url: url,
      siteName: 'WheelEdit',
      images: [
        {
          url: post.meta.image,
          width: 800,
          height: 400,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [post.meta.image],
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
  const recommendedPosts = allPosts.filter(p => p.meta.slug !== slug).slice(0, 3);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wheeledit.com/blog/${slug}`
    },
    headline: post.meta.title,
    image: post.meta.image,
    author: {
      '@type': 'Person',
      name: post.meta.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wheeledit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wheeledit.com/logo.png',
      },
    },
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    description: post.meta.excerpt,
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-x-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimateOnScroll>
              <article>
                <header className="mb-12 text-center border-b pb-8">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{post.meta.title}</h1>
                  <p className="text-lg text-gray-500 mt-4">
                    Posted on {post.meta.date} by {post.meta.author}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {post.meta.tags.map(tag => (
                      <Link 
                        href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                        key={tag} 
                        className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </header>
                
                <Image 
                  src={post.meta.image} 
                  alt={post.meta.title} 
                  width={800} 
                  height={400} 
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-12 shadow-lg"
                />

                <div className="prose lg:prose-xl max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </article>
            </AnimateOnScroll>
          </div>

          {/* Sidebar */}
          <RecommendedPosts posts={recommendedPosts} />

        </div>
      </div>
      <style>{`
        .prose {
          color: #374151;
          line-height: 1.75;
        }
        .prose h1, .prose h2, .prose h3 {
          color: #111827;
          font-weight: 700;
        }
        .prose a {
          color: #007BFF;
          text-decoration: none;
        }
        .prose a:hover {
          text-decoration: underline;
        }
        .prose blockquote {
          border-left-color: #007BFF;
          color: #4B5563;
        }
        .prose code {
          background-color: #F3F4F6;
          padding: 0.2em 0.4em;
          border-radius: 6px;
          color: #1F2937;
        }
        .prose pre {
          background-color: #1F2937;
          color: #D1D5DB;
        }
        .prose img {
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;