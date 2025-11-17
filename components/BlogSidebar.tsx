import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';

interface BlogSidebarProps {
  posts: Post[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky top-28">
      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Recommended Reads</h3>
      <div className="space-y-6">
        {posts.map(post => (
          <Link href={`/blog/${post.meta.slug}`} key={post.meta.slug} className="group flex items-start gap-4">
            <div className="flex-shrink-0 w-24 h-16">
              <Image
                src={post.meta.image}
                alt={post.meta.title}
                width={100}
                height={67}
                className="w-full h-full object-cover rounded-md"
                sizes="100px"
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 leading-tight group-hover:text-[#007BFF] transition-colors line-clamp-2">
                {post.meta.title}
              </h4>
               <p className="text-xs text-gray-500 mt-1">{post.meta.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default BlogSidebar;
