import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // --- SEO META TAGS ---
    document.title = "Blog | Wheeledit - Real Estate Photo Editing Tips & Insights";

    const metaDescription = document.querySelector("meta[name='description']");
    const ogTitle = document.querySelector("meta[property='og:title']");
    const ogDesc = document.querySelector("meta[property='og:description']");
    const ogUrl = document.querySelector("meta[property='og:url']");
    const twitterTitle = document.querySelector("meta[name='twitter:title']");
    const twitterDesc = document.querySelector("meta[name='twitter:description']");
    const canonical = document.querySelector("link[rel='canonical']");

    if (metaDescription) metaDescription.setAttribute("content", "Explore professional real estate photo editing tips, HDR, and virtual staging insights from Wheeledit experts.");
    if (ogTitle) ogTitle.setAttribute("content", "Wheeledit Blog - Professional Real Estate Photo Editing Insights");
    if (ogDesc) ogDesc.setAttribute("content", "Expert articles and tutorials on real estate photography, editing, and marketing visuals.");
    if (ogUrl) ogUrl.setAttribute("content", "https://wheeledit-website.pages.dev/#/blog");
    if (twitterTitle) twitterTitle.setAttribute("content", "Wheeledit Blog");
    if (twitterDesc) twitterDesc.setAttribute("content", "Discover expert insights and practical guides for professional real estate photo editing.");
    if (canonical) canonical.setAttribute("href", "https://wheeledit-website.pages.dev/#/blog");

    // --- FETCH POSTS ---
    const fetchPosts = async () => {
      try {
        const res = await fetch('/data/blog.json');
        if (!res.ok) throw new Error('Failed to load blog posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // --- GENERATE SCHEMA JSON-LD ---
  useEffect(() => {
    if (posts.length === 0) return;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Wheeledit Blog",
      "url": "https://wheeledit-website.pages.dev/#/blog",
      "description": "Professional insights and tutorials on real estate photo editing, HDR, and virtual staging.",
      "publisher": {
        "@type": "Organization",
        "name": "Wheeledit",
        "url": "https://wheeledit-website.pages.dev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://live.staticflickr.com/65535/54825341494_7909ee13f4_b.jpg"
        }
      },
      "blogPost": posts.slice(0, 6).map((p) => ({
        "@type": "BlogPosting",
        "headline": p.title,
        "image": [p.imageUrl],
        "author": {
          "@type": "Person",
          "name": p.author
        },
        "datePublished": p.date,
        "description": p.excerpt,
        "url": `https://wheeledit-website.pages.dev/#/blog/${p.id}`
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [posts]);

  if (isLoading) return <div className="min-h-screen flex justify-center items-center text-gray-700">Loading blog posts...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;

  return (
    <section className="pt-28 pb-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">From Our Blog</h1>
        <p className="text-center text-gray-600 mb-10">
          Tips, trends, and insights from the world of real estate photography and editing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                  <a href={`#/blog/${post.id}`}>{post.title}</a>
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  By {post.author} on{" "}
                  {new Date(post.date).toLocaleDateString("en-US")}
                </p>
                <p className="text-gray-700 text-sm mb-4">{post.excerpt}</p>
                <a
                  href={`#/blog/${post.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
