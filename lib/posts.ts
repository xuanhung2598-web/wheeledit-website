import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../types';
import { cache } from 'react';
// FIX: Import process to resolve 'process.cwd' type error.
import process from 'process';

const postsDirectory = path.join(process.cwd(), '_posts');

export const getAllPosts = cache((): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure we only process markdown files
    .map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const data = matterResult.data;
    
    const post: Post = {
        meta: {
            slug,
            title: data.title ?? 'Untitled Post',
            date: data.date ?? '1970-01-01',
            author: data.author ?? 'Anonymous',
            excerpt: data.excerpt ?? '',
            image: data.image ?? '/default-image.png',
            // FIX: Cast tags to string[] to ensure correct type inference downstream.
            tags: (Array.isArray(data.tags) ? data.tags : []) as string[], // Ensure tags is always an array
        },
        content: matterResult.content,
    };
    return post;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.meta.date) < new Date(b.meta.date)) {
      return 1;
    } else {
      return -1;
    }
  });
});

export const getPostBySlug = cache((slug: string): Post | undefined => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            meta: { 
                slug, 
                title: data.title ?? 'Untitled Post',
                date: data.date ?? '1970-01-01',
                author: data.author ?? 'Anonymous',
                excerpt: data.excerpt ?? '',
                image: data.image ?? '/default-image.png',
                // FIX: Cast tags to string[] to ensure correct type inference downstream.
                tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
            },
            content
        };
    } catch (err) {
        console.error(`Error reading post with slug: ${slug}`, err);
        return undefined;
    }
});

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.meta.tags);
  return [...new Set(allTags)];
}
