import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../types';
import { cache } from 'react';
// FIX: Import the `process` module to access Node.js-specific properties like `cwd()`. This resolves the error "Property 'cwd' does not exist on type 'Process'".
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
            // FIX: The `tags` property from gray-matter's data is of type `any`. To satisfy the `PostMeta` type and prevent downstream errors, we must ensure it's a `string[]` by checking if it is an array and filtering out any non-string values.
            tags: Array.isArray(data.tags) ? data.tags.filter(tag => typeof tag === 'string') : [],
        },
        content: matterResult.content,
    };
    return post;
  });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
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
                // FIX: The `tags` property from gray-matter's data is of type `any`. To satisfy the `PostMeta` type and prevent downstream errors, we must ensure it's a `string[]` by checking if it is an array and filtering out any non-string values.
                tags: Array.isArray(data.tags) ? data.tags.filter(tag => typeof tag === 'string') : [],
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
  // FIX: Replaced `flatMap` with `reduce` to ensure robust type inference. This guarantees `allTags` is typed as `string[]`, resolving the error on the following line where `unknown[]` was being inferred.
  const allTags = allPosts.reduce<string[]>((acc, post) => acc.concat(post.meta.tags), []);
  return [...new Set(allTags)];
}
