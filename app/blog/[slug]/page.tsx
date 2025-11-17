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

export const revalidate = 3600; // Revalidate at most every hour

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
  const lastUpdated = post.meta.updated || post.meta.date;

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
      modifiedTime: lastUpdated,
      authors: [post.meta.author],
      tags: post.meta.tags,
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
  const recommendedPosts = allPosts.filter(p => p.meta.slug !== slug).slice(0, 4);
  
  // SEO & UX Enhancements
  const wordsPerMinute = 200;
  const words = post.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  const authorDetails = authors[post.meta.author];
  const lastUpdated = post.meta.updated || post.meta.date;
  
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { label: post.meta.title },
  ];

  const blogPostUrl = `https://wheeledit.com/blog/${slug}`;

  const blogPostJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogPostUrl
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
    dateModified: lastUpdated,
    description: post.meta.excerpt,
    wordCount: words,
    timeRequired: `PT${readingTime}M`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href ? `https://wheeledit.com${item.href}` : blogPostUrl
    }))
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        key="blogpost-jsonld"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        key="breadcrumb-jsonld"
      />
      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="grid lg:grid-cols-3 lg:gap-x-12">
              {/* Main Content Column */}
              <main className="lg:col-span-2">
                <AnimateOnScroll>
                  <article>
                    <header className="mb-12 text-center border-b pb-8">
                      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{post.meta.title}</h1>
                      <p className="text-lg text-gray-500 mt-4">
                        {post.meta.updated && post.meta.updated !== post.meta.date 
                          ? `Updated on ${lastUpdated}` 
                          : `Posted on ${post.meta.date}`
                        } by {post.meta.author} &bull; {readingTime} min read
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
                    
                    <TableOfContents content={post.content} />

                    <div className="prose lg:prose-xl max-w-none">
                       <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                        >
                          {post.content}
                       </ReactMarkdown>
                    </div>
                  </article>
                </AnimateOnScroll>
                
                <SocialShare title={post.meta.title} url={blogPostUrl} />

                {authorDetails && <AuthorBio author={authorDetails} />}
                
                <CtaSection />
              </main>

              {/* Sidebar Column */}
              <aside className="lg:col-span-1 mt-12 lg:mt-0">
                 <BlogSidebar posts={recommendedPosts} />
              </aside>
            </div>
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
          scroll-margin-top: 100px; /* Offset for sticky header */
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
          font-style: italic;
          padding: 1em 1.5em;
          background-color: #F9FAFB;
          border-left-width: 4px;
          border-radius: 0 8px 8px 0;
          position: relative;
          overflow: hidden;
        }
        .prose blockquote::before {
          content: '“';
          font-family: Georgia, serif;
          font-size: 4em;
          color: rgba(0, 123, 255, 0.15);
          position: absolute;
          left: 0.1em;
          top: -0.1em;
          z-index: 0;
        }
        .prose blockquote > * {
          position: relative;
          z-index: 1;
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